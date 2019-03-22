import React from "react";
import Item from "./Item";
import {connect} from "react-redux";
const CList = () => <Item/>;

const mapStateToProps = state => {
  console.log(state.SearchReducer.list);
  return {list: state.SearchReducer.list};
};
const List = connect(mapStateToProps)(CList);

export default List;
