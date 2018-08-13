class CreateRoutes < ActiveRecord::Migration[5.2]
  def change
    create_table :routes, id: false do |t|
      t.integer :id, primary_key: true
      t.string :source, limit: 7
      t.string :destination, limit: 7
      t.integer :airline_id
    end
    add_foreign_key :routes, :airports, column: :source, primary_key: "ident"
    add_foreign_key :routes, :airports, column: :destination, primary_key: "ident"
    add_foreign_key :routes, :airlines, column: :airline_id, primary_key: "id"
  end
end
