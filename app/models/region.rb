class Region < ApplicationRecord
  # Include the common search functionality
  include Pagable
  # Include the common search functionality
  include Searchable

  # Define the columns used in this model
  COLS = ["code", "local_code", "name", "iso_country"]
  TYPES = [:string, :string, :string, :string]
end
