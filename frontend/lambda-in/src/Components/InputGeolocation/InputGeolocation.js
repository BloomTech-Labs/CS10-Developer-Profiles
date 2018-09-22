import React, { Component, Fragment } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import './InputGeolocation.css';

/**
 * An Input component connected to `Google Maps API`.
 *
 * @description A component that populates the APP's global state with suggested places, and its coordinates, from the Google Maps API.
 * @class A class component constructor
 * @prop {Function} handleGlobalState - A function which sets the Global state with the geolocation data.
 * @prop {object} textFieldProps - Contains all props needed to be passed to <TextField /> component.
 * @example How to pass textFieldProps
 * <TextField textFieldProps={{
 *    id: 'sampleTextField',
 *    label: 'Desired Locations',
 *    fullWidth: true,
 *    margin: 'normal',
 *    className: 'textField-class--name another-class--name',
 *    style: { background-color: niceblue, font-size: 10em },
 *    variant: 'outlined',
 *    other_props: others_needed_prop
 *    // DO NOT PASS `value` => Is nto neccesary, Will break this.setState() functionality
 *  }}
 * />
 *
 * @prop {object} listItemProps - Contains all props needed to be passed to <ListItem /> component.
 * @example How to pass listItemProps
 * <ListItem textFieldProps={{
 *    className: 'list-suggestion--options',
 *    style: {},
 *  }}
 * />
 */
class InputGeolocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: '',
      lat: '',
      lng: '',
      isFetchingCoordinates: false,
    };
  }

  /**
   * Returns a string ahich holds all the class names needed for the 'className' prop.
   *
   * @param {string} type - Copmponent's role (expected: input || listItem).
   * @param {boolean} [active = false] - Define wheter the ListItem Element is active or not.
   * @return {string} The string definig all class names passed in textFieldProps || listItemProps.
   * @example return
   *  'class-name--1 ... class-name--n'
   */
  setClassName = (type, active = false) => {
    const { textFieldProps, listItemProps } = this.props;

    const baseClass = {
      input: 'input-geolocation',
      listItem: active ? 'list-item list-item--active' : 'list-item',
    }[type];

    const propsClass = {
      input: textFieldProps && textFieldProps.className ? textFieldProps.className : null,
      listItem: listItemProps && listItemProps.className ? listItemProps.className : null,
    }[type];

    console.log({ propsClass });
    console.log(typeof propsClass);
    console.log({ CLASSNAME: `${baseClass} ${propsClass}` });
    return propsClass ? `${baseClass} ${propsClass}` : baseClass;
  };

  /**
   * Set global APP state with geolocation
   *
   * @return {void}
   */
  setGlobalState = () => {
    // this.props.handleGlobalState();
  };

  /**
   * Set local-scope state with user input
   *
   * @return {void}
   */
  handleChange = place => {
    this.setState({
      place,
      lat: '',
      lng: '',
    });
  };

  /**
   * Set local and global state with 'latitude' and 'longitud' after selecting a 'place'
   *
   * @return {void}
   */
  handleSelect = placeSelected => {
    this.setState({ isFetchingCoordinates: true, place: placeSelected });
    geocodeByAddress(placeSelected)
      .then(res => getLatLng(res[0]))
      .then(latlng => {
        this.setState({
          lat: latlng.lat,
          lng: latlng.lng,
          isFetchingCoordinates: false,
        });
        console.log(this.state);
        this.setGlobalState();
      })
      .catch(er => {
        this.setState({ isFetchingCoordinates: false });
        console.log({ 'Error Geocoding': er });
      });
  };

  /**
   * Console.log error with Google API and reset geo-coordinates
   *
   * @return {void}
   */
  handleError = (error, clearSuggestions) => {
    console.log('Error with Google API', error);
    clearSuggestions(); // this is built-in handler within <PlacesAutocomplete>
  };

  /** Return a <TextField /> and a <List /> components */
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.place}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.handleError}
      >
        {/* This function renders the 'input' and the 'suggestion-list' Elements */}
        {({ getInputProps, getSuggestionItemProps, loading, suggestions }) => (
          <div className="geolocation-container">
            {/* function getInputProps -> is a built-in handler within <PlacesAutocomplete> */}
            {/* function getInputProps -> @return {Object} whit all the props to pass to <TextField> */}
            <TextField
              {...getInputProps({
                label: 'Search locations',
                ...this.props.textFieldProps,
                className: this.setClassName('input', false),
              })}
            />
            {suggestions.length > 0 && (
              <List dense={true} className="suggestion-list">
                {suggestions.map(suggestion => {
                  const active = suggestion.active;
                  const { mainText, secondaryText } = suggestion.formattedSuggestion;

                  {
                    /* function getSuggestionItemProps -> is a built-in handler within <PlacesAutocomplete> */
                  }
                  {
                    /* function getSuggestionItemProps -> @return {Object} whit all the props to pass to <ListItem> */
                  }
                  return (
                    <ListItem
                      key={`${mainText}${secondaryText}`}
                      dense
                      {...getSuggestionItemProps(suggestion, {
                        ...this.props.listItemProps,
                        className: this.setClassName('listItem', active),
                      })}
                    >
                      <ListItemText primary={mainText} secondary={secondaryText ? secondaryText : null} />
                    </ListItem>
                  );
                })}
              </List>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default InputGeolocation;
