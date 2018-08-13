class Route < ApplicationRecord
  # Include the common search functionality
  include Searchable

  # Define the columns used in this model
  COLS = ["id", "source", "destination", "airline_id"]
  TYPES = [:integer, :string, :string, :integer]

  # Override so that the correct columns for this model are known
  def self.getColumns()
    return COLS
  end

  # Override so that the correct columns types for this model are known
  def self.getTypes()
    return TYPES
  end

end
