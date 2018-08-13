class Route < ApplicationRecord
  # Include the common search functionality
  include Searchable

  # Define the columns used in this model
  COLS = ["id", "source", "destination", "airline_id"]
  TYPES = [:integer, :string, :string, :integer]

  # Define columns as they would be searched in a joined table
  SEARCH_COLS = ["route_id", "source", "destination", "route_airline_id"]

end
