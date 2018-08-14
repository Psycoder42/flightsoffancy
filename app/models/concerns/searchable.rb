module Searchable
  extend ActiveSupport::Concern

  module ClassMethods
    # Default number of rows returned
    def getMaxResults()
      return 50
    end

    # Get the column names/types for normal table search
    def getFieldInfo()
      colsInfo = []
      idx = 0
      colNames = self::COLS
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
            terms.push(params[c])
            where_clause.push("#{c} = ?")
          elsif types[idx] == :boolean
            # Booleans just need column name or not column name
            if ActiveRecord::Type::Boolean.new.cast(params[c])
              where_clause.push("#{c}")
            else
              where_clause.push("NOT #{c}")
            end
          else
            # Strings should be lowercased and use LIKE
            terms.push(params[c].downcase)
            where_clause.push("lower(#{c}) LIKE ?")
          end
        end
        idx += 1
      end
      begin
        lo = self.getSqlLimitAndOffset(params)
        # Try to perfom the search based on the user criteria
        if where_clause.length > 0
          return self.where(where_clause.join(' AND '), *terms).limit(lo[0]).offset(lo[1])
        else
          return self.where('true').limit(lo[0]).offset(lo[1])
        end
      rescue
        # Something went wrong, instead of throwing an error and doing
        # nothing, return a nil so that the controller will inform the client
        return nil
      end
    end

  end
end
