# This class is to allow for mutating select statements and handling aliases
class Selector
  # Pass in the table, columns, types, and alieses to manage
  def initialize(source_table, col_names, col_types, col_aliases)
    @table = source_table
    @cols = col_names
    @types = col_types
    @aliases = col_aliases
  end

  # Given an alias name, return the qualified name of the source column
  def getSourceColRef(col_alias)
    idx = @aliases.index(col_alias)
    if idx
      return "#{@table}.#{@cols[idx]}"
    end
    return nil
  end

  # Get the column list for a select clause for this selector
  def getSelectClause()
    selCols = []
    idx = 0
    while idx < @aliases.length do
      selCols.push("#{@table}.#{@cols[idx]} AS #{@aliases[idx]}")
      idx += 1
    end
    return selCols.join(', ')
  end

  # Get the column list for a select clause for this selector but mutate it
  # based on the table override, custom prefix, and a flag to alias or not
  def getAliasedSelectClause(table_override, prefix='', just_prefix=false)
    selCols = []
    idx = 0
    while idx < @aliases.length do
      if just_prefix
        selCols.push("#{table_override}.#{prefix}#{@aliases[idx]}")
      else
        selCols.push("#{table_override}.#{@aliases[idx]} AS #{prefix}#{@aliases[idx]}")
      end
      idx += 1
    end
    return selCols.join(', ')
  end

  # Get the list of aliased columns and thier types
  def getFieldsInfo(prefix='')
    colsInfo = []
    idx = 0
    while idx < @aliases.length do
      colsInfo.push({
        name: "#{prefix}#{@aliases[idx]}",
        type: @types[idx]
      })
      idx += 1
    end
    return colsInfo
  end
end
