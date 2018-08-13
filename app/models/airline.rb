class Airline < ApplicationRecord
  # Include the common search functionality
  include Searchable

  # Define the columns used in this model
  COLS = ["id", "name", "callsign", "iso_country"]
  TYPES = [:integer, :string, :string, :string]

  # Define columns as they would be searched in a joined table
  SEARCH_COLS = ["airline_id", "airline_name", "callsign", "airline_country_code"]

end
