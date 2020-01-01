import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

const styles = {
  top: {
    position: 'absolute',
    textAlign: 'center',
    top: '20%',
    left:'50%',
    transform: 'translate(-50%, -50%)',
  },
  feed: {
    position: 'absolute',
    left: '33%',
    top: '30%',
  }
};

class EmptyState extends Component {
  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { icon, title, description, button, timeline} = this.props;

    return (
        <>
          <Grid container>
            <Grid item className={classes.top}>
              {icon}
              {title && <Typography color="textSecondary" variant="h4">{title}</Typography>}
              {description && <Typography color="textSecondary" variant="subtitle1">{description}</Typography>}
              {button}
            </Grid>
            <Grid item className={classes.feed}>
              {timeline}
            </Grid>
          </Grid>
        </>
    );
  }
}

EmptyState.propTypes = {
  // Styling
  classes: PropTypes.object.isRequired,

  // Properties
  icon: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.element,

};

export default withStyles(styles)(EmptyState);