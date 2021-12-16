Rails.application.routes.draw do
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # User routes
  resources :users, only: [:create]

  # Sessions routes
  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

  # Task routes
  namespace :api do
    resources :tasks, only: [:create, :show, :update, :destroy]

    post '/task_list', to: 'tasks#index'
  end

  # Other routes are handled by react-routers
  get "*path", to: "home#index", constraints: { format: "html" }
end
