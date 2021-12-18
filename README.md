<div id="top"></div>

# CVWO Assignment 2022 - [Task Management App](https://task-peppapighs.herokuapp.com/)

Name | Matriculation number
---- | ----
Pontakorn Prasertsuk | A0236560H

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#user-guide">User Guide</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About The Project

Task Management App provides an online service for tracking your daily tasks which can be accessed across different devices with the user authentication system. The application works on both desktop and mobile phone.

<p align="right">(<a href="#top">Back to top</a>)</p>

## Built with

* [React.js](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Ruby on Rails](https://rubyonrails.org/)
* [Postgresql](https://www.postgresql.org/)

<p align="right">(<a href="#top">Back to top</a>)</p>

## Getting Started

This section provides a quick start guide for this project.

### Prerequisites

* yarn, ruby, sqlite3, rails: Please refer to Step 3.1 of this [guide](https://guides.rubyonrails.org/getting_started.html).
* postgresql
  ```sh
  sudo apt install postgresql postgresql-contrib libpq-dev
  ```

### Installation

1. Start postgresql service
    ```sh
    sudo service postgresql start
    ```
2. Configuring postgresql according to Step 1 of [this guide](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-ruby-on-rails-application-on-ubuntu-18-04).
3. Clone the repo
   ```sh
   git clone https://github.com/PeppaPigHS/cvwo-assignment-2022.git
   ```
4. Configuring `config/database.yaml` according to Step 4 of [this guide](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-ruby-on-rails-application-on-ubuntu-18-04).
5. Install ruby packages
   ```sh
   bundle install
   ```
6. Create local database
   ```sh
   rails db:create
   ```
7. Start the application
   ```sh
   bin/dev
   ```
   The application can be access through `localhost:3000`

<p align="right">(<a href="#top">Back to top</a>)</p>

## User Guide

### Navigating The App

#### Navigation Bar
 
The navigation bar contains links such as Sign up, Sign in, or Sign out, depending on whether you are signed in or not.

#### [Home Page](https://task-peppapighs.herokuapp.com/)

* If not signed in, you should see a welcome message with links where you can sign in or sign up.
* Otherwise, the home page will show the table containing your tasks and search menu.

### Getting Started

#### New Users

* Sign up for a new account [here](https://task-peppapighs.herokuapp.com/signup).
* Fill in __username__, __password__, and __password confirmation__. Your username must be unique and __please remember your username and password as there is no way to recover them__.

#### Existing Users

* Head over to the sign-in page [here](https://task-peppapighs.herokuapp.com/signin).
* Once signed in, the app will automatically redirect you to the home page.

### Managing Tasks

#### Adding New Task

* Click "Add Task" (or the button with "+" sign for mobile user) at the bottom right corner of the screen or head over to this [link](https://task-peppapighs.herokuapp.com/new)
* Fill in the task details until satisfied.
* You may choose to save, or cancel.
* If you choose to save, the app will redirect you the home page with your new task in the table.

#### Viewing, Editing, and Deleting Task

* Click on the task you want to view, edit, or delete. The app will redirect you to the edit page containing the selected task's details.
* Edit the details until satisfied.
* You may choose to save, cancel, or delete the task at the end of the page.
* If you choose to delete the task, a confirmation will pop up. You may choose to cancel the deletion or proceed.

#### Searching Tasks

* Click on the search menu at the top of the task table in the home page.
* The form will pop up where you can optionally provide filters including title keywords, description keywords, status, and tags.
* You may choose to search the tasks according to the provided filters, or reset the filters.

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. 

<p align="right">(<a href="#top">Back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">Back to top</a>)</p>
