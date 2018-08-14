class CreateCountries < ActiveRecord::Migration[5.2]
  def change
    create_table :countries, id: false do |t|
      t.string :code, limit: 2, primary_key: true
      t.string :name, limit: 63
      t.string :continent, limit: 2
      t.string :wikipedia_link, limit: 127
    end
  end
end
