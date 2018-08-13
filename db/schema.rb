# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_08_13_143356) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "airlines", id: :serial, force: :cascade do |t|
    t.string "name", limit: 127
    t.string "callsign", limit: 63
    t.string "iso_country", limit: 2
  end

  create_table "airports", primary_key: "ident", id: :string, limit: 7, force: :cascade do |t|
    t.string "port_type", limit: 31
    t.string "name", limit: 127
    t.decimal "latitude_deg", precision: 13, scale: 9
    t.decimal "longitude_deg", precision: 13, scale: 9
    t.string "iso_country", limit: 2
    t.string "iso_region", limit: 7
    t.string "municipality", limit: 63
    t.string "iata_code", limit: 7
    t.string "local_code", limit: 7
  end

  create_table "countries", primary_key: "code", id: :string, limit: 2, force: :cascade do |t|
    t.string "name", limit: 63
    t.string "continent", limit: 2
    t.string "wikipedia_link", limit: 127
  end

  create_table "regions", primary_key: "code", id: :string, limit: 7, force: :cascade do |t|
    t.string "local_code", limit: 7
    t.string "name", limit: 63
    t.string "iso_country", limit: 2
  end

  create_table "routes", id: :serial, force: :cascade do |t|
    t.string "source", limit: 7
    t.string "destination", limit: 7
    t.integer "airline_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", limit: 40
    t.string "password_digest"
    t.boolean "is_admin", default: false
  end

  add_foreign_key "airlines", "countries", column: "iso_country", primary_key: "code"
  add_foreign_key "airports", "countries", column: "iso_country", primary_key: "code"
  add_foreign_key "airports", "regions", column: "iso_region", primary_key: "code"
  add_foreign_key "regions", "countries", column: "iso_country", primary_key: "code"
  add_foreign_key "routes", "airlines"
  add_foreign_key "routes", "airports", column: "destination", primary_key: "ident"
  add_foreign_key "routes", "airports", column: "source", primary_key: "ident"
end
