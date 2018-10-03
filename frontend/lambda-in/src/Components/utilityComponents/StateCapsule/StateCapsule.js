import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Create a local state to manage an object whilist is edited.
 *
 * @description
 */
class StateCapsule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.mapAndResetKeysValues = object =>
      // eslint-disable-next-line implicit-arrow-linebreak
      Object.keys(object).reduce((resetKeys, key) => {
        // eslint-disable-next-line no-param-reassign
        const valueType = Object.prototype.toString.call(object[key]);

        switch (valueType) {
          case '[object Array]':
            // eslint-disable-next-line no-param-reassign
            resetKeys[key] = [];
            break;
          default:
            // eslint-disable-next-line no-param-reassign
            resetKeys[key] = '';
        }

        return resetKeys;
      }, {});
  }

  componentDidMount() {
    const { schema, object } = this.props;

    const newState = {
      ...this.mapAndResetKeysValues(schema),
      ...object,
      ready: true,
    };
    console.log('SC: cdm', newState);
    // Set local state with object-properties and initialize its values.
    this.setState(newState);
    console.log('SC: cdm', this.state);
  }

  /**
   * Sync local state with input field.
   */
  handleChange(event) {
    // console.log('Form Dev update');
    event.stopPropagation();

    const { id } = event.target;
    const details = id.split('-');
    const field = details[1];
    const { value } = event.target;
    console.log('SC handleChange:', this.state, { details, value });

    this.setState({ [field]: value });
  }

  render() {
    const { ready } = this.state;

    const stateCapsule = { ...this.state };
    delete stateCapsule.ready;

    const { updateParent, children } = this.props;

    return ready ? (
      <div onChange={this.handleChange}>{children({ stateCapsule })}</div>
    ) : null;
  }
}

export default StateCapsule;
