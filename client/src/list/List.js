import React from "react";
import Item from "./Item";
import {connect} from "react-redux";
const CList = props => {
  return (<div>
    {props.list && props.list.list && props.list.list.map(i => <Item key={i.slug} victor={i}/>)}
  </div>);
};

const mapStateToProps = state => {
  let list = state.SearchReducer.data.find(v => v.name === state.SearchReducer.current_name) || [];
  console.log("a");
  return {list: list};
};
const List = connect(mapStateToProps)(CList);

export default List;
