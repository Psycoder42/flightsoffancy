class Selector

  def initialize(source_table, col_names, col_types, col_aliases)
    @table = source_table
    @cols = col_names
    @types = col_types
    @aliases = col_aliases
  end

  def aliasType(col_alias)
    idx = @aliases.index(col_alias)
    if idx
      return @types[idx]
    end
    return nil
  end

  def getSourceColRef(col_alias)
    idx = @aliases.index(col_alias)
    if idx
      return "#{@table}.#{@cols[idx]}"
    end
    return nil
  end

  def getSelectClause()
    selCols = []
    idx = 0
    while idx < @aliases.length do
      selCols.push("#{@table}.#{@cols[idx]} AS #{@aliases[idx]}")
      idx += 1
    end
    return selCols.join(', ')
  end

  def getAliasedSelectClause(table_override, prefix='')
    selCols = []
    idx = 0
    while idx < @aliases.length do
      selCols.push("#{table_override}.#{@aliases[idx]} AS #{prefix}#{@aliases[idx]}")
      idx += 1
    end
    return selCols.join(', ')
  end

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
