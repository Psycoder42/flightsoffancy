class CreateAirlines < ActiveRecord::Migration[5.2]
  def change
    create_table :airlines, id: false do |t|
      t.integer :id, primary_key: true
      t.string :name, limit: 127
      t.string :callsign, limit: 63
      t.string :iso_country, limit: 2
    end
    add_foreign_key :airlines, :countries, column: :iso_country, primary_key: "code"
  end
end
