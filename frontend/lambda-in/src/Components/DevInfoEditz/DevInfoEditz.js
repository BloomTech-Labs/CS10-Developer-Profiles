import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
// import './DevInfoEditz.css';
import BasicInfo from './SeekerEditUtils/BasicInfo';
import SocialLinks from './SeekerEditUtils/SocialLinks';
import BioSkills from './SeekerEditUtils/BioSkills';
import Projects from './SeekerEditUtils/Projects';
import Experience from './SeekerEditUtils/Experience';
import Education from './SeekerEditUtils/Education';

/**
 * Form handling user profile updates.
 *
 * @description This component handle in a local-state all data modification.
 * The global state is updeated only when a PUT request response with status 200.
 *
 * @param {function} setGS - An App.js' method to set global state.
 * @param {fuction} getGS - An App.js' method to get global state.
 */
class DevInfoEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
    this.handleOnDeleteItem = this.handleOnDeleteItem.bind(this);
    this.handleCreateItem = this.handleCreateItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setFormState = this.setFormState.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.update = this.update.bind(this);
  }

  /**
   * Get a copy of App's global user state to keep global state inmutable.
   */
  componentDidMount() {
    const { getGS } = this.props;
    this.userStateCopy = { ...getGS('userInfo') };
    this.setState({ ready: true, ...getGS('userInfo') });

    /**
     * Listen for MapChip's custom event emmited when a item is deleted.
     */
    // eslint-disable-next-line react/no-find-dom-node
    ReactDOM.findDOMNode(this).addEventListener(
      'onDeleteItem',
      this.handleOnDeleteItem,
    );

    // eslint-disable-next-line react/no-find-dom-node
    ReactDOM.findDOMNode(this).addEventListener(
      'onCreateItem',
      this.handleCreateItem,
    );
  }

  componentWillUnmount() {
    // eslint-disable-next-line react/no-find-dom-node
    ReactDOM.findDOMNode(this).removeEventListener('onDeleteItem', () => null);
    // eslint-disable-next-line react/no-find-dom-node
    ReactDOM.findDOMNode(this).removeEventListener('onCreateItem', () => null);
  }

  /**
   * Update local state.
   *
   * @method setFormState
   * @param {object} properties - Properties to be set. { property: value }
   * @return {void}
   *
   * @example Pass as a prop to component.
   * <Component setLS={this.setFormState} />
   */
  setFormState(properties) {
    this.setState(properties);
  }

  /**
   * Sync local state with input field.
   */
  handleChange(event) {
    event.stopPropagation();
    this.setState({ [event.target.id]: event.target.value });
  }

  updateArray(dataset) {
    /**
     * Data attributes expected
     * {
     *  'data-field': Main field,
     *  'data-itemtype': Type of data the array contain,
     *  'data-index': index,
     *  'data-property': If 'itemtype' === 'object -> this define the object's 'property',
     *  'data-value': New value,
     * }
     */
    // prettier-ignore
    const {
      field,
      itemtype,
      index,
      property,
      // subindex,
      value,
    } = dataset;

    switch (itemtype) {
      case 'object':
        this.userStateCopy[field][index][property] = value;
        break;
      case 'array':
        break;
      default:
        // '[object String]' || '[object Number]' || // '[object Boolean]'
        this.userStateCopy[field] = value.split('-');
    }
  }

  /**
   * Update local copy of user state
   */
  handleOnBlur(e) {
    const { id } = e.target;
    const details = id.split('-'); // 'id' came in the following format: 'new-email' || 'edit-email'

    const field = e.target.dataset.field || details[1];

    if (details[0] !== 'new' && field) {
      const dataset = { ...e.target.dataset };
      const value = dataset.value || e.target.value;

      const typeOfField = Object.prototype.toString.call(
        this.userStateCopy[field],
      );

      switch (typeOfField) {
        case '[object Object]':
          // this.updateObj(e);
          break;
        case '[object Array]':
          this.updateArray(dataset);
          break;
        default:
          // '[object String]' || '[object Number]' || '[object Boolean]'
          this.userStateCopy[field] = value;
      }
    } else {
      /**
       * @todo improve UX with some type of error message.
       */
    }
  }

  handleOnDeleteItem(e) {
    const { field, index } = e.detail;
    this.userStateCopy[field].splice(index, 1);
    this.setState({ ...this.userStateCopy });
  }

  handleCreateItem(e) {
    const { field, newData } = e.detail;
    this.userStateCopy[field].push(newData);
    this.setState({ ...this.userStateCopy });
  }

  update() {
    const { setGS } = this.props;

    // Prepare data to be updated
    const userInfo = { ...this.userStateCopy };
    delete userInfo.ready;

    const { _id } = userInfo;

    if (_id) {
      /**
       * Set 'updateState' in GS : 'updateState' = 'updating'
       */
      setGS({ updateState: 'updating' });

      /**
       * axios.put: Make an HTTP PUT request
       *
       * @description update the 'seekers' model.
       * @param {string} endpoint - API endppoint
       * @param {objetc} userInfo - Data to be updated
       * @param {object} httpHeaders - Add Authorization header.
       * @return {promise}
       * @example axios.put( endpoint, userInfo, httpHeaders )
       */
      // prettier-ignore
      axios
        // axios 1 argument is URL and 2 argument is data 3 argument is options
        .put(
          `/api/seekers/${_id}`,
          {
            ...userInfo, // UPDATE current userInfo's state. TODO: pass only updated fields.
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          },
        )
        .then((response) => {
          const updatedData = response.data['Document(s) modified'];
          /**
           * Update GS
           */
          setGS({ updateState: 'updated', userInfo: updatedData });
        })
        .catch(() => {
          /**
           * Set in GS 'updateState': 'updateState' = 'error'
           */
          setGS({ updateState: 'error' });
        });
    } else {
      /**
       * Set in GS 'updateState': 'updateState' = 'error'
       */
      setGS({ updateState: 'error' });

      /**
       * @todo improve UX, change 'alert' for a more friendly error interaction
       */
      // eslint-disable-next-line no-alert
      alert(
        'An error occurred updating your information, please resubmit the form',
      );
    }
  }

  render() {
    /**
     * Get a reference to APP's global state.
     */
    const { ready } = this.state;
    const userInfo = this.userStateCopy;

    /**
     * If component is mount -> Render nested children
     * That ensure that before each children renders, each children receives 'props'
     * and not an 'undefined' prop.
     */
    const toRender = ready ? (
      <div onBlur={this.handleOnBlur}>
        {/* User basic info: name, desired title, current location */}
        <BasicInfo userInfo={userInfo} />

        {/* SOCIAL LINKS */}
        <SocialLinks userInfo={userInfo} />

        {/* BIO - TOP SKILLS */}
        <BioSkills userInfo={userInfo} />

        {/* PROJECTS */}
        <Projects userInfo={userInfo} />

        {/* EXPERIENCES */}
        <Experience userInfo={userInfo} />

        {/* EDUCATION */}
        <Education userInfo={userInfo} />
      </div>
    ) : null;

    return (
      <div className="EditContainer">
        <Paper className="paperContainer" elevation={1}>
          <Typography variant="display1" gutterBottom align="center">
            Lambda Network
          </Typography>
          <br />
          <form onChange={this.handleChange}>
            <div className="inputRow">
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  align="center"
                  onClick={this.update}
                >
                  Confirm changes
                </Button>
              </div>
              {toRender}
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

DevInfoEdit.propTypes = {
  getGS: PropTypes.func.isRequired,
  setGS: PropTypes.func.isRequired,
};

export default DevInfoEdit;
