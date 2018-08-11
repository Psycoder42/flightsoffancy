class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, limit: 40
      t.string :password_digest
      t.boolean :is_admin, default: false
    end
  end
end
