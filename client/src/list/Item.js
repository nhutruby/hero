import React, {lazy} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
const Grid = lazy (() => import ('@material-ui/core/Grid'));
const styles = theme => ({
  paper: {
    maxWidth: 600,
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
  },
});

const Item = props => {
  const {classes} = props;
  return (
    <Paper className={classes.paper}>
      <Grid container wrap="nowrap" spacing={16}>
        <Grid item>
          <Avatar>W</Avatar>
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography noWrap>{'a'}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

Item.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles (styles) (Item);
