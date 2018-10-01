import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

/**
 * Render a list of @material-ui's Chip components.
 *
 * @class
 * @prop {String[]} array - Array of Strings.
 * @return {object} A React component
 */
class MapChips extends Component {
  handleDelete = (index, data) => () => {
    // console.log('Chip handle Delete', index, data);
    const toUpdate = [...this.props.array];

    toUpdate.splice(index, 1);

    this.props.setGS({ [`userInfo.${this.props.field}`]: 1 });
  };

  render() {
    return (
      <Grid container spacing={16} className={''} alignItems={'center'} direction={'row'} justify={'center'}>
        {this.props.array.map((value, index) => (
          <Grid key={`${index}${value}`} item>
            <Chip key={value} icon={null} label={value} onDelete={this.handleDelete(index, value)} className={''} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default MapChips;
