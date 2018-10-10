# Some nice Frontend docs are in progress.

Please contact us for any needed details.

# Developer environment

### Requirements:

> node

### Before running the APP

At the `/frontend/lambda-in` folder, create a `.env.local` file with the following:

```
  NODE_ENV=development
  REACT_APP_STRIPE_PUBLIC_KEY_TEST=pk_test_TrhkR0IYq5UE3tsvU5NON1r5
  REACT_APP_STRIPE_PUBLIC_KEY_PRODUCTION=pk_production_key_goes_here
  REACT_APP_STRIPE_CURRENCY=USD
```

then change your working directory to the `frontend/lambda-in` root folder:

```
  $ cd frontend/lambda-in/
```

then, install dependencies and run the APP:

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
    "@fortawesome/fontawesome-svg-core": "^1.2.4",
    "@fortawesome/free-brands-svg-icons": "^5.3.1",
    "@fortawesome/free-solid-svg-icons": "^5.3.1",
    "@fortawesome/react-fontawesome": "^0.1.3",
    "@material-ui/core": "3.1.0",
    "@material-ui/icons": "^3.0.1",
    "aos": "^3.0.0-beta.5",
    "axios": "^0.18.0",
    "classnames": "^2.2.6",
    "dotenv": "^6.0.0",
    "prop-types": "^15.6.2",
    "react": "^16.5.0",
    "react-dom": "^16.5.0",
    "react-form": "^3.5.6",
    "react-gsap-enhancer": "^0.3.0",
    "react-places-autocomplete": "^7.2.0",
    "react-router-dom": "^4.3.1",
    "react-scripts": "1.1.5",
    "react-select": "^2.0.0",
    "react-stripe-checkout": "^2.6.3",
    "react-transition-group": "^2.4.0"
  },
  "devDependencies": {
    "enzyme": "^3.7.0",
    "enzyme-adapter-react-16": "^1.6.0",
    "eslint": "^5.6.0",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-plugin-import": "^2.14.0",
    "eslint-plugin-jsx-a11y": "^6.1.1",
    "eslint-plugin-react": "^7.11.1",
    "prop-types": "^15.6.2",
    "react-test-renderer": "^16.5.2"
  }
```

# Code Style

> Airbnb react style guides.

# Auth flow

[[https://github.com/Lambda-School-Labs/CS10-Developer-Profiles/blob/jesuarva-polish-the-code/frontend/Component%20structure%20and%20data%20flow/Component%20structure%20and%20data%20flow-1.png]]

# Components structure and data flow

[[https://github.com/Lambda-School-Labs/CS10-Developer-Profiles/blob/jesuarva-polish-the-code/frontend/Component%20structure%20and%20data%20flow/Component%20structure%20and%20data%20flow-2.png]]

# Testing components

## Do not install jest

[Create-react-app already have `jest` installed.](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)

## Potential bug and solution:

If you fall into this Error:

```
$ react-scripts test --env=jsdom
2018-10-07 02:07 node[18472] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
2018-10-07 02:07 node[18472] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
2018-10-07 02:07 node[18472] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
events.js:167
      throw er; // Unhandled 'error' event
      ^

Error: EMFILE: too many open files, watch
    at FSEvent.FSWatcher._handle.onchange (fs.js:1372:28)
Emitted 'error' event at:
    at FSEvent.FSWatcher._handle.onchange (fs.js:1378:12)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

it is necessary to install [`watchman`](https://facebook.github.io/watchman/docs/install.html)

run:

> $ brew update
> $ brew install watchman

in case you do not have `brew`, [install it](https://docs.brew.sh/Installation)
