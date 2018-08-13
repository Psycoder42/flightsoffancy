class Region < ApplicationRecord
  # Include the common search functionality
  include Searchable

  # Define the columns used in this model
  COLS = ["code", "local_code", "name", "iso_country"]
  TYPES = [:string, :string, :string, :string]

  # Define columns as they would be searched in a joined table
  SEARCH_COLS = ["region_code", "region_ailias", "region_name", "region_country_code"]

end
