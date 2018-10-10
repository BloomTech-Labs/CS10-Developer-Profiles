import React, { Component, Fragment } from 'react';

/**
 * A Functional stateless component wrapper
 *
 * @description Enzyme's 'shallow' method don't create an instance for
 * stateless functional componets
 * Whitout an instance is not possible to access the functional componet's
 * props.
 * Because enzyme's shallow generate an instance for class coponents, <TestWrapper/>
 * allow us to access any functional coponent passed as a children.
 * @see https://github.com/airbnb/enzyme/issues/1232#issuecomment-334510754
 */
class TestWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Catch children component error an log them in test-enviroment
   *
   * @description An Error bundary to catch potential children component's
   * Javascrip errors
   * @see https://reactjs.org/docs/error-boundaries.html
   * @param {object} error - Error ebject
   * @param {object} info - Component stack on error
   */
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.log('Error Bundary', error, info);
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    return <Fragment>{children({ ...this.props })}</Fragment>;
  }
}

export default TestWrapper;
