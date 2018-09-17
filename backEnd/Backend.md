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

The backend is folowing the Aribnb base code style.

