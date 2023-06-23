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
    -- Using `npm`

     ```shell
     npm install
     ```

     This command will download and install all the packages defined in the `package.json` file into a `node_modules` directory.

    -- Using `yarn`

    ```shell
     yarn install
     ```
4. Install node_modules for backend:
    - Navigate to the backend folder using the command:
    ```shell
   cd ../backend
   ```
   - Install the packages like `step 3`.

5. Add `environemnt variables`
    - In the backend folder copy the example.env file and create a .env file and paste it there
       ```
    DATABASE_URL= mongodb+srv://
    TEST_DATABASE=mongodb+srv://
    ...
   ```
    - Do the same in the frontend folder

6. Start the servers
    - Backend:
    ```shell
   cd backend
   npm start
   ```

   - Frontend:
   ```shell
   cd ../frontend
   npm run dev
   ```

7. Run the app through `docker`

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
