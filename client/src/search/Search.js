/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from "react";
import PropTypes from "prop-types";
import {search} from "./SearchAction";
import classNames from "classnames";
import {connect} from "react-redux";
import CreatableSelect from "react-select/lib/Creatable";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import {emphasize} from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
      ? theme.palette.grey[300]
      : theme.palette.grey[700],
    0.08)
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

const NoOptionsMessage = props => {
  return (<Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
    {props.children}
  </Typography>);
};

const inputComponent = ({
  inputRef,
  ...props
}) => {
  return <div ref={inputRef} {...props}/>;
};

const Control = props => {
  return (<TextField fullWidth={true} InputProps={{
      inputComponent,
      inputProps: {
        className: props.selectProps.classes.input,
        inputRef: props.innerRef,
        children: props.children,
        ...props.innerProps
      }
    }} {...props.selectProps.textFieldProps}/>);
};

const Option = props => {
  return (<MenuItem buttonRef={props.innerRef} selected={props.isFocused} component="div" style={{
      fontWeight: props.isSelected
        ? 500
        : 400
    }} {...props.innerProps}>
    {props.children}
  </MenuItem>);
};

const Placeholder = props => {
  return (<Typography color="textSecondary" className={props.selectProps.classes.placeholder} {...props.innerProps}>
    {props.children}
  </Typography>);
};

const SingleValue = props => {
  return (<Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
    {props.children}
  </Typography>);
};

const ValueContainer = props => {
  return (<div className={props.selectProps.classes.valueContainer}>
    {props.children}
  </div>);
};

const MultiValue = props => {
  return (<Chip tabIndex={-1} label={props.children} className={classNames(props.selectProps.classes.chip, {
      [props.selectProps.classes.chipFocused]: props.isFocused
    })} onDelete={props.removeProps.onClick} deleteIcon={<CancelIcon {
      ...props.removeProps
    } />
}/>);
};

const Menu = props => {
  return (<Paper square={false} className={props.selectProps.classes.paper} {...props.innerProps}>
    {props.children}
  </Paper>);
};

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

class CSearch extends React.Component {
  constructor(props) {
    super(props);
    this.props.search({name: ""});
    this.state = {
      page: 1
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) 
      return;
    this.setState({
      page: this.state.page + 1
    });
    //console.log(this.props);
    setTimeout(() => {
      this.props.search({
        name: this.props.current_name
          ? this.props.current_name
          : "",
        page: this.state.page
      });
    }, 500);

    console.log("Fetch more list items!");
  }
  componentWillMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  state = {
    single: null,
    multi: null
  };

  handleChange = name => value => {
    this.setState({[name]: value});
    // console.log(value.value);
    this.setState({page: 1});
    if (value) {
      this.props.search({name: value.value});
    } else {
      this.props.search({name: ""});
    }
  };

  render() {
    const {classes, theme} = this.props;
    const {suggestions} = this.props;
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };

    return (<div className={classes.root}>
      <NoSsr>
        <CreatableSelect classes={classes} styles={selectStyles} options={suggestions} components={components} value={this.state.single} onChange={this.handleChange("single")} placeholder="Search heroes" isClearable="isClearable"/>
        <div className={classes.divider}/>
      </NoSsr>
    </div>);
  }
}

CSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
const mapDispatchToProps = dispatch => {
  return {
    search: name => dispatch(search(name))
  };
};
const mapStateToProps = state => {
  let suggestions = state.SearchReducer.data.filter(v => v.name !== "").map(v => ({label: v.name, value: v.name}));
  return {suggestions: suggestions, current_name: state.SearchReducer.current_name};
};
const Search = connect(mapStateToProps, mapDispatchToProps)(CSearch);

export default withStyles(styles, {withTheme: true})(Search);
