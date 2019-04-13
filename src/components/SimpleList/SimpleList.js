import React from "react";
import "./SimpleList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

function getListElementsHTML(elements) {
  return elements.map((el, index) => {
    return (
      <li key={index} className="list-element" onClick={el.onClickEvent}>
        <span className="title">{el.title.toString()}</span>
        <span className="sub-title">{el.subTitle.toString()}</span>
        <span className="buttons-wrapper">
          <span className="edit-icon">
            <FontAwesomeIcon icon={faEdit} />
          </span>
          <span className="delete-icon">
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
        </span>
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
