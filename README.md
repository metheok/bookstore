# Getting Started with Create React App

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the front-end on [http://localhost:3000](http://localhost:3000) and API on [http://localhost:8080](http://localhost:8080)

API endpoints:

1.  GET - http://localhost:8080/application-test-v1.1/books
    Fetch all books with pagination, filter, sortBy

2.  POST http://localhost:8080/application-test-v1.1/books
    Create a new book - name, author and genre required

3.  PUT http://localhost:8080/application-test-v1.1/books/:id
    Update existing book

4.  GET http://localhost:8080/application-test-v1.1/books/:id
    Fetch a book by id

### `npm run build`

Builds the front-end app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
