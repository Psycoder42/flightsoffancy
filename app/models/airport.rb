class Airport < ApplicationRecord
  # Include the common search functionality
  include Searchable

  # Define the columns used in this model
  COLS = ["ident", "port_type", "name", "latitude_deg", "longitude_deg", "iso_country", "iso_region", "municipality", "iata_code", "local_code"]
  TYPES = [:string, :string, :string, :float, :float, :string, :string, :string, :string, :string]

  # Define columns as they would be searched in a joined table
  SEARCH_COLS = ["airport_code", "port_type", "airport_name", "latitude_deg", "longitude_deg", "airport_country_code", "airport_region_code", "municipality", "iata_code", "airport_code_ailias"]

end
