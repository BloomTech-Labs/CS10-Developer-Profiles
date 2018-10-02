import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

/**
 * Handle Array-type properties
 *
 * @description Handle in a local-state new date to be added to a global-state array-field.
 * @prop {} arr - The array to handle.
 * @prop {string|object|array} itemSchema - Which type of data the array contains.
 * @prop {} title - A label to be displayed
 * @prop {} field - The global-state field holding the array.
 * @prop {} setFS - Handler to set the parent-form state.
 */
class ArrayController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      itemType: '',
    };
    // prettier-ignore
    this.handleArrayControllerState = (
      this.handleArrayControllerState.bind(this)
    );
    this.updateFormState = this.updateFormState.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.setLocalState();
  }

  /**
   * Populate local-state with array-items's property(ies)
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
  setLocalState() {
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

  handleArrayControllerState(ev) {
    /**
     * Stop event propagation.
     * @description Stop this event to be listened and handled in parent Nodes.
     */
    ev.stopPropagation();

    this.setState({ [ev.target.id]: ev.target.value });
  }

  /**
   * Update parent Form-state.
   */
  updateFormState() {
    // eslint-disable-next-line react/prop-types
    const { arr, field, setFS } = this.props;

    /**
     * Create an new Object with the properties to be pushed to the array.
     */
    const toUpdate = { ...this.state };
    delete toUpdate.ready;
    delete toUpdate.itemType;

    // Get the item type
    const { itemType } = this.state;

    /**
     * Update Form-state
     */
    switch (itemType) {
      case 'object':
        setFS({ [field]: [...arr, toUpdate] });
        break;
      case 'array':
        // TODO: handle nested Arrays
        break;
      default:
        // '[object String]' || '[object Number]' || // '[object Boolean]'
        setFS({ [field]: [...arr, toUpdate.newItem] });
    }

    // ResetLocalState
    this.setLocalState();
  }

  /**
   * Remove an item form the Array
   */
  removeItem(index) {
    const { arr, field, setFS } = this.props;
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
      setFS({ [field]: toUpdate });
    };
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { arr, title, children } = this.props;
    const { ...state } = this.state;

    const toRender = state.ready ? (
      <div className="array-controller">
        {children({
          handleArrayControllerState: this.handleArrayControllerState,
          updateFormState: this.updateFormState,
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
  setFS: PropTypes.func.isRequired,
};

export default ArrayController;
