import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';

class InputGeolocation extends Component {
  state = {
    place: '',
    lat: '',
    lng: '',
    isFetchingCoordinates: false,
  };
  render() {
    const { place, lat, lng, isFetchingCoordinates } = this.state;

    return (
      <div>
        <PlacesAutocomplete
          value={place}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          onError={this.handleError}
        />
      </div>
    );
  }

  // Set geolocation data in the Global state
  setGlobalState = () => {};

  // Handle user input in the 'input' field
  handleChange = place => {
    this.setState = {
      place,
      lat: '',
      lng: '',
    };
  };

  // Set 'latitude' and 'longitud' after selecting a 'place'
  handleSelect = placeSelected => {
    this.setState({ isFetchingCoordinates: true, place: placeSelected });

    geocodeByAddress(placeSelected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          lat,
          lng,
          isFetchingCoordinates: false,
        });
      })
      .catch(er => {
        this.setState({ isFetchingCoordinates: false });
        console.log({ 'Error Geocoding': er });
      });

    this.setGlobalState();
  };

  handleError = (error, clearSugesstions) => {
    console.log('Error with Google API', error);
    clearSugesstions(); // this is built-in handler whitin <PlacesAutocomplete>
  };
}

// import default InputGeolocation;

/**
 * EXAMPLE:
 */

const isObject = val => {
  return typeof val === 'object' && val !== null;
};

const classnames = (...args) => {
  const classes = [];
  args.forEach(arg => {
    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (isObject(arg)) {
      Object.keys(arg).forEach(key => {
        if (arg[key]) {
          classes.push(key);
        }
      });
    } else {
      throw new Error('`classnames` only accepts string or object as arguments');
    }
  });

  return classes.join(' ');
};

class SearchGeolocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      isGeocoding: false,
    };
  }

  handleChange = address => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: '',
    });
  };

  handleSelect = selected => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: '',
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const { address, errorMessage, latitude, longitude, isGeocoding } = this.state;

    return (
      <div>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places...',
                      className: 'Demo__search-input',
                    })}
                  />
                  {this.state.address.length > 0 && (
                    <button className="Demo__clear-button" onClick={this.handleCloseClick}>
                      x
                    </button>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {suggestions.map(suggestion => {
                      const className = classnames('Demo__suggestion-item', {
                        'Demo__suggestion-item--active': suggestion.active,
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <div {...getSuggestionItemProps(suggestion, { className })}>
                          <strong>{suggestion.formattedSuggestion.mainText}</strong>{' '}
                          <small>{suggestion.formattedSuggestion.secondaryText}</small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                    <div className="Demo__dropdown-footer">
                      <div>
                        {/* <img
                          src={require('../images/powered_by_google_default.png')}
                          className="Demo__dropdown-footer-image"
                        /> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
        {errorMessage.length > 0 && <div className="Demo__error-message">{this.state.errorMessage}</div>}

        {((latitude && longitude) || isGeocoding) && (
          <div>
            <h3 className="Demo__geocode-result-header">Geocode result</h3>
            {isGeocoding ? (
              <div>
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
              </div>
            ) : (
              <div>
                <div className="Demo__geocode-result-item--lat">
                  <label>Latitude:</label>
                  <span>{latitude}</span>
                </div>
                <div className="Demo__geocode-result-item--lng">
                  <label>Longitude:</label>
                  <span>{longitude}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default SearchGeolocation;
