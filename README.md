# Todo API

This is a simple Todo API built with Node.js, Express, and MongoDB. It allows users to manage their todo items with functionalities such as creating, reading, updating, and deleting todos. Additionally, it includes user authentication with JWT.

## Project URL

For more information about this project, visit the [Todo List API project on roadmap.sh](https://roadmap.sh/projects/todo-list-api).

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Henry33y/todo_api.git
    cd todo_api
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_jwt_secret_key` with a secure key for JWT.

## Running the API

Start the server:
```sh
npm run dev
```

The server will start on the port specified in the `.env` file (default is 5000).

## API Endpoints

### Authentication

- **Register a new user**
    ```http
    POST /api/register
    ```
    - Request body:
        ```json
        {
            "name": "John Doe",
            "email": "john@example.com",
            "password": "password123"
        }
        ```

- **Login**
    ```http
    POST /api/login
    ```
    - Request body:
        ```json
        {
            "email": "john@example.com",
            "password": "password123"
        }
        ```

### Todos

- **Get all todos**
    ```http
    GET /api/todos
    ```
    - Query parameters:
        - `page`: Page number (required)
        - `limit`: Number of items per page (required)

- **Create a new todo**
    ```http
    POST /api/todos
    ```
    - Request body:
        ```json
        {
            "title": "New Todo",
            "description": "Todo description"
        }
        ```

- **Update a todo**
    ```http
    PUT /api/todos/:id
    ```
    - Request body:
        ```json
        {
            "title": "Updated Todo",
            "description": "Updated description"
        }
        ```

- **Delete a todo**
    ```http
    DELETE /api/todos/:id
    ```

## Postman Environment

To use the API with Postman, you can import the provided Postman folder. This file contains pre-configured requests for all the endpoints.

1. Open Postman.
2. Click on `Import` in the top left corner.
3. Select the entirre Postman folder (`TodoPostmanWorkspace`).
4. Use the pre-configured requests to interact with the API.

## License

This project is licensed under the MIT License.