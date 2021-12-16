class SessionsController < ApplicationController
    # Create a new session
    def create
        @user = User.find_by(username: session_params[:username])

        # Authenticate user credentials
        if @user && @user.authenticate(session_params[:password])
            login!
            render json: {
                status: 201,
                user: @user
            }
        else
            render json: {
                status: 401,
                errors: ['Make sure your username and password are correct.']
            }
        end
    end

    # Check whether there is a logged in user
    def is_logged_in?
        if logged_in? && current_user
            render json: {
                status: 200,
                user: current_user
            }
        else 
            render json: {
                status: 400,
                errors: ['No such user']
            }
        end
    end

    # Clear session and logout
    def destroy
        logout!
        render json: {
            status: 200
        }
    end

    private

    def session_params
        params.require(:user).permit(:username, :password)
    end
end