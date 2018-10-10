import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Create a local state to manage an object's properties whilist is edited.
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
    this.createItem = this.createItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    // prettier-ignore
    this.mapAndResetKeysValues = object => Object.keys(object)
      .reduce((resetKeys, key) => {
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
    this.resetState();
  }

  resetState() {
    const { schema, object } = this.props;
    const newState = {
      ...this.mapAndResetKeysValues(schema),
      ...object,
      ready: true,
    };

    // Set local state with object-properties and initialize its values.
    this.setState(newState);
  }

  /**
   * Sync local state with input field.
   */
  handleChange(event) {
    event.stopPropagation();

    const { id } = event.target;
    const details = id.split('-');
    const field = details[1];
    const { value } = event.target;

    this.setState({ [field]: value });
  }

  handleKeyPress(e) {
    e.stopPropagation();
    const { chips } = e.target.dataset;

    if (e.key === 'Enter' && chips) {
      e.preventDefault();

      const details = e.target.id.split('-');
      const { field } = e.target.dataset;
      const { value } = e.target;

      this.setState((prevState) => {
        const toUpdate = prevState[field];
        toUpdate.push(value);
        return { [field]: toUpdate, [details[1]]: '' };
      });
    }
  }

  createItem(field) {
    const newData = { ...this.state };
    delete newData.ready;

    const createEvent = new CustomEvent('onCreateItem', {
      bubbles: true,
      detail: {
        newData,
        field,
      },
    });
    return (e) => {
      e.stopPropagation();

      e.target.dispatchEvent(createEvent);
      this.resetState();
    };
  }

  removeItem(field, index) {
    const removeEvent = new CustomEvent('onDeleteItem', {
      bubbles: true,
      detail: { field, index },
    });

    return (e) => {
      e.stopPropagation();

      //
      e.target.dispatchEvent(removeEvent);

      const typeOfField = Object.prototype.toString.call(field);

      if (
        // prettier-ignore
        typeOfField === '[object String]'
        || typeOfField === '[object Number]'
        || typeOfField === '[object Boolean]'
      ) {
        this.setState((prevState) => {
          const toUpdate = prevState[field];
          toUpdate.splice(index, 1);
          return { [field]: toUpdate };
        });
      }
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
          createItem: this.createItem,
        })}
      </div>
    ) : null;
  }
}

StateCapsule.propTypes = {
  schema: PropTypes.shape({}).isRequired,
  object: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
};

export default StateCapsule;
