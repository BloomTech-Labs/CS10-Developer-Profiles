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
  ... installing dependencies
  ...
  ... success installing dependencies
  $ yarn start
```

# Dependencies

- "dependencies"
  - bcrypt
  - dotenv
  - express
  - express-router-factory
  - mongoose
- "devDependencies"
  - concurrently
  - cross-env
  - eslint
  - eslint-config-airbnb-base
  - eslint-plugin-import
  - jest
  - nodemon
  - supertest

# Available Scripts

Change your working directory to the `backend` root folder:

```
  $ cd backend/
```

From here you can run:

### `yarn client`

Runs client in development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn dev`

Runs full application, client and server, in development mode.

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- API can be accessed at [http://localhost:5000/api/](http://localhost:5000/api/). See API documentation for more information.

### `yarn server`

Runs the server in development mode. Nodemon will cause the page to reload if you make edits.
- API can be accessed at [http://localhost:5000/api/](http://localhost:5000/api/). See API documentation for more information.

### `yarn start`

Runs the server.
- API can be accessed at [http://localhost:5000/api/](http://localhost:5000/api/). See API documentation for more information.

### `yarn test`

Launches Jest in interactive watch mode.

### `yarn test-console-log`

Launches Jest in interactive watch mode but prevents Jest from overwritting console logs.
