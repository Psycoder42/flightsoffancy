class CreateAirports < ActiveRecord::Migration[5.2]
  def change
    create_table :airports, id: false do |t|
      t.string :ident, limit: 7, primary_key: true
      t.string :port_type, limit: 31
      t.string :name, limit: 127
      t.decimal :latitude_deg, precision: 13, scale: 9
      t.decimal :longitude_deg, precision: 13, scale: 9
      t.string :iso_country, limit: 2
      t.string :iso_region, limit: 7
      t.string :municipality, limit: 63
      t.string :iata_code, limit: 7
      t.string :local_code, limit: 7
    end
    add_foreign_key :airports, :countries, column: :iso_country, primary_key: "code"
    add_foreign_key :airports, :regions, column: :iso_region, primary_key: "code"
  end
end
