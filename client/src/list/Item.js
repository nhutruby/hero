import React, {lazy} from "react";
import moment from "moment";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";

const Grid = lazy(() => import ("@material-ui/core/Grid"));
const styles = theme => ({
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  paper: {
    maxWidth: 600,
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2
  }
});

const Item = props => {
  const {classes, victor} = props;
  return (<Paper className={classes.paper}>
    <Grid container={true} wrap="nowrap" spacing={16}>
      <Grid item={true}>
        <Avatar src={victor.image_portrait}/>
      </Grid>
      <Grid item={true} xs={false} zeroMinWidth={true}>
        <Typography noWrap={false}>{victor.name}</Typography>
        <Typography color="textSecondary">
          {moment(victor.updated_at).format("MMM D, YYYY")}
        </Typography>
      </Grid>
    </Grid>

    <Card className={classes.card}>
      {victor.image_splash && (<CardMedia className={classes.media} image={victor.image_splash} title="Paella dish"/>)}
    </Card>
  </Paper>);
};

Item.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Item);
