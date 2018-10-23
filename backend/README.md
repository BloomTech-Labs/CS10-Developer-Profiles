# Some nice Backend docs are in progress.

Please contact us for any needed details missing here.

# Developer environment

### Requirements:

> A local mongoDB running

### Before running the server

At the `/backend` root folder, create a `.env` file with the following:

```
  NODE_ENV=development
  PORT=5000
  MONGODB_URI='mongodb://localhost/developer-profiles'
  MONGODB_URI_TEST='mongodb://localhost/testdb'
  JWT_SECRET="your personal secret goes here"
  STRIPE_BACKEND_SECRET_KEY_TEST=sk_test_k8mGtXkO8MVgyDH8Y1Nct5n2
  STRIPE_BACKEND_SECRET_KEY_PRODUCTION=sk_production_key_goes_here
```

Also, at the `/backend` root folder, create a `.eslintrc` file with the following:

```json
  {
    "extends": "airbnb-base",
    "env": {
      "jest": true
    },
    "rules": {
      "import/no-extraneous-dependencies": [
        "error",
        {
          "devDependencies": true
        }
      ]
    }
  }
```

then change your working directory to the `backend` root folder:

```bash
  $ cd backend/
```

lastly, install dependencies and run the server:

```bash
  $ yarn
  ... installing dependencies
  ...
  ... success installing dependencies
  $ yarn start
```

# Dependencies

```json
  "dependencies": {
    "async": "^2.6.1",
    "bcrypt": "^3.0.1",
    "cors": "^2.8.4",
    "cross-env": "^5.2.0",
    "dotenv": "^6.0.0",
    "express": "^4.16.3",
    "express-router-factory": "^1.1.0",
    "helmet": "^3.13.0",
    "jsonwebtoken": "^8.3.0",
    "mongoose": "^5.2.14",
    "nodemailer": "^4.6.8",
    "stripe": "^6.12.1"
  },
  "devDependencies": {
    "concurrently": "^4.0.1",
    "cross-env": "^5.2.0",
    "eslint": "^5.5.0",
    "eslint-config-airbnb-base": "^13.1.0",
    "eslint-plugin-import": "^2.14.0",
    "faker": "^4.1.0",
    "jest": "^23.6.0",
    "nodemon": "^1.18.4",
    "supertest": "^3.3.0"
  }
```

# Code Style

The backend is following the Airbnb base code style.

# Available Scripts

Change your working directory to the `backend` root folder:

```bash
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

### `yarn get-mock-data`

Generates a new set of mock data for the seed command. Raw data files can be found in `./backend/api/dataGenerator/data`.

### `yarn seed`

Seeds local development database with mock data records for testing. Raw data can be found in `./backend/api/dataGenerator/data`.

### `yarn server`

Runs the server in development mode. Nodemon will cause the page to reload if you make edits.

- API can be accessed at [http://localhost:5000/api/](http://localhost:5000/api/). See API documentation for more information.

### `yarn start`

Runs the server.

- API can be accessed at [http://localhost:5000/api/](http://localhost:5000/api/). See API documentation for more information.

### `yarn test`

Launches Jest in interactive watch mode.

### `yarn test-console-log`

Launches Jest in interactive watch mode but prevents Jest from overwriting console logs.

# Public and Private content

## Private content

Is only accessible for registered/logged-in clients

> The Auth workflow is done with JWT

### To access private endpoints

> 1. Remember to add the Authorization header to your HTTP requests.
> 2. `Authorization`'s value == JWT
