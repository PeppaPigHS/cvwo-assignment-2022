class Api::TasksController < ApplicationController
    # Return user's tasks filtered according to the parameters (multiple tags, keywords, status)
    def index
        @tasks = current_user.tasks.order(:status, :title)

        if params[:title_keyword]
            @tasks = @tasks.where("title ILIKE ?", "%#{params[:title_keyword]}%")
        end

        if params[:description_keyword]
            @tasks = @tasks.where("description ILIKE ?","%#{params[:description_keyword]}%")
        end

        if params[:status]
            @tasks = @tasks.where("status = ?", params[:status])
        end

        if params[:tag_list]
            params[:tag_list].map do |t|
                @tasks = @tasks.by_tag(t)
            end
        end

        render json: {
            status: 200,
            task_id: @tasks.pluck(:id)
        }
    end

    # Creat a task and save tags
    def create
        @task = current_user.tasks.new(task_params)
        if @task.save && @task.save_tags(params[:task][:tag_list])
            render json: {
                status: 201,
                task: @task,
                tags: @task.tags.order(:name)
            }
        else
            render json: {
                status: 500,
                errors: @task.errors.full_messages
            }
        end
    end

    # Show a single task
    def show
        @task = current_user.tasks.find(params[:id])
        
        render json: {
            status: 200,
            task: @task,
            tags: @task.tags.order(:name)
        }
    end

    # Update a task
    def update
        @task = current_user.tasks.find(params[:id])
        if @task.update(task_params) && @task.save_tags(params[:task][:tag_list])
            @task.clean_up_tags
            render json: {
                status: 201,
                task: @task,
                tags: @task.tags.order(:name)
            }
        else
            render json: {
                status: 500,
                errors: @task.errors.full_messages
            }
        end
    end

    # Delete a task
    def destroy
        @task = current_user.tasks.find(params[:id])  
        if @task.destroy
            render json: {
                status: 200
            }
        else
            render json: {
                status: 500,
                errors: ['Cannot delete the task']
            }
        end
    end

    private

    def task_params
        params.require(:task).permit(:title, :description, :status, :tag_list)
    end
end
