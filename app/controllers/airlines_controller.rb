class AirlinesController < ApplicationController

  def search
    result = Airline.search(params)
    if result
      # The search gave us something so we can return it
      render json: result
    else
      # Something went wrong, return a 500 error with no body
      render status: 500, json: nil
    end
  end

end
