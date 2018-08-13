module Searchable
  extend ActiveSupport::Concern

  module ClassMethods
    # Default number of rows returned
    def getMaxResults()
      return 50
    end

    # Get the column names/types for normal table search
    def getFieldInfo()
      return getSearchFieldInfo(self::COLS)
    end

    # Get the column names when used in a join
    def getJoinedFieldInfo()
      return getSearchFieldInfo(self::SEARCH_COLS)
    end

    # Get the select string ailiases to be used with a join
    def getAiliasedSelect()
      colsSelects = []
      idx = 0
      cols = self::COLS
      ailiases = self::SEARCH_COLS
      while idx < cols.length do
        sel = cols[idx];
        if cols[idx] != ailiases[idx]
          sel += " AS #{ailiases[idx]}"
        end
        colsSelects.push(sel)
        idx += 1
      end
      return colsSelects.join(', ')
    end

    # Common function to get the json response
    def get_json_response(results)
      return results.map { |result|
        converted = {}
        # Pull each column from the result and add it to the object
        # Pay attention to the type when adding it
        idx = 0
        cols = self::COLS
        types = self::TYPES
        while idx < cols.length do
          c = cols[idx]
          if types[idx] == :float
            converted[c] = result[c].to_f
          elsif types[idx] == :integer
            converted[c] = result[c].to_i
          elsif types[idx] == :boolean
            converted[c] = ActiveRecord::Type::Boolean.new.cast(result[c])
          else
            converted[c] = result[c]
          end
          idx += 1
        end
        # make sure the mapping uses the final converted object
        converted
      }
    end

    # The common search function for SearchableModels
    def search(params)
      terms = []
      where_clause = []
      # Add any column conditions that they passed
      # Pay attention to column type
      idx = 0
      cols = self::COLS
      types = self::TYPES
      while idx < cols.length do
        c = cols[idx]
        if params[c] && !params[c].nil?
          # The user provided a value for this column
          if types[idx] == :float || types[idx] == :integer
            # Numerics are straight equals
            where_clause.push("#{c} = ?")
            terms.push(params[c])
          elsif types[idx] == :boolean
            # Booleans just need column name or not column name
            if ActiveRecord::Type::Boolean.new.cast(params[c])
              where_clause.push("#{c}")
            else
              where_clause.push("NOT #{c}")
            end
          else
            # Strings should be lowercased and use LIKE
            where_clause.push("lower(#{c}) LIKE ?")
            terms.push(params[c].downcase)
          end
        end
        idx += 1
      end
      begin
        max = self.getMaxResults()
        # Try to perfom the search based on the user criteria
        if where_clause.length > 0
          return self.where(where_clause.join(' AND '), *terms).limit(max)
        else
          return self.where('true').limit(max)
        end
      rescue
        # Something went wrong, instead of throwing an error and doing
        # nothing, return a nil so that the controller will inform the client
        return nil
      end
    end

    private

    # Get the column names/types for search
    def getSearchFieldInfo(colNames)
      colsInfo = []
      idx = 0
      colTypes = self::TYPES
      while idx < colNames.length do
        colsInfo.push({
          name: colNames[idx],
          type: colTypes[idx]
        })
        idx += 1
      end
      return colsInfo
    end

  end
end
