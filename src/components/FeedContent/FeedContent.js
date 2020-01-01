import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import EmptyState from '../EmptyState';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Card, CardHeader, CardContent, CardMedia, CardActions, Avatar, Typography, Divider} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import postManager from "../../services/postManager";
import ThreejsContainer from "../ThreejsContainer";

const styles = (theme) => ({
  emptyStateIcon: {
    fontSize: theme.spacing(12)
  },

  button: {
    marginTop: theme.spacing(1)
  },

  buttonIcon: {
    marginRight: theme.spacing(1)
  },

  EmptyState: {
    flexGrow: 1,
  },
  card: {
    width: "500px",
    textAlign: 'center',
    height: "300px",
    marginTop: theme.spacing(4),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});


const initialState = {
  performingAction: false,
  showTimeline: true,
  signedIn: false,
  errors: null,
  items: Array.from({ length: 20 })
};

class FeedContent extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    };
  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 1500);
  };
  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { performingAction, signedIn, user, userData } = this.props;

    // Events
    const { onSignUpClick, onSignInClick } = this.props;


    if (signedIn && this.state.showTimeline) {
      return (
        <EmptyState
          icon={<HomeIcon className={classes.emptyStateIcon} color="action" />}
          title= {userData.username + " Timeline"}
          timeline ={
            <>
              <InfiniteScroll next={this.fetchMoreData} hasMore={true} loader={<h4>Loading More...</h4>} dataLength={this.state.items.length}>
                {this.state.items.map((i, index) => (
                    <Grid container>
                      <Grid item>
                        <Card className={classes.card}>
                        <CardContent>
                          <Typography  color="textSecondary" component="h3">
                            Item #{index}
                          </Typography>
                          <Divider/>
                          <ThreejsContainer/>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                ))}
              </InfiniteScroll>
            </>
          }
        />
      );
    }

    return (
      <EmptyState
        title={process.env.REACT_APP_NAME}
        description="We bring bits to life"
        button={
          <>
            <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={1}>
              <Grid item xs>
                <Button color="secondary" disabled={performingAction} variant="contained" onClick={onSignInClick}>Sign In</Button>
              </Grid>
              <Grid item xs>
                <Button color="secondary" disabled={performingAction} variant="contained" onClick={onSignUpClick}>Sign Up</Button>
              </Grid>
            </Grid>
          </>
        }
      />
    );
  }
}

FeedContent.defaultProps = {
  signedIn: false,
  performingAction: false,
};

FeedContent.propTypes = {
  // Styling
  classes: PropTypes.object.isRequired,


  // Properties
  performingAction: PropTypes.bool.isRequired,
  signedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  userData: PropTypes.object,

  // Events
  onSignUpClick: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired
};

export default withStyles(styles)(FeedContent);
