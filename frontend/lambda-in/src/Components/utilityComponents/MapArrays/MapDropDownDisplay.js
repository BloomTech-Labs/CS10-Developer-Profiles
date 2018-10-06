import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import DropDown from '../DropDown/DropDown';

const MapDropDownDisplay = (props) => {
  const { array, propsAndLabels } = props;

  // prettier-ignore
  return array.map(item => (
    <DropDown
      header={item.title || item.degree}
      key={`${item.title || item.degree}${Math.random()}`}
    >
      <div className="dropdown-item-list blur-handler">
        <Fragment>
          {// prettier-ignore
          propsAndLabels.map(propLabel => (
            <div
              className="inputFieldLargeMultiline"
              key={`${Math.random()}-${propLabel[1]}`}
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
