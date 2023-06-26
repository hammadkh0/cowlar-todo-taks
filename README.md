# How to Run the Todo App

This guide will walk you through the steps to run a todo app. 

## Prerequisites

Before you begin, ensure that you have the following installed:

- [Node.js](https://nodejs.org) (version 12 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) package manager


1. Clone the repository:

   ```shell
   git clone https://github.com/hammadkh0/cowlar-todo-taks.git
   ```

2. Navigate to the project directory:

   ```shell
    cd cowlar-task
   ```
3. Install node_modules for frontend:
    Navigate to the frontend folder using the command:
    
    ```shell
   cd frontend
   ```
    Install packages using npm or yarn.
     Using `npm`

     ```shell
     npm install
     ```

     This command will download and install all the packages defined in the `package.json` file into a `node_modules` directory.

     Using `yarn`

    ```shell
     yarn install
     ```
4. Install node_modules for backend:
   Navigate to the backend folder using the command:
    ```shell
   cd ../backend
   ```
   First install for the user service by `cd user-service`. then run the command:
   Install the packages with either
   ```shell
   npm install 
   ```
   or
   ```
   yarn install
   ```

   Repeat the same for the todo-service. `cd ../todo-service` and then install the packages.

5. Add `environemnt variables`
    In the backend folder copy the example.env file and create a .env file and paste it there
    ```shell
    DATABASE_URL= mongodb+srv://
    TEST_DATABASE=mongodb+srv://
    ...
   ```
    - Do the same in the frontend folder

6. Start the servers
    - Backend:
      Go to the user-service folder and then run the command:
    ```shell
   cd backend
   npm start
   ```
      Repeat the same for the todo-service folder.
   
   - Frontend:
   ```shell
   cd ../frontend
   npm run dev
   ```

8. Run the app through `docker`
 
     To run the Task Manager App using Docker, follow these steps:
- Clone the repository:

   ```shell
   git clone https://github.com/hammadkh0/cowlar-todo-taks.git
   ```
- Navigate to the project directory:

   ```shell
   cd cowlar-task
   ```
- Add your DATABASE_URL in docker-compose.yml file :
    copy from the example.env for backend
   ```
   environment:
      - DATABASE_URL=<MONGO URI String>
      - TEST_DATABASE_URL=...
   ```

- Docker-Compose:

   ```shell
   docker-compose up
   ```

- This will start the frontend app on `http://localhost:5173` and backend server on `http://localhost:3000`.
8. Testing
  - Make sure that the `TEST_DATABASE_URL` is in the .env file
  - Go to the backend/tests folder and run the command
     ``` shell
     npm run test
     ```
