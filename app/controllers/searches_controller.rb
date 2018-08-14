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

  # Retrieve the places saved by the current user
  def places_user
    username = params["username"] || ''
    if authorized(username)
      params["user_id"] = session[:current_user_id]
      result = Search.user_places(params)
      if result
        # The search gave us something so we can return it
        render json: result
      else
        # Something went wrong, return a 500 error with no body
        render status: 500, json: nil
      end
    else
      # Either not logged in or not visible to the logged in user
      render status: 401, json: nil
    end
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

  # Retrieve the flight routes saved by the current user
  def flights_user
    username = params["username"] || ''
    if authorized(username)
      params["user_id"] = session[:current_user_id]
      result = Search.user_flights(params)
      if result
        # The search gave us something so we can return it
        render json: result
      else
        # Something went wrong, return a 500 error with no body
        render status: 500, json: nil
      end
    else
      # Either not logged in or not visible to the logged in user
      render status: 401, json: nil
    end
  end
end
