import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import './DevInfoEditz.css';
import BasicInfo from '../utilityComponents/SeekerEditUtils/BasicInfo';
import SocialLinks from '../utilityComponents/SeekerEditUtils/SocialLinks';
import BioSkills from '../utilityComponents/SeekerEditUtils/BioSkills';
import Projects from '../utilityComponents/SeekerEditUtils/Projects';

/**
 * Form handling user profile updates
 *
 * @description This component handle in a local-state all data modification.
 * The global state is updeated only when the PUT request response with status 200
 */
class DevInfoEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.setFormState = this.setFormState.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  /**
   * Get a copy of user's data to keep global state inmutable.
   */
  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { getGS } = this.props;
    // console.log('FORM', this.props);
    this.userStateCopy = { ...getGS('userInfo') };
    this.setState({ ready: true });
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
    // console.log({ setGS: properties });
    this.setState(properties);
  }

  /**
   * Sync local state with input field.
   */
  handleChange(event) {
    // console.log('Form Dev update');
    event.stopPropagation();
    this.setState({ [event.target.id]: event.target.value });
  }

  updateObj(property, item1, item2) {
    const currentObj = { ...this.userStateCopy[property] };

    const typeOfItem1 = Object.prototype.toString.call(currentObj[item1]);

    switch (typeOfItem1) {
      case '[object Object]':
        break;
      case '[object Array]':
        break;
      // If itemSchema='singleItem'
      default:
        // '[object String]' || '[object Number]' || // '[object Boolean]'

        // eslint-disable-next-line no-case-declarations
        const nestedProp = item1;
        // eslint-disable-next-line no-case-declarations
        const nestedValue = item2;

        this.userStateCopy = {
          ...this.userStateCopy,
          [property]: { ...currentObj, [nestedProp]: nestedValue },
        };
    }
  }

  updateArrayOfObjects(array, index, property, index2, value) {}

  updateArray(property, index, item1, key, item2) {
    const currentArray = { ...this.userStateCopy[property] };

    const typeOfElement = Object.prototype.toString.call(currentArray[index]);

    switch (typeOfElement) {
      case '[object Object]':
        this.updateArrayOfObjects(currentArray, index, item1, key, item2);
        break;
      case '[object Array]':
        break;
      // If itemSchema='singleItem'
      default:
        // '[object String]' || '[object Number]' || // '[object Boolean]'
        currentArray.splice(index, 1, item1);
        this.userStateCopy = {
          ...this.userStateCopy,
          [property]: currentArray,
        };
    }
  }

  /**
   * Update local copy of user state
   */
  handleOnBlur(e, property, index, item1, key, item2) {
    console.log('FORM handleOnBlur', e.target);
    // eslint-disable-next-line arrow-parens
    const typeOfProp = Object.prototype.toString.call(
      // eslint-disable-next-line comma-dangle
      this.userStateCopy[property]
    );

    const { id } = e.target;
    const details = id.split('-');
    const field = details[1];
    const { value } = e.target;

    switch (typeOfProp) {
      case '[object Object]':
        this.updateObj(property, item1, item2);
        break;
      case '[object Array]':
        this.updateArray(property, index, item1, key, item2);
        break;
      // If itemSchema='singleItem'
      default:
        // '[object String]' || '[object Number]' || // '[object Boolean]'
        this.userStateCopy[field] = value;
    }
    console.log('FORM handleOnBlur', { userStateCopy: this.userStateCopy });
  }

  update() {
    // eslint-disable-next-line react/prop-types
    const { setGS } = this.props;

    // Prepare data to be updated
    const userInfo = { ...this.userStateCopy };
    delete userInfo.ready;
    console.log('MAIN FORM', userInfo);

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
          
          // eslint-disable-next-line no-console
          console.log('UPDATE USER', { response, status: response.status });
          /**
           * Update GS
           */
          setGS({ updateState: 'updated', userInfo: updatedData });
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
          /**
           * Set in GS 'updateState': 'updateState' = 'error'
           */
          setGS({ updateState: 'error' });
        });
    } else {
      // eslint-disable-next-line no-console
      console.log('updating without ID');
      /**
       * Set in GS 'updateState': 'updateState' = 'error'
       */
      setGS({ updateState: 'error' });
      // eslint-disable-next-line no-alert, no-undef
      alert(
        // eslint-disable-next-line comma-dangle
        'An error occurred updating your information, please resubmit the form'
      ); // TODO: improve UX
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
        {/* <SocialLinks userInfo={userInfo} /> */}

        {/* BIO - TOP SKILLS */}
        {/* <BioSkills setFS={this.setFormState} userInfo={userInfo} /> */}

        {/* PROJECTS */}
        {/* <Projects
          handleBlur={this.handleOnBlur}
          setFS={this.setFormState}
          userInfo={{ ...userInfo }}
        /> */}

        {/* EXPERIENCES */}
        {/* <Experience userInfo={userInfo} /> */}

        {/* EDUCATION */}
        {/* <Education userInfo={userInfo} /> */}
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
              {toRender}
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  align="center"
                  onClick={this.update}
                >
                  {' '}
                  Update profile
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

export default DevInfoEdit;
