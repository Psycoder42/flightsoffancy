class CreateRegions < ActiveRecord::Migration[5.2]
  def change
    create_table :regions, id: false do |t|
      t.string :code, limit: 7, primary_key: true
      t.string :local_code, limit: 7
      t.string :name, limit: 63
      t.string :iso_country, limit: 2
    end
    add_foreign_key :regions, :countries, column: :iso_country, primary_key: "code"
  end
end
