import React from "react";
import "./SimpleList.scss";

function getListElementsHTML(elements) {
  return elements.map((el, index) => {
    return (
      <li key={index} className="list-element" onClick={el.onClickEvent}>
        <span className="title">{el.title.toString()}</span>
        <span className="sub-title">{el.subTitle.toString()}</span>
      </li>
    );
  });
}

function SimpleList(props) {
  const elements = getListElementsHTML(props.elements);
  return (
    <div className="list-wrapper">
      <ul className="list">{elements}</ul>
    </div>
  );
}

export default SimpleList;
