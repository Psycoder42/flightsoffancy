class Airport < ApplicationRecord
  # Include the common search functionality
  include Pagable
  # Include the common search functionality
  include Searchable

  # Define the columns used in this model
  COLS = ["ident", "port_type", "name", "latitude_deg", "longitude_deg", "iso_country", "iso_region", "municipality", "iata_code", "local_code"]
  TYPES = [:string, :string, :string, :float, :float, :string, :string, :string, :string, :string]
end
