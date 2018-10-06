import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import "./OpenPositionEdit.css";

export default class OpenPositionEdit extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.setFormState= this.handleUpdate.bind(this);
  }

  componentDidMount() {
    const { getGS } = this.props;

    this.userStateCopy = { ...getGS('userInfo')};
    this.setState({...getGS('userInfo')});
  }

  setFormState(props) {
    this.setState(props);
  }

  handleChange(event) {
    event.stopPropagation();
    this.setState({
        [event.target.id]: event.target.value
    });
  };

  handleUpdate = e => {
    const userInfo = this.props.getGS("userInfo");
    const _id = userInfo._id;

    if (_id) {
      /**
       * Set in GS 'updateState': 'updateState' = 'updating'
       */
      this.props.setGS({ updateState: "updating" });

      /**
       * axios.put: Make an HTTP PUT request
       *
       * @description update the 'employers' model.
       * @param {string} endpoint - API endppoint
       * @param {objetc} userInfo - Data to be updated
       * @param {object} httpHeaders - Add Authorization header.
       * @return {promise}
       * @example axios.put( endpoint, userInfo, httpHeaders )
       */
      axios
        // axios 1 argument is URL and 2 argument is data 3 argument is options
        .put(
          `/api/employers/${_id}`,
          {
            ...userInfo // UPDATE current userInfo's state. TODO: pass only updated fields.
          },
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
        .then(response => {
          console.log("UPDATE USER", { status: response.status });
          /**
           * Set in GS 'updateState': 'updateState' = 'updated'
           */
          this.props.setGS({ updateState: "updated" });
        })
        .catch(error => {
          console.log(error);
          /**
           * Set in GS 'updateState': 'updateState' = 'error'
           */
          this.props.setGS({ updateState: "error" });
        });
    } else {
      console.log("updating without ID");
      /**
       * Set in GS 'updateState': 'updateState' = 'error'
       */
      this.props.setGS({ updateState: "error" });
      alert(
        "An error occurred updating your information, please resubmit the form"
      ); // TODO: improve UX
    }
  };
  render() {
    /**
     * Get a reference to APP's global state.
     */
    const userInfo = this.props.getGS("userInfo");

    return (
      <div className="EditContainer">
        <Paper className="paperContainer" elevation={1}>
          <Typography variant="display1" gutterBottom align="center">
            Edit Open Position
          </Typography>
          <br />
          <form onChange={this.handleChange}>
            <div className="inputRow">
              <TextField
                id="projectName"
                label="Project Name"
                value={this.state.projectName}
                onChange={this.handleChange("projectName")}
                margin="normal"
                fullWidth="true"
              />

              <TextField
                id="description"
                label="Description"
                value={this.state.description}
                onChange={this.handleChange("description")}
                margin="normal"
                fullWidth="true"
              />

              <TextField
                id="jobTitle"
                label="Job Title"
                value={this.state.jobTitle}
                onChange={this.handleChange("jobTitle")}
                margin="normal"
                fullWidth="true"
              />

              <TextField
                id="techStack"
                label="Tech Stack"
                value={this.state.techStack}
                onChange={this.handleChange("techStack")}
                margin="normal"
                fullWidth="true"
              />

              <TextField
                id="skills"
                label="Skills"
                value={this.state.skills}
                onChange={this.handleChange("skills")}
                margin="normal"
                fullWidth="true"
              />

              <TextField
                id="minSalrary"
                label="minSalrary"
                value={this.state.minSalrary}
                onChange={this.handleChange("minSalrary")}
                margin="normal"
                fullWidth="true"
              />

              <TextField
                id="maxSalary"
                label="maxSalary"
                value={this.state.maxSalary}
                onChange={this.handleChange("maxSalary")}
                margin="normal"
                fullWidth="true"
              />
              <div class="buttons">
                <Button
                  variant="contained"
                  color="primary"
                  align="center"
                  onClick={this.EditPosition}
                >
                  {" "}
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}
