class User < ApplicationRecord
  # Set up the behavior of the ActiveRecord
  before_save { self.username = username.downcase }
  VALID_USERNAME_REGEX = /\A[-_\.\w\d]+\z/i
  validates :username, presence: true, length: { minimum: 3, maximum: 40 },
    format: { with: VALID_USERNAME_REGEX }, uniqueness: { case_sensitive: false }
  has_secure_password
  validates :password, presence: true, length: { minimum: 6, maximum: 40 }

  # Get a connection to the database
  if(ENV['DATABASE_URL'])
    uri = URI.parse(ENV['DATABASE_URL'])
    DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
  else
    DB = PG.connect(dbname: 'flightsoffancy_development')
  end

  # Use prepared statememnts for security
  DB.prepare('all', "SELECT * FROM USERS")

  # Common function to get the json response
  def self.get_json_response(results)
    return results.map { |result|
      # Filter out the password hash
      {
        id: result["id"],
        username: result["username"],
        is_admin: ActiveRecord::Type::Boolean.new.cast(result["is_admin"])
      }
    }
  end

  # Convert an ActiveRecord object to a hash
  def self.to_hash(user)
    return {
      id: user.id,
      username: user.username,
      is_admin: user.is_admin
    }
  end

  # Return all the users
  def self.all_users
    results = DB.exec_prepared('all')
    return User.get_json_response(results)
  end

  # Return a specific user
  def self.show_user(username)
    user = User.find_by(username: username)
    if user
      return User.to_hash(user)
    else
      return nil
    end
  end

  # Create a new user
  def self.create_user(opts)
    newUser = User.new(
      username: opts["username"],
      password: opts["password"],
      password_confirmation: opts["password_confirm"]
    )
    if newUser.valid? && newUser.save
      return User.to_hash(newUser)
    else
      return nil
    end
  end

  # Delete a user
  def self.delete_user(username)
    toDelete = User.find_by(username: username)
    if toDelete
      return User.to_hash(toDelete.destroy)
    else
      return nil
    end
  end

  # Update a user
  def self.update_user(username, opts)
    # At the moment this is the same as show since there is nothing updatable
    user = User.find_by(username: username)
    if user
      return User.to_hash(user)
    else
      return nil
    end
  end

end
