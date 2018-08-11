class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def get_cur_user
    if session[:current_user_id]
      return User.find(session[:current_user_id])
    end
    return nil
  end

  def admin
    cur_user = get_cur_user()
    if cur_user
      return ActiveRecord::Type::Boolean.new.cast(cur_user["is_admin"])
    end
    return false
  end

  def authorized(username)
    cur_user = get_cur_user()
    if cur_user
      is_admin = ActiveRecord::Type::Boolean.new.cast(cur_user["is_admin"])
      return is_admin || username==cur_user["username"]
    end
    return false
  end
end
