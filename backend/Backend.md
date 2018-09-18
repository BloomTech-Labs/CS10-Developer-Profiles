Some nice Backend docs are in progress.
Please contact us for any needed details missing here.

# Developer enviroment

### Requirements:

> A local mongoDB running

### Before running the server

At the `/backend` root folder, create a `.env` file with the following:

```
  PORT=5000
  MONGODB_URI='mongodb://localhost/developer-profiles'
  MONGODB_URI_TEST='mongodb://localhost/testdb'
  JWT_SECRET="your personal secret goes here"
```

Also, at the `/backend` root folder, create a `.eslintrc` file with the following:

```
  {
    "extends": "airbnb-base",
    "env": {
      "jasmine": true
  }
}
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

```
  "dependencies": {
    "bcrypt": "^3.0.0",
    "cors": "^2.8.4",
    "dotenv": "^6.0.0",
    "express": "^4.16.3",
    "express-router-factory": "^1.0.3",
    "helmet": "^3.13.0",
    "jsonwebtoken": "^8.3.0",
    "mongoose": "^5.2.14"
  },
  "devDependencies": {
    "concurrently": "^4.0.1",
    "eslint": "^5.5.0",
    "eslint-config-airbnb-base": "^13.1.0",
    "eslint-plugin-import": "^2.14.0",
    "jest": "^23.6.0",
    "nodemon": "^1.18.4",
    "supertest": "^3.3.0"
  }
```

# Code Style

The backend is following the Airbnb base code style.

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