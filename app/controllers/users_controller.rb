class UsersController < ApplicationController

  def all
    if admin()
      render json: User.all_users(params)
    else
      render status: 401, json: nil
    end
  end

  def create
    newUser = nil
    # Sanity test that the password matches the confirm
    if params["password"] === params["password_confirm"]
      # Create the user
      newUser = User.create_user({
        "username" => params["username"],
        "password" => params["password"],
        "password_confirm" => params["password_confirm"],
      })
    end
    if newUser.nil?
      # User creation failed
      render status: 400, json: nil
    else
      # Log the user in
      session[:current_user_id] = newUser[:id]
      # Return the user object
      render json: newUser
    end
  end

  def show
    username = params["username"] || ''
    if authorized(username)
      render json: User.show_user(username)
    else
      render status: 401, json: nil
    end
  end

  def update
    username = params["username"] || ''
    if authorized(username)
      render json: User.update_user(username, params["user"])
    else
      render status: 401, json: nil
    end
  end

  def delete
    username = params["username"] || ''
    if authorized(username)
      # Delete the user
      deleted = User.delete_user(username)
      if deleted[:id] == session[:current_user_id]
        # User was logged in so log them out
        session[:current_user_id] = nil
      end
      # Return success
      render json: { "status": "success" }
    else
      # Not allowed to delete the user
      render status: 401, json: nil
    end
  end

end
