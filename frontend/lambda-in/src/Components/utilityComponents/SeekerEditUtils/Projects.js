import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DropDown from '../DropDown/DropDown';
import ArrayController from '../MapArrays/ArrayController';
import MapChips from '../MapArrays/MapChips';
import MapDropDown from '../MapArrays/MapDropDown';

// eslint-disable-next-line arrow-parens
const Projects = props => {
  const { userInfo, setFS } = props;

  const projectSchema = {
    title: '',
    description: '',
    img: '',
    link: '',
    repo: '',
    tech: [],
  };

  return (
    <Fragment>
      <DropDown header="Add your best projects">
        <ArrayController
          itemSchema={projectSchema}
          title="Projects"
          field="projects"
          setPFS={setFS}
          arr={userInfo.projects}
        >
          {/* eslint-disable-next-line object-curly-newline */}
          {({
            handleChange,
            setArrayControllerState,
            updateFormState,
            removeItem,
            state,
            arr,
            title,
          }) => (
            <Fragment>
              <div className="project-container" onChange={handleChange}>
                <DropDown header="New project details">
                  <div className="inputs-container">
                    <div className="inputFieldLargeMultiline">
                      <TextField
                        id="title"
                        label="Project"
                        fullWidth
                        multiline
                        rowsMax="4"
                        value={state.title}
                        margin="normal"
                        variant="outlined"
                      />
                    </div>
                    <div className="inputFieldLargeMultiline">
                      <TextField
                        id="description"
                        label="Description"
                        fullWidth
                        multiline
                        rowsMax="4"
                        value={state.description}
                        margin="normal"
                        variant="outlined"
                      />
                    </div>
                    <div className="inputFieldLargeMultiline">
                      <TextField
                        id="img"
                        label="Img url"
                        fullWidth
                        multiline
                        rowsMax="4"
                        value={state.img}
                        margin="normal"
                        variant="outlined"
                      />
                    </div>
                    <div className="inputFieldLargeMultiline">
                      <TextField
                        id="link"
                        label="Link to project"
                        fullWidth
                        multiline
                        rowsMax="4"
                        value={state.link}
                        margin="normal"
                        variant="outlined"
                      />
                    </div>
                    <div className="inputFieldLargeMultiline">
                      <TextField
                        id="repo"
                        label="Link to repo"
                        fullWidth
                        multiline
                        rowsMax="4"
                        value={state.repo}
                        margin="normal"
                        variant="outlined"
                      />
                    </div>
                  </div>
                  <ArrayController
                    itemSchema="singleItem"
                    title="Tech stack"
                    field="tech"
                    setPFS={setArrayControllerState}
                    arr={state.tech}
                  >
                    {/* eslint-disable-next-line object-curly-newline, no-shadow */}
                    {({
                      handleChange,
                      updateFormState,
                      removeItem,
                      state,
                      arr,
                      title,
                    }) => (
                      <Fragment>
                        <div
                          className="inputFieldLargeMultiline"
                          onChange={handleChange}
                        >
                          <TextField
                            id="newItem"
                            label="Tech stack"
                            fullWidth
                            multiline
                            rowsMax="4"
                            value={state.newItem}
                            margin="normal"
                            variant="outlined"
                          />
                        </div>
                        {/* <MapUnorderedList array={arr} /> */}
                        <MapChips array={arr} removeItem={removeItem} />
                        <Button
                          variant="outlined"
                          color="primary"
                          align="center"
                          onClick={updateFormState}
                        >
                          {`Add new ${title}`}
                        </Button>
                      </Fragment>
                    )}
                  </ArrayController>

                  <Button
                    variant="outlined"
                    color="primary"
                    align="center"
                    onClick={updateFormState}
                  >
                    {`Add new ${title}`}
                  </Button>
                </DropDown>
                {/* MapDropdown */}
                <MapDropDown
                  array={arr}
                  removeItem={removeItem}
                  classes={null}
                />
              </div>
            </Fragment>
          )}
        </ArrayController>
      </DropDown>
    </Fragment>
  );
};

export default Projects;
