class Airport < ApplicationRecord
  # Include the common search functionality
  include Searchable

  # Define the columns used in this model
  COLS = ["ident", "port_type", "name", "latitude_deg", "longitude_deg", "iso_country", "iso_region", "municipality", "iata_code", "local_code"]
  TYPES = [:string, :string, :string, :float, :float, :string, :string, :string, :string, :string]

  # Override so that the correct columns for this model are known
  def self.getColumns()
    return COLS
  end

  # Override so that the correct columns types for this model are known
  def self.getTypes()
    return TYPES
  end

end
