class Route < ApplicationRecord
  # Include the common search functionality
  include Pagable
  # Include the common search functionality
  include Searchable

  # Define the columns used in this model
  COLS = ["id", "source", "destination", "airline_id"]
  TYPES = [:integer, :string, :string, :integer]
end
