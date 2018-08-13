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
  get '/regions/search', to: 'regions#search'
  get '/airports/search', to: 'airports#search'
end
