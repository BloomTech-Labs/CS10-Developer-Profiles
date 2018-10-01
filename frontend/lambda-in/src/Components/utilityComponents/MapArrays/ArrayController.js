import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MapUnorderedList from './MapUnorderedList';

class ArrayController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      itemType: '',
    };
    this.handleArrayControllerState = this.handleArrayControllerState.bind(this);
    this.updateFormState = this.updateFormState.bind(this);
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
    /**
     * Return a copy of the passed object's keys set to an empty string
     *
     * @param {object} object - The original object
     * @return {object} A copy with all the original-object's keys set to an empty string
     * @example
     * : mapAndResetKeysValues({ 1:1, 2:2, 3:3, 4:4 })
     * : will return -> {1: "", 2: "", 3: "", 4: ""}
     */
    // prettier-ignore
    const mapAndResetKeysValues = object => Object.keys(object).reduce((resetKeys, key) => {
      // eslint-disable-next-line no-param-reassign
      resetKeys[key] = '';
      return resetKeys;
    }, {});

    // eslint-disable-next-line react/prop-types
    const { arr } = this.props;
    // console.log('AC arr', { arr });
    // return;
    const item = arr[0];

    // Get the item type
    const itemType = Object.prototype.toString.call(item);

    switch (itemType) {
      case '[object Object]':
        this.setState({ ...mapAndResetKeysValues(item), itemType: 'object', ready: true });
        break;
      case '[object Array]':
        // TODO: handle nested Arrays
        break;
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
    // ev.stopPropagation();

    this.setState({ [ev.target.id]: ev.target.value });
  }

  // handleDelete() {}

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

    const item = arr[0];
    // Get the item type
    const itemType = Object.prototype.toString.call(item);

    /**
     * Update Form-state
     */
    switch (itemType) {
      case '[object Object]':
        setFS({ [field]: [...arr, toUpdate] });
        break;
      case '[object Array]':
        // TODO: handle nested Arrays
        break;
      default:
        // '[object String]' || '[object Number]' || // '[object Boolean]'
        setFS({ [field]: [...arr, toUpdate.newItem] });
    }

    // ResetLocalState
    this.setLocalState();
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { arr, title } = this.props;
    const { newItem, ready } = this.state;

    const toRender = ready ? (
      <div className="array-controller">
        <Button variant="outlined" color="primary" align="center" onClick={this.updateFormState}>
          {`Add new ${title}`}
        </Button>
        <div className="inputFieldLargeMultiline" onChange={this.handleArrayControllerState}>
          <TextField
            id="newItem"
            label="Top skills"
            fullWidth
            multiline
            rowsMax="4"
            value={newItem}
            margin="normal"
            variant="outlined"
          />
        </div>
        <MapUnorderedList array={arr} />
      </div>
    ) : null;

    return toRender;
  }
}

export default ArrayController;
