import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Handle Array-type properties
 *
 * @description Handle in a local-state new date to be added to a global-state array-field.
 * @prop {} arr - The array to handle.
 * @prop {string|object|array} itemSchema - Which type of data the array contains.
 * @prop {} title - A label to be displayed
 * @prop {} field - The global-state field holding the array.
 * @prop {} setPFS - Handler to set the parent-form state.
 */
class ArrayController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      itemType: '',
    };
    // prettier-ignore
    this.handleChange = (
      this.handleChange.bind(this)
    );
    this.setArrayControllerState = this.setArrayControllerState.bind(this);
    this.updateFormState = this.updateFormState.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.initializeLocalState();
  }

  /**
   * Update local state and parent ArrayController state.
   *
   * @method setArrayControllerState
   * @param {object} properties - Properties to be set. { property: value }
   * @return {void}
   *
   * @example Pass as a prop to component.
   * <Component setPFS={this.setArrayControllerState} />
   */
  setArrayControllerState(properties) {
    this.setState(properties);
  }

  /**
   * Initialize local-state with array-items's property(ies)
   *
   * @method
   * @description If Array's items are object: populate the local state with the object-keys,
   * else, set a 'newItem' property to handle nested 'Strings', 'Numbers' and 'Booleans'
   *
   * @example this.props.arr = [ 'JAVASCRIPT', 'PYTHON', 'C', true, 2018 ]
   * Set local state: this.setState( { newItem: '' } )
   *
   * @example this.props.arr = [ { name: name-1, email: email-1}, { name: name-2, email: email-2} ]
   * Set local state: this.setState( { name: '', email: '' } )
   */
  initializeLocalState() {
    // eslint-disable-next-line react/prop-types
    const { itemSchema } = this.props;

    // const item = arr[0];

    // Get the item type
    const itemType = Object.prototype.toString.call(itemSchema);

    switch (itemType) {
      case '[object Object]':
        this.setState({
          ...itemSchema,
          itemType: 'object',
          ready: true,
        });
        break;
      case '[object Array]':
        this.setState({
          // TODO: handle nested Arrays
          itemType: 'array',
          ready: true,
        });
        break;
      // If itemSchema='singleItem'
      default:
        // '[object String]' || '[object Number]' || // '[object Boolean]'
        this.setState({ newItem: '', itemType: 'singleItem', ready: true });
    }
  }

  handleChange(ev) {
    /**
     * Stop event propagation.
     * @description Stop this event to be listened and handled in parent Nodes.
     */
    ev.stopPropagation();
    console.log('AC onChange', { id: ev.target.id, value: ev.target.value });
    // Get the item type
    const { itemType } = this.state;

    const { id } = ev.target;
    const details = id.split('-');

    if (details[0] === 'edit') {
      const { arr, field, setPFS } = this.props;
      // Get index and field to update
      const index = details[1];
      const itemProperty = details[2];

      // Make a copy of the array-field
      const toUpdate = [...arr];
      // Update array-item
      toUpdate[index][itemProperty] = ev.target.value;

      console.log('TYPE', itemType, field, itemProperty, toUpdate);

      /**
       * Set parent-form state
       */
      setPFS({ [field]: [...toUpdate] });
    } else {
      // Handle change in local-state
      // '[object String]' || '[object Number]' || // '[object Boolean]'
      this.setState({ [ev.target.id]: ev.target.value });
    }
  }

  /**
   * Update parent Form-state.
   */
  updateFormState(e, obj) {
    console.log('AC: updateFormState');
    // eslint-disable-next-line react/prop-types
    const { arr, field, setPFS } = this.props;

    if (obj) {
      // prettier-ignore
      return (event) => {
        console.log('AC: STATE CAPSULE UPDATE', event.target, e, obj);
        setPFS({});
      };
    }

    /**
     * Create an new Object with the properties to be pushed to the array.
     */
    const toUpdate = { ...this.state };
    delete toUpdate.ready;
    delete toUpdate.itemType;
    console.log({ toUpdate });

    // Get the item type
    const { itemType } = this.state;

    /**
     * Update Form-state
     */
    switch (itemType) {
      case 'object':
        console.log('TYPE OBJ', field, toUpdate);
        setPFS({ [field]: [...arr, toUpdate] });
        break;
      case 'array':
        // TODO: handle nested Arrays
        break;
      default:
        // '[object String]' || '[object Number]' || // '[object Boolean]'
        setPFS({ [field]: [...arr, toUpdate.newItem] });
    }

    // Re-initialize Local State
    this.initializeLocalState();

    return null; // this fix eslint consistent-return warning
  }

  /**
   * Remove an item form the Array
   */
  removeItem(index) {
    const { arr, field, setPFS } = this.props;
    return function remove(e) {
      /**
       * Stop event propagation.
       * @description Stop this event to be listened and handled in parent Nodes.
       */
      e.stopPropagation();

      // console.log('REMOVE ITEM', { index, E: e.target });

      // Make a cooy of the original Array
      const toUpdate = [...arr];

      // Remove the item
      toUpdate.splice(index, 1);

      // Update Form state
      setPFS({ [field]: toUpdate });
    };
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { arr, title, children } = this.props;
    const { ...state } = this.state;

    const toRender = state.ready ? (
      <div className="array-controller">
        {children({
          setArrayControllerState: this.setArrayControllerState,
          updateFormState: this.updateFormState,
          handleChange: this.handleChange,
          removeItem: this.removeItem,
          state,
          arr,
          title,
        })}
      </div>
    ) : null;

    return toRender;
  }
}

ArrayController.propTypes = {
  arr: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  setPFS: PropTypes.func.isRequired,
};

export default ArrayController;
