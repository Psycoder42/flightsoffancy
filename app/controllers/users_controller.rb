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

  def create_save
    username = params["username"] || ''
    if authorized(username)
      ref_type = (params["ref_type"] || '').to_s.strip
      ref_key = (params["ref_key"] || '').to_s.strip
      if ["airport", "flight"].include?(ref_type.downcase) && ref_key.length>0
        # Add the reference
        begin
          SavedRecord.create(
            user_id: session[:current_user_id],
            ref_type: ref_type,
            ref_key: ref_key
          )
          # Something went wrong, return a 500 error with no body
          render status: 201, json: nil
        rescue => e
          # Print out the exception so we know what happened
          p e
          # Something went wrong, return a 500 error with no body
          render status: 500, json: nil
        end
      else
        # The reference pieces are missing or invalid
        render status: 400, json: nil
      end
    else
      # Not allowed to edit this user's saves
      render status: 401, json: nil
    end
  end

  def delete_save
    username = params["username"] || ''
    if authorized(username)
      begin
        ref_type = params["ref_type"]
        ref_key = params["ref_key"].to_s
        toDelete = SavedRecord.where(
          "user_id = ? AND ref_type = ? AND ref_key = ?",
          session[:current_user_id], ref_type, ref_key
        ).first
        if toDelete
          toDelete.destroy
        end
      rescue => e
        # Print out the exception so we know what happened
        p e
        # Something went wrong, return a 500 error with no body
        render status: 500, json: nil
      end
    else
      # Not allowed to edit this user's saves
      render status: 401, json: nil
    end
  end

end
