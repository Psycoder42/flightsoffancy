Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/sessions', to: 'sessions#info'
  post '/sessions', to: 'sessions#login'
  delete '/sessions', to: 'sessions#logout'

  get '/users', to: 'users#all'
  post '/users', to: 'users#create'
  get '/users/:username', to: 'users#show'
  put '/users/:username', to: 'users#update'
  delete '/users/:username', to: 'users#delete'
  post '/users/:username/saved', to: 'users#create_save'
  delete '/users/:username/saved', to: 'users#delete_save'

  get '/countries/search', to: 'countries#search'
  get '/countries/search/fields', to: 'countries#fields'
  get '/regions/search', to: 'regions#search'
  get '/regions/search/fields', to: 'regions#fields'
  get '/airports/search', to: 'airports#search'
  get '/airports/search/fields', to: 'airports#fields'
  get '/airlines/search', to: 'airlines#search'
  get '/airlines/search/fields', to: 'airlines#fields'
  get '/routes/search', to: 'routes#search'
  get '/routes/search/fields', to: 'routes#fields'

  get '/places/search', to: 'searches#places'
  get '/places/search/fields', to: 'searches#places_fields'
  get '/places/search/saved/:username', to: 'searches#places_user'
  get '/flights/search', to: 'searches#flights'
  get '/flights/search/fields', to: 'searches#flights_fields'
  get '/flights/search/saved/:username', to: 'searches#flights_user'
end
