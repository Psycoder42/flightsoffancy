class Search
  # Include the common search functionality
  include Pagable

  # Places column info
  PLACES_AIRPORT_COLS = Selector.new("airports",
    ["ident", "port_type", "name", "latitude_deg", "longitude_deg", "municipality", "iata_code", "local_code"],
    [:string, :string, :string, :float, :float, :string, :string, :string],
    ["airport_id", "classification", "airport_name", "latitude_deg", "longitude_deg", "municipality", "iata_code", "local_code"]
  )
  PLACES_REGION_COLS = Selector.new("regions", ["name"], [:string], ["airport_region"])
  PLACES_COUNTRY_COLS = Selector.new("countries", ["name", "continent"], [:string, :string], ["airport_country", "airport_continent"])
  PLACES_SELECTORS = [PLACES_AIRPORT_COLS, PLACES_REGION_COLS, PLACES_COUNTRY_COLS]

  # Flights column info
  FLIGHTS_AIRLINES_COLS = Selector.new("airlines", ["name", "callsign"], [:string, :string], ["airline_name", "airline_callsign"])
  FLIGHTS_COUNTRY_COLS = Selector.new("countries", ["name"], [:string], ["airline_country"])
  FLIGHTS_ROUTE_COLS = Selector.new("routes", ["id"], [:integer], ["route_id"])
  FLIGHTS_SELECTORS = [FLIGHTS_ROUTE_COLS, FLIGHTS_AIRLINES_COLS, FLIGHTS_COUNTRY_COLS]

  # Places field info
  def self.getPlacesFieldInfo()
    return self.getPlacesTypes()
  end

  # Search for places results
  def self.search_places(params)
    begin
      pageValues = self.getSqlLimitAndOffset(params)
      # See if there is user input to incorporate
      where = self.buildWhereClause(self.getPlacesTypes(), params)
      # Run the select
      if where
        # The next placeholder value to use
        nextVal = (where[:user_values].length + 1)
        # SQL will have user input so we want to wrap it in a one-time use prepared statement
        prepared_name = "place_select_#{SecureRandom.hex(10)}"
        places_sql = "SELECT * FROM ( #{self.getPlacesQuery()} ) AS places"
        places_sql += where[:where_clause]
        places_sql += " LIMIT $#{nextVal} OFFSET $#{nextVal+1}"
        # Prepare the statement
        ActiveRecord::Base.connection.raw_connection.prepare(prepared_name, places_sql)
        # Run it
        sqlValues = [*where[:user_values], *pageValues]
        results = ActiveRecord::Base.connection.raw_connection.exec_prepared(prepared_name, sqlValues)
        # Clean up the prepared statement
        ActiveRecord::Base.connection.raw_connection.exec("DEALLOCATE #{prepared_name}")
      else
        # No user input so we can use the reusible prepared statement
        results = ActiveRecord::Base.connection.raw_connection.exec_prepared('place_select', pageValues)
      end
      return self.convertResults(results, self.getPlacesTypes())
    rescue
      # Something went wrong, instead of throwing an error and doing
      # nothing, return a nil so that the controller will inform the client
      return nil
    end
  end

  # Search for all of the places saved by the user
  def self.user_places(params)
    begin
      user_id = params['user_id']
      pageValues = self.getSqlLimitAndOffset(params)
      sqlValues = [user_id, *pageValues]
      results = ActiveRecord::Base.connection.raw_connection.exec_prepared('user_places', sqlValues)
      return self.convertResults(results, self.getPlacesTypes())
    rescue
      # Something went wrong, instead of throwing an error and doing
      # nothing, return a nil so that the controller will inform the client
      return nil
    end
  end

  # Flights field info
  def self.getFlightsFieldInfo()
    return self.getFlightsTypes()
  end

  # Search for flights results
  def self.search_flights(params)
    begin
      pageValues = self.getSqlLimitAndOffset(params)
      # See if there is user input to incorporate
      where = self.buildWhereClause(self.getFlightsTypes(), params)
      # Run the select
      if where
        # The next placeholder value to use
        nextVal = (where[:user_values].length + 1)
        # SQL will have user input so we want to wrap it in a one-time use prepared statement
        prepared_name = "flight_select_#{SecureRandom.hex(10)}"
        flights_sql = "SELECT * FROM ( #{self.getFlightsQuery()} ) AS flights"
        flights_sql += where[:where_clause]
        flights_sql += " LIMIT $#{nextVal} OFFSET $#{nextVal+1}"
        # Prepare the statement
        ActiveRecord::Base.connection.raw_connection.prepare(prepared_name, flights_sql)
        # Run it
        sqlValues = [*where[:user_values], *pageValues]
        results = ActiveRecord::Base.connection.raw_connection.exec_prepared(prepared_name, sqlValues)
        # Clean up the prepared statement
        ActiveRecord::Base.connection.raw_connection.exec("DEALLOCATE #{prepared_name}")
      else
        # No user input so we can use the reusible prepared statement
        results = ActiveRecord::Base.connection.raw_connection.exec_prepared('flight_select', pageValues)
      end
      return self.convertResults(results, self.getFlightsTypes())
    rescue
      # Something went wrong, instead of throwing an error and doing
      # nothing, return a nil so that the controller will inform the client
      return nil
    end
  end

  # Search for all of the flights saved by the user
  def self.user_flights(params)
    begin
      user_id = params['user_id']
      pageValues = self.getSqlLimitAndOffset(params)
      sqlValues = [user_id, *pageValues]
      results = ActiveRecord::Base.connection.raw_connection.exec_prepared('user_flights', sqlValues)
      return self.convertResults(results, self.getFlightsTypes())
    rescue
      # Something went wrong, instead of throwing an error and doing
      # nothing, return a nil so that the controller will inform the client
      return nil
    end
  end

  private

  # Generate where clause from params
  def self.buildWhereClause(fieldsInfo, params)
    user_values = []
    where_clause = []
    # Check for a value for every possible field
    fieldsInfo.each do |field|
      key = field[:name]
      value = params[key]
      if value
        type = field[:type]
        if type == :float || type == :integer
          # Numerics are straight equals
          user_values.push(value)
          where_clause.push("#{key} = $#{user_values.length}")
        elsif type == :boolean
          # Booleans just need column name or not column name
          if ActiveRecord::Type::Boolean.new.cast(value)
            where_clause.push("#{key}")
          else
            where_clause.push("NOT #{key}")
          end
        elsif type == :string
          # Strings should be lowercased and use LIKE
          user_values.push(value.downcase)
          where_clause.push("lower(#{key}) LIKE $#{user_values.length}")
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
        key = field[:name]
        value = result[key]
        if value
          type = field[:type]
          if type == :float
            converted[key] = value.to_f
          elsif type == :integer
            converted[key] = value.to_i
          elsif type == :boolean
            converted[key] = ActiveRecord::Type::Boolean.new.cast(value)
          else
            converted[key] = value
          end
        end
      end
      # Make sure the mapping uses the final converted object
      converted
    }
  end

  # Generate the select for the places search
  def self.getPlacesSelect(table_name=nil, prefix='', just_prefix=false)
    selPieces = []
    PLACES_SELECTORS.each do |selector|
      if table_name
        selPieces.push(selector.getAliasedSelectClause(table_name, prefix, just_prefix))
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

  # Generate the select for the flights search
  def self.getFlightsSelect()
    selPieces = []
    FLIGHTS_SELECTORS.each do |selector|
      selPieces.push(selector.getSelectClause())
    end
    selPieces.push(self.getPlacesSelect("source_airport", "source_", true))
    selPieces.push(self.getPlacesSelect("dest_airport", "dest_", true))
    return selPieces.join(', ')
  end

  # Generate the types for the flights search
  def self.getFlightsTypes()
    typeInfo = []
    FLIGHTS_SELECTORS.each do |selector|
      typeInfo.push(*selector.getFieldsInfo())
    end
    typeInfo.push(*self.getPlacesTypes("source_"))
    typeInfo.push(*self.getPlacesTypes("dest_"))
    return typeInfo
  end

  # Generate a flights search query
  def self.getFlightsQuery()
    sql_string = <<-SQL
      SELECT
        #{self.getFlightsSelect()}
      FROM routes
        LEFT JOIN airlines
          ON routes.airline_id=airlines.id
        LEFT JOIN countries
          ON airlines.iso_country=countries.code
        LEFT JOIN ( #{self.getPlacesQuery("source_airport", "source_")} ) AS source_airport
          ON routes.source=source_airport.source_airport_id
        LEFT JOIN ( #{self.getPlacesQuery("dest_airport", "dest_")} ) AS dest_airport
          ON routes.destination=dest_airport.dest_airport_id
    SQL
    # Return a cleaned version of the string
    return sql_string.strip().gsub(/\s+/, ' ')
  end

  # Prepare the unfiltered (except for paging) place select statement
  begin
    ActiveRecord::Base.connection.raw_connection.prepare('place_select', "#{self.getPlacesQuery()} LIMIT $1 OFFSET $2")
  rescue PG::DuplicatePstatement => e
    # This is fine... it just means we already prepared it
  end

  # Prepare the unfiltered (except for paging) flight select statement
  begin
    ActiveRecord::Base.connection.raw_connection.prepare('flight_select', "#{self.getFlightsQuery()} LIMIT $1 OFFSET $2")
  rescue PG::DuplicatePstatement => e
    # This is fine... it just means we already prepared it
  end

  # Prepare the user place select statement
  begin
    ActiveRecord::Base.connection.raw_connection.prepare(
      'user_places',
      <<-SQL
        SELECT *
        FROM ( #{self.getPlacesQuery()} ) AS places
        WHERE places.airport_id IN (
          SELECT
            CASE
              WHEN saved_records.ref_type = 'airport'
              THEN saved_records.ref_key
              ELSE null
            END AS f_key
          FROM saved_records
          WHERE saved_records.ref_type = 'airport'
            AND saved_records.user_id = $1
        )
        LIMIT $2
        OFFSET $3
      SQL
    )
  rescue PG::DuplicatePstatement => e
    # This is fine... it just means we already prepared it
  end

  # Prepare the user flights select statement
  begin
    ActiveRecord::Base.connection.raw_connection.prepare(
      'user_flights',
      <<-SQL
        SELECT *
        FROM ( #{self.getFlightsQuery()} ) AS flights
        WHERE flights.route_id IN (
          SELECT
            CASE
              WHEN saved_records.ref_type = 'flight'
              THEN CAST ( saved_records.ref_key AS INTEGER )
              ELSE null
            END AS f_key
          FROM saved_records
          WHERE saved_records.ref_type = 'flight'
            AND saved_records.user_id = $1
        )
        LIMIT $2
        OFFSET $3
      SQL
    )
  rescue PG::DuplicatePstatement => e
    # This is fine... it just means we already prepared it
  end

end
