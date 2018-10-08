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
 */
class TestWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    return <Fragment>{children({ ...this.props })}</Fragment>;
  }
}

export default TestWrapper;
