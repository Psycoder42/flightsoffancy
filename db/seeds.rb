# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# The preferred method for Postgres is to run the following commands (in order) in psql
# \copy countries from '<project_base_dir>/db/countries.csv' delimiter ',' csv header
# \copy regions from '<project_base_dir>/db/regions.csv' delimiter ',' csv header
# \copy airports from '<project_base_dir>/db/airports.csv' delimiter ',' csv header

# If you must use the Rails seed file, uncomment the following
# BE AWARE: This method could take a LONG time to run this way (it's importing about 59K rows - one at a time) 
# require 'csv'
#
# puts "Importing country data..."
# CSV.foreach(Rails.root.join('db/countries.csv'), headers: true) do |row|
#   Country.create(
#     code: row["code"],
#     name: row["name"],
#     continent: row["continent"],
#     wikipedia_link: row["wikipedia_link"]
#   )
# end
# puts "Country data import complete"
#
# puts "Importing region data..."
# CSV.foreach(Rails.root.join('db/regions.csv'), headers: true) do |row|
#   Region.create(
#     code: row["code"],
#     local_code: row["local_code"],
#     name: row["name"],
#     iso_country: row["iso_country"]
#   )
# end
# puts "Region data import complete"
#
# puts "Importing airport data..."
# CSV.foreach(Rails.root.join('db/airports.csv'), headers: true) do |row|
#   Airport.create(
#     ident: row["ident"],
#     port_type: row["port_type"],
#     name: row["name"],
#     latitude_deg: row["latitude_deg"].to_f,
#     longitude_deg: row["longitude_deg"].to_f,
#     iso_country: row["iso_country"],
#     iso_region: row["iso_region"],
#     municipality: row["municipality"],
#     iata_code: row["iata_code"],
#     local_code: row["local_code"]
#   )
# end
# puts "Airport data import complete"
