class Country < ApplicationRecord
  # Include the common search functionality
  include Pagable
  # Include the common search functionality
  include Searchable

  # Define the columns used in this model
  COLS = ["code", "name", "continent", "wikipedia_link"]
  TYPES = [:string, :string, :string, :string]
end
