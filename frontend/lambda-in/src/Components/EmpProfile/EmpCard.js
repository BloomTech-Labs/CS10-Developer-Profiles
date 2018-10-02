import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import axios from "axios";
import AOS from "aos";
import "./EmpCard.css";
import "aos/dist/aos.css";

AOS.init();


class EmployerPositionCard extends React.Component {
  static defaultProps = {
    projectName: "Enterprise-D",
    description: "We are watching for the captain of the Federation Flagship.",
    jobTitle: "Captain",
    techStack: "full stack",
    skills: ["Diplomacy", "Leadership", "Tactical Strategy"],
    minSalary: 1000000,
    maxSalary: 2000000
  };

  handleDelete(e) {
    const id = e.target.dataset.id;
    axios.delete(`/api/register/employers/${id}`).then(() => {
      window.location.reload();
    });
  }

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

          <div>
            <Typography variant="caption">Tech Stack:</Typography>
            <Typography variant="subheading">{this.props.techStack}</Typography>
          </div>

          <div>
            <Typography variant="caption">Required Skills</Typography>
            <Typography variant="subheading">{this.props.skills}</Typography>
          </div>

          <div>
            <Typography variant="caption">Salary range</Typography>
            <Typography variant="subheading">
              {this.props.minSalary} - {this.props.maxSalary}
            </Typography>
          </div>

          <div className="buttons">
            <Button
              className="button"
              component={Link} to="/emp-pos-edit"
              variant="contained"
              color="secondary"
            >
              Edit
            </Button>

            <Button
              className="button"
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
export default EmployerPositionCard;
