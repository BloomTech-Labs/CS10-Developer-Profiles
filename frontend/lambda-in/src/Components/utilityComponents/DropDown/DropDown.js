import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Icon from '@material-ui/core/Icon';

/**
 * A wrapper component for @matrial-ui <ExpansionPanel />
 *
 * @description A wrapper for a Dropdown, which accepts any children.
 * @class A class component constructor.
 * @prop {string} header - Text ot be displayed when the Dropdown is collapsed.
 *
 * @example How to use it
 * <DropDown header="Heder text to display here">
 */
class DropDown extends Component {
  render() {
    const { header } = this.props;
    return (
      <Fragment>
        <div className="panelMargin">
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<Icon>add_circle</Icon>}>
              <Typography>{header}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className="expansionPanel">{this.props.children}</div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Fragment>
    );
  }
}

export default DropDown;
