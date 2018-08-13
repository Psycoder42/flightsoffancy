class Country < ApplicationRecord
  # Include the common search functionality
  include Searchable

  # Define the columns used in this model
  COLS = ["code", "name", "continent", "wikipedia_link"]
  TYPES = [:string, :string, :string, :string]

  # Override so that the correct columns for this model are known
  def self.getColumns()
    return COLS
  end

  # Override so that the correct columns types for this model are known
  def self.getTypes()
    return TYPES
  end

end
