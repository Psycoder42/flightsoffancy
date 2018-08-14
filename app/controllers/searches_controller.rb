class SearchesController < ApplicationController
  # Perform a search for standalone places (not attached to a flight route)
  def places
    result = Search.search_places(params)
    if result
      # The search gave us something so we can return it
      render json: result
    else
      # Something went wrong, return a 500 error with no body
      render status: 500, json: nil
    end
  end

  # Retrieve the searchable fields for a places search
  def places_fields
    render json: Search.getPlacesFieldInfo()
  end

  # Perform a search for info about flight routes
  def flights
    result = Search.search_flights(params)
    if result
      # The search gave us something so we can return it
      render json: result
    else
      # Something went wrong, return a 500 error with no body
      render status: 500, json: nil
    end
  end

  # Retrieve the searchable fields for a flight route search
  def flights_fields
    render json: Search.getFlightsFieldInfo()
  end
end
