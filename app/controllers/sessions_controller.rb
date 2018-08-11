class SessionsController < ApplicationController

  # Get the information for the current logged in user
  def info
    if session[:current_user_id]
      render json: User.to_hash(User.find(session[:current_user_id]))
    else
      render json: nil
    end
  end

  # Attempt to log in
  def login
    user = User.find_by(username: params["username"])
    if user && user.authenticate(params["password"])
      session[:current_user_id] = user.id
      render json: User.to_hash(user)
    else
      render json: nil
    end
  end

  # Log out any logged in user
  def logout
    reset_session
    render json: nil
  end

end
