Some nice Backend docs are in progress.
Please contact us for any needed details missing here.

# Developer enviroment

### Requirements:

> A local mongoDB running

### Before running the server

Create a `.env` file with the following:

```
  PORT=5000
  MONGODB_URI='mongodb://localhost/developer-profiles'
```

then change your working directory to the `backend` root folder:

```
  $ cd backend/
```

lastly, install dependencies and run the server:

```
  $ yarn
  ... isntalling dependencies
  ...
  ... success installing dependencies
  $ yarn start
```

# Dependencies

- "dependencies"
  - dotenv
  - express
  - express-router-factory
  - mongoose
- "devDependencies"
  - concurrently
  - nodemon
