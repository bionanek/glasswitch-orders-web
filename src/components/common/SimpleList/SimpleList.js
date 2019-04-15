import React from "react";
import "./SimpleList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

class SimpleList extends React.Component {
  constructor(props) {
    super(props);
    this.elements = this.getListElementsHTML(
      this.props.elements,
      this.props.deletable,
      this.props.editable,
      this.props.clickable
    );

    this.state = {};
  }

  componentDidMount() {
    this.setState({ elements: this.elements });
  }

  onDeleteClick = (el, index) => {
    console.log(this.elements);
    console.log(index);
    this.elements = this.elements.filter(element => +element.key !== index);
    this.setState({ elements: this.elements });
  };

  getListElementsHTML(
    elements,
    isListDeletable,
    isListEditable,
    isListClickable
  ) {
    return elements.map((el, index) => {
      return (
        <li
          key={index}
          className={
            "list-element " +
            (isListClickable && el.clickHandler ? "clickable" : "")
          }
          onClick={el.clickHandler}
        >
          <span className="title">{el.title.toString()}</span>
          <span className="sub-title">{el.subTitle.toString()}</span>
          <span className="buttons-wrapper">
            {isListEditable && (
              <span className="edit-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
            )}
            {isListDeletable && el.deletable && (
              <span
                className="delete-icon"
                onClick={() => {
                  if (el.deleteHandler) {
                    el.deleteHandler(el, index);
                  } else {
                    this.onDeleteClick(el, index);
                  }
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </span>
            )}
          </span>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="list-wrapper">
        <ul className="list">{this.state.elements}</ul>
      </div>
    );
  }
}

export default SimpleList;
