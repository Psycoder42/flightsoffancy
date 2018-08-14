class CreateSavedRecords < ActiveRecord::Migration[5.2]
  def change
    create_table :saved_records do |t|
      t.integer :user_id
      t.string :ref_type, limit: 15
      t.string :ref_key, limit: 15
    end
    add_foreign_key :saved_records, :users, column: :user_id, primary_key: "id"
  end
end
