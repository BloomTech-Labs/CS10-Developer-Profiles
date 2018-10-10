import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import './InputGeolocation.css';

/**
 * An Input component connected to `Google Maps API`.
 *
 * @description A component that populates the APP's global state
 * with suggested places, and its coordinates, from the Google Maps API.
 * @class A class component constructor
 * @prop {Function} talkToParentState - A function to pass InputGeolocation's
 * state to a parent component.
 * @prop {object} textFieldProps - Contains all props needed to be passed
 * to <TextField /> component.
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
 * @prop {Function} googleCallback - Optional callback to enable async mode.
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

    /**
     * Console.log error with Google API and reset geo-coordinates
     *
     * @return {void}
     */
    this.handleError = (error, clearSuggestions) => {
      console.log('Error with Google API', error);
      clearSuggestions(); // this is built-in handler within <PlacesAutocomplete>
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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
  setClassName(type, active = false) {
    const { textFieldProps, listItemProps } = this.props;

    const baseClass = {
      input: 'input-geolocation',
      listItem: active ? 'list-item list-item--active' : 'list-item',
    }[type];

    const propsClass = {
      input: textFieldProps && textFieldProps.className ? textFieldProps.className : null,
      listItem: listItemProps && listItemProps.className ? listItemProps.className : null,
    }[type];

    return propsClass ? `${baseClass} ${propsClass}` : baseClass;
  }

  /**
   * Set global APP state with geolocation
   *
   * @return {void}
   */
  passStateToParent() {
    try {
      const { talkToParentState } = this.props;
      const { place, lat, lng } = this.state;
      talkToParentState(place, lat, lng);
    } catch (e) {
      // prettier-ignore
      // eslint-disable-next-line no-unused-expressions
      e instanceof TypeError
        ? console.log({
          Component: 'InputGeolocation',
          Error: "APP's global state was not set",
          message: e.message,
          Requirement: 'this.props.handleGlobalState is needed',
        })
        : console.log({
          Component: 'InputGeolocation',
          Error: e.message,
        });
    }
  }

  /**
   * Set local-scope state with user input
   *
   * @return {void}
   */
  handleChange(place) {
    const clearParentState = () => {
      const { place } = this.state;
      if (place === '') this.passStateToParent();
    };

    this.setState(
      {
        place,
        lat: '',
        lng: '',
      },
      clearParentState,
    );
  }

  /**
   * Set local and global state with 'latitude' and 'longitud' after selecting a 'place'
   *
   * @return {void}
   */
  handleSelect(placeSelected) {
    this.setState({ isFetchingCoordinates: true, place: placeSelected });
    // prettier-ignore
    geocodeByAddress(placeSelected)
      .then(res => getLatLng(res[0]))
      .then((latlng) => {
        this.setState({
          lat: latlng.lat,
          lng: latlng.lng,
          isFetchingCoordinates: false,
        });
        // eslint-disable-next-line no-console
        console.log(this.state);
        this.passStateToParent();
      })
      .catch((er) => {
        this.setState({ isFetchingCoordinates: false });
        // eslint-disable-next-line no-console
        console.log({ 'Error Geocoding': er });
      });
  }

  /** Return a <TextField /> and a <List /> components */
  render() {
    const { place } = this.state;
    const { textFieldProps, listItemProps, googleCallback } = this.props;
    const isDense = true;
    return (
      <PlacesAutocomplete
        value={place}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.handleError}
        googleCallbackName={googleCallback}
      >
        {/* This function renders the 'input' and the 'suggestion-list' Elements */}
        {({
          getInputProps,
          getSuggestionItemProps,
          // loading,
          suggestions,
        }) => (
          <div className="geolocation-container">
            {/* function getInputProps -> is a built-in handler within <PlacesAutocomplete> */}
            {/*
              function getInputProps ->
              @return {Object} whit all the props to pass to <TextField>
            */}
            <TextField
              {...getInputProps({
                label: 'Search locations',
                ...textFieldProps,
                className: this.setClassName('input', false),
              })}
            />
            {suggestions.length > 0 && (
              <List dense={isDense} className="suggestion-list">
                {suggestions.map((suggestion) => {
                  const { active } = suggestion;
                  const { mainText, secondaryText } = suggestion.formattedSuggestion;

                  /**
                   * function getSuggestionItemProps -> is a built-in
                   * handler within <PlacesAutocomplete>
                   */
                  /**
                   * function getSuggestionItemProps -> @return {Object}
                   * whit all the props to pass to <ListItem>
                   */
                  return (
                    <ListItem
                      key={`${mainText}${secondaryText}`}
                      dense
                      {...getSuggestionItemProps(suggestion, {
                        ...listItemProps,
                        className: this.setClassName('listItem', active),
                      })}
                    >
                      <ListItemText primary={mainText} secondary={secondaryText && secondaryText} />
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
