import React, { Component, Fragment } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import './InputGeolocation.css';

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
   * Define the string containing all the classes needed for a 'className' prop.
   *
   * @param type {String} Copmponen name (input or listItem)
   * @param active {Boolean} Define wheter the ListItem Element is active or not
   * @param ...classNames {Array} Array of strings holding all passed strings which define the class names
   * @example
   *  For setClassName('class-name--1', '...' , 'class-name--n')
   *  ...classNames = ['class-name--1', '...' , 'class-name--n']
   * @return {String} The string definig all class names passed
   * @example
   *  'class-name--1 ... class-name--n'
   */
  setClassName = (type, active = false) => {
    const { textFieldOptions, listOptions } = this.props;

    const baseClass = {
      input: 'input-geolocation',
      suggestion: 'list-item',
    }[type];

    const propsClass = {
      input: textFieldOptions && textFieldOptions.className ? textFieldOptions.className : '',
      suggestion: listOptions && listOptions.className ? listOptions : '',
    };

    return `${baseClass} ${propsClass}`;
  };

  // Set geolocation data in the Global state
  setGlobalState = () => {};

  // Handle user input in the 'input' field
  handleChange = place => {
    this.setState({
      place,
      lat: '',
      lng: '',
    });
  };

  // Set 'latitude' and 'longitud' after selecting a 'place'
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
      })
      .catch(er => {
        this.setState({ isFetchingCoordinates: false });
        console.log({ 'Error Geocoding': er });
      });

    // this.setGlobalState();
  };

  handleError = (error, clearSuggestions) => {
    console.log('Error with Google API', error);
    clearSuggestions(); // this is built-in handler within <PlacesAutocomplete>
  };

  render() {
    return (
      <PlacesAutocomplete
        onChange={this.handleChange}
        value={this.state.place}
        onSelect={this.handleSelect}
        onError={this.handleError}
      >
        {/* This is a fucntion that render the Input Node and the 'suggestion-list' */}
        {({ getInputProps, getSuggestionItemProps, loading, suggestions }) => (
          <Fragment>
            <TextField
              {...getInputProps({
                label: 'Search locations',
                ...this.props.textFieldOptions,
                className: this.setClassName('input', false),
              })}
            />
            {suggestions.length > 0 && (
              <List dense={true} className="suggestion-list">
                {suggestions.map(suggestion => {
                  const { mainText, secondaryText } = suggestion.formattedSuggestion;
                  const active = suggestion.active;

                  return (
                    /* eslint-disable react/jsx-key */
                    <ListItem
                      key={`${mainText}${secondaryText}`}
                      dense
                      {...getSuggestionItemProps(suggestion, this.props.listOptions)}
                    >
                      <ListItemText primary={mainText} secondary={secondaryText ? secondaryText : null} />
                    </ListItem>
                  );
                  /* eslint-enable react/jsx-key */
                })}
              </List>
            )}
          </Fragment>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default InputGeolocation;
