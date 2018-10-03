import React, { Component } from 'react';
// import EventEmitter
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
    this.removeItem = this.removeItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.mapAndResetKeysValues = object =>
      // eslint-disable-next-line implicit-arrow-linebreak
      Object.keys(object).reduce((resetKeys, key) => {
        // eslint-disable-next-line no-param-reassign
        const valueType = Object.prototype.toString.call(object[key]);

        switch (valueType) {
          case '[object Array]':
            // eslint-disable-next-line no-param-reassign
            resetKeys[key] = [];
            // eslint-disable-next-line no-param-reassign
            resetKeys[`${key}_edit`] = '';
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

  handleKeyPress(e) {
    e.stopPropagation();
    // console.log(e.key, e.target.value);

    if (e.key === 'Enter') {
      e.preventDefault();

      const details = e.target.id.split('-');

      const { field } = e.target.dataset;
      const { value } = e.target;
      // eslint-disable-next-line react/destructuring-assignment
      this.setState((prevState, props) => {
        const toUpdate = prevState[field];
        // console.log({
        //   [field]: toUpdate,
        //   prevState,
        //   'prevState[field]': prevState[field],
        // });
        toUpdate.push(value);
        return { [field]: toUpdate, [details[1]]: '' };
      });
    }
  }

  removeItem(field, index) {
    const removeEvent = new CustomEvent('onDeleteItem', {
      bubbles: true,
      detail: { field, index },
    });

    // eslint-disable-next-line arrow-parens
    return e => {
      console.log('SC removeItem', { field, index });
      e.stopPropagation();

      //
      e.target.dispatchEvent(removeEvent);

      this.setState((prevState, props) => {
        const toUpdate = prevState[field];
        toUpdate.splice(index, 1);
        return { [field]: toUpdate };
      });
    };
  }

  render() {
    const { ready } = this.state;

    const stateCapsule = { ...this.state };
    delete stateCapsule.ready;

    const { children } = this.props;

    return ready ? (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className="state-capsule"
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      >
        {children({
          stateCapsule,
          removeItem: this.removeItem,
        })}
      </div>
    ) : null;
  }
}

StateCapsule.propTypes = {};

export default StateCapsule;
