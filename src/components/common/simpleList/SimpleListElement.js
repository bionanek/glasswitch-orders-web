import React from "react";
import "./SimpleListElement.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const SimpleListElement = props => {
  const onDeleteButtonClick = (e) => {
    e.stopPropagation();
    if (props.element.deleteHandler) {
      props.element.deleteHandler(props.element, props.index);
    } else {
      props.defaultOnDeleteClick(props.element, props.index);
    }
  };

  return (
    <li
      className={
        "list-element " +
        (props.isClickable && props.element.clickHandler ? "clickable" : "")
      }
      onClick={props.element.clickHandler}
    >
      <span className="title">{props.element.title.toString()}</span>
      <span className="sub-title">{props.element.subTitle.toString()}</span>
      <span className="buttons-wrapper">
        {props.isEditable && (
          <span className="edit-icon" onClick={props.element.editHandler}>
            <FontAwesomeIcon icon={faEdit} />
          </span>
        )}
        {props.isDeletable && props.element.deletable && (
          <span className="delete-icon" onClick={onDeleteButtonClick}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
        )}
      </span>
    </li>
  );
};

export default SimpleListElement;
