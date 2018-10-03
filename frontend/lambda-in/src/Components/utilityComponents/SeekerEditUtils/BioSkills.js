import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DropDown from '../DropDown/DropDown';
import MapChips from '../MapArrays/MapChips';
import ArrayController from '../MapArrays/ArrayController';
import StateCapsule from '../StateCapsule/StateCapsule';

/**
 * Render the Developer's 'summary' and 'topSkills' fields.Fragment
 *
 * @function
 * @return {object} A React component.
 */
// eslint-disable-next-line arrow-parens
const BioSkills = props => {
  // eslint-disable-next-line react/prop-types
  const { userInfo, setFS } = props;

  const field = 'topSkills';
  const schema = {
    summary: userInfo.summary,
    topSkills: userInfo.topSkills,
  };

  return (
    <StateCapsule schema={schema} object={schema}>
      {({ stateCapsule }) => (
        <DropDown header="Biio and Skills">
          <div className="inputFieldLargeMultiline">
            <TextField
              id="new-summary"
              index="an index"
              label="Your Bio"
              fullWidth
              multiline
              rowsMax="20"
              value={stateCapsule.summary}
              margin="normal"
              variant="outlined"
            />
          </div>
          {/* TODO */}
          <ArrayController
            itemSchema="singleItem"
            title="Top Skills"
            field={field}
            setPFS={setFS}
            arr={stateCapsule.topSkills}
          >
            {/* eslint-disable-next-line object-curly-newline */}
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
                    label="Add skills"
                    fullWidth
                    multiline
                    rowsMax="4"
                    value={state.newItem}
                    margin="normal"
                    variant="outlined"
                    inputProps={{
                      'data-value': state.newItem,
                      'data-field': field,
                    }}
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

          {/* TODO: Add summary - enable uploading a file */}
        </DropDown>
      )}
    </StateCapsule>
  );
};

export default BioSkills;
