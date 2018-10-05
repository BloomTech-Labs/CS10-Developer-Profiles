import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DropDown from '../DropDown/DropDown';
import StateCapsule from '../StateCapsule/StateCapsule';

const MapDropDownDisplay = (props) => {
  const { isProfile, array, field, itemType, schema, propsAndLabels } = props;

  return array.map((item, index) => (
    <DropDown
      header={item.title || item.degree}
      key={`${item.title || item.degree}${Math.random()}`}
    >
      <div className="dropdown-item-list blur-handler">
        <Fragment>
          {propsAndLabels.map((propLabel, propIndex) => (
            <div
              className="inputFieldLargeMultiline"
              key={`${Math.random()}-${propIndex}`}
            >
              <div>
                <Typography variant="caption">{propLabel[1]}</Typography>
                <Typography variant="subheading">
                  {item[propLabel[0]]}
                </Typography>
              </div>
            </div>
          ))}
        </Fragment>
      </div>
    </DropDown>
  ));
};

export default MapDropDownDisplay;
