Some nice Frontend docs are in progress.
Please contact us for any needed details.
Please contact us for any needed details missing here.

# Developer enviroment

### Requirements:

> node

### Before running the APP

At the `/frontend/lambda-in` folder, create a `.env.local` file with the following:

```
  NODE_ENV= development
  REACT_APP_URL=http://localhost:3000/
```

then change your working directory to the `frontend/lambda-in` root folder:

```
  $ cd frontend/lambda-in/
```

than, install dependencies and run the APP:

```
  $ yarn
  ... installing dependencies
  ...
  ... success installing dependencies
  $ yarn start
```

lastly, go to the APP in your browser:

> [Visit the APP](http://localhost:3000/)

# Dependencies

```
"dependencies": {
    "@material-ui/core": "^3.0.3",
    "axios": "^0.18.0",
    "react": "^16.5.0",
    "react-dom": "^16.5.0",
    "react-form": "^3.5.6",
    "react-router-dom": "^4.3.1",
    "react-scripts": "1.1.5"
  }
```

# Code Style

> pending to define
