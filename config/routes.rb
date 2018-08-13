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

  get '/countries/search', to: 'countries#search'
  get '/countries/fields', to: 'countries#fields'
  get '/regions/search', to: 'regions#search'
  get '/regions/fields', to: 'regions#fields'
  get '/airports/search', to: 'airports#search'
  get '/airports/fields', to: 'airports#fields'
  get '/airlines/search', to: 'airlines#search'
  get '/airlines/fields', to: 'airlines#fields'
  get '/routes/search', to: 'routes#search'
  get '/routes/fields', to: 'routes#fields'
end
