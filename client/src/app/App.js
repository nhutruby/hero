import React, {Suspense, lazy} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import SearchReducer from "../search/SearchReducer";
import {StoreContext} from "../common/context/Store";
import SearchSaga from "../search/SearchSaga";
import sagaMiddleware from "../common/saga";
const Grid = lazy(() => import ("@material-ui/core/Grid"));
const List = lazy(() => import ("../list/List"));
const Search = lazy(() => import ("../search/Search"));
const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: 400,
    overflow: "hidden",
    padding: `0 ${theme.spacing.unit * 3}px`
  },
  paper: {
    maxWidth: 600,
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2
  }
});
class App extends React.Component {
  componentWillMount() {
    this.context.injectReducer("SearchReducer", SearchReducer);
    sagaMiddleware.run(SearchSaga, this.context);
  }

  render() {
    const {classes, store} = this.props;

    return (<div>
      <Suspense fallback={<div />}>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container={true} wrap="nowrap" spacing={16}>
              <Search store={store}/>
            </Grid>
          </Paper>
          <List/>
        </div>
      </Suspense>
    </div>);
  }
}
App.contextType = StoreContext;

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
