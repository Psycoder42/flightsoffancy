class Country < ApplicationRecord
  # Include the common search functionality
  include Searchable

  # Define the columns used in this model
  COLS = ["code", "name", "continent", "wikipedia_link"]
  TYPES = [:string, :string, :string, :string]

  # Define columns as they would be searched in a joined table
  SEARCH_COLS = ["country_code", "country_name", "continent_id", "country_wiki_page"]

end
