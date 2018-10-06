import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import axios from "axios";
import AOS from "aos";
import "./EmpCard.css";
import "aos/dist/aos.css";

AOS.init();


class EmpCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      description: "",
      jobTitle: "",
      // techStack: "", // TODO: Sanitize info to avoid validation error in database whild POST/PUT
      // skills: "", // TODO: Sanitize info to avoid validation error in database whild POST/PUT
      minSalary: "",
      maxSalary: ""
    };
    // this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // this.handleEdit = this.handleEdit.bind(this);
  }


  handleDelete = event => {
    const id = event.target.openPositions.id;
        axios.delete(`/api/register/employers/${id}`,
    ).then(() => {
      window.location.reload();
    });
  }

  // handleEdit(event) {
  //   const id = e.target.database.id;
  //   axios.put(`/api/register/employers/${id}`,
  //   {
  //     ...userInfo,
  //   },
  //   {
  //     headers: {
  //       Authorization: localStorage.getItem('token'),
  //     },
  //   },).then(() => {
  //     window.location.reload();
  //   });
  // }


  render() {
    return (
      <div
        class="cardContainer"
        data-aos="flip-up"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        <Card class="cardPaper">
        <div>
          <div>
            <Typography variant="caption">Project Name</Typography>
            <Typography variant="subheading">
              {this.props.projectName}
            </Typography>
          </div>

          <div class="disc">
            <Typography variant="caption">description</Typography>
            <Typography variant="subheading">
              {this.props.description}
            </Typography>
          </div>

          <div>
            <Typography variant="caption">Job Title</Typography>
            <Typography variant="subheading">{this.props.jobTitle}</Typography>
          </div>

          {/* <div>
            <Typography variant="caption">Tech Stack:</Typography>
            <Typography variant="subheading">{this.props.techStack}</Typography>
          </div>

          <div>
            <Typography variant="caption">Required Skills</Typography>
            <Typography variant="subheading">{this.props.skills}</Typography>
          </div> */}

          <div>
            <Typography variant="caption">Salary range</Typography>
            <Typography variant="subheading">
              {this.props.minSalary} - {this.props.maxSalary}
            </Typography>
          </div>

          <div className="cardButtons">
            <Button
              className="cardButton"
              variant="contained"
              color="primary"
              onClick={this.handleDelete}
            >
              Edit
            </Button>

            <Button
              className="cardButton"
              variant="contained"
              color="secondary"
              onClick={this.handleDelete}
            >
              Delete
            </Button>
          </div>
          </div>
        </Card>
      </div>
    );
  }
}
export default EmpCard;
