class Search
  # Places column colunms info
  PLACES_AIRPORT_COLS = Selector.new("airports",
    ["ident", "port_type", "name", "latitude_deg", "longitude_deg", "municipality", "iata_code", "local_code"],
    [:string, :string, :string, :float, :float, :string, :string, :string],
    ["airport_id", "classification", "airport_name", "latitude_deg", "longitude_deg", "municipality", "iata_code", "local_code"]
  )
  PLACES_REGION_COLS = Selector.new("regions", ["name"], [:string], ["airport_region"])
  PLACES_COUNTRY_COLS = Selector.new("countries", ["name", "continent"], [:string, :string], ["airport_country", "airport_continent"])
  PLACES_SELECTORS = [PLACES_AIRPORT_COLS, PLACES_REGION_COLS, PLACES_COUNTRY_COLS]

  # Places field info
  def self.getPlacesFieldInfo()
    return self.getPlacesTypes()
  end

  # Search for places results
  def self.search_places(params)
    begin
      # See if there is user input to incorporate
      where = self.buildWhereClause(PLACES_SELECTORS, params)
      # Run the select
      if where
        # SQL will have user input so we want to wrap it in a one-time use prepared statement
        prepared_name = "place_select_#{SecureRandom.hex(10)}"
        places_sql = "SELECT * FROM ( #{self.getPlacesQuery()} ) AS places"
        places_sql += where[:where_clause]
        places_sql += " LIMIT 50"
        # Prepare the statement
        ActiveRecord::Base.connection.raw_connection.prepare(prepared_name, places_sql)
        # Run it
        results = ActiveRecord::Base.connection.raw_connection.exec_prepared(prepared_name, where[:user_values])
        # Clean up the prepared statement
        ActiveRecord::Base.connection.raw_connection.exec("DEALLOCATE #{prepared_name}")
      else
        # No user input so we can use the reusible prepared statement
        results = ActiveRecord::Base.connection.raw_connection.exec_prepared('place_select')
      end
      return self.convertResults(results, self.getPlacesTypes())
    rescue
      # Something went wrong, instead of throwing an error and doing
      # nothing, return a nil so that the controller will inform the client
      return nil
    end
  end

  # Flights field info
  def self.getFlightsFieldInfo()
    return ["TODO"]
  end

  # Search for flights results
  def self.search_flights(params)
    return ["TODO"]
  end

  private

  # Generate where clause from params
  def self.buildWhereClause(selectors, params)
    user_values = []
    where_clause = []
    params.keys.each do |key|
      selectors.each do |selector|
        type = selector.aliasType(key)
        if type == :float || type == :integer
          # Numerics are straight equals
          user_values.push(params[key])
          where_clause.push("#{key} = $#{user_values.length}")
          break
        elsif type == :boolean
          # Booleans just need column name or not column name
          if ActiveRecord::Type::Boolean.new.cast(params[c])
            where_clause.push("#{key}")
          else
            where_clause.push("NOT #{key}")
          end
          break
        elsif type == :string
          # Strings should be lowercased and use LIKE
          user_values.push(params[key].downcase)
          where_clause.push("lower(#{key}) LIKE $#{user_values.length}")
          break
        end
      end
    end
    # Check to see if any where clause was built
    if where_clause.length > 0
      return {
        where_clause: " WHERE #{where_clause.join(' AND ')}",
        user_values: user_values
      }
    end
    # Nothing for where clause so return nil
    return nil
  end

  # Convert the DB results to json
  def self.convertResults(results, fieldsInfo)
    return results.map { |result|
      converted = {}
      # Pull each column from the result and add it to the object
      # Pay attention to the type when adding it
      fieldsInfo.each do |field|
        if result[field[:name]]
          if field[:type] == :float
            converted[field[:name]] = result[field[:name]].to_f
          elsif field[:type] == :integer
            converted[field[:name]] = result[field[:name]].to_i
          elsif field[:type] == :boolean
            converted[field[:name]] = ActiveRecord::Type::Boolean.new.cast(result[field[:name]])
          else
            converted[field[:name]] = result[field[:name]]
          end
        end
      end
      # Make sure the mapping uses the final converted object
      converted
    }
  end

  # Generate the select for the places search
  def self.getPlacesSelect(table_name=nil, prefix='')
    selPieces = []
    PLACES_SELECTORS.each do |selector|
      if table_name
        selPieces.push(selector.getAliasedSelectClause(table_name, prefix))
      else
        selPieces.push(selector.getSelectClause())
      end
    end
    return selPieces.join(', ')
  end

  # Generate the types for the places search
  def self.getPlacesTypes(prefix='')
    typeInfo = []
    PLACES_SELECTORS.each do |selector|
      typeInfo.push(*selector.getFieldsInfo(prefix))
    end
    return typeInfo
  end

  # Generate a places subquery
  def self.getPlacesQuery(table_name=nil, prefix='')
    sql_string = ''
    # If there is a table name, this is a subquery so we want to wrap the SQL
    if table_name
      sql_string += "SELECT #{self.getPlacesSelect(table_name, prefix)} FROM ("
    end
    # This is the core SQL that will always be there
    sql_string += <<-SQL
      SELECT
        #{self.getPlacesSelect()}
      FROM airports
        LEFT JOIN regions
          ON airports.iso_region=regions.code
        LEFT JOIN countries
          ON airports.iso_country=countries.code
    SQL
    # Finish the SQL wrap
    if table_name
      sql_string += ") AS #{table_name}"
    end
    # Return a cleaned version of the string
    return sql_string.strip().gsub(/\s+/, ' ')
  end

  # Prepare the unfiltered place select statement
  begin
    ActiveRecord::Base.connection.raw_connection.prepare('place_select', "#{self.getPlacesQuery()} LIMIT 50")
  rescue PG::DuplicatePstatement => e
    # This is fine... it just means we already prepared it
  end

end
