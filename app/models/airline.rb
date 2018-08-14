class Airline < ApplicationRecord
  # Include the common search functionality
  include Searchable

  # Define the columns used in this model
  COLS = ["id", "name", "callsign", "iso_country"]
  TYPES = [:integer, :string, :string, :string]
end
