import React from "react";
import "./SimpleList.scss";
import SimpleListElement from "./SimpleListElement";

class SimpleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { elements: [] };
  }

  componentWillReceiveProps(nextProps) {
    const elements = this.getListElementsHTML(
      nextProps.elements,
      nextProps.deletable,
      nextProps.editable,
      nextProps.clickable
    );
    this.setState({ elements: elements });
  }

  defaultOnDeleteClick = (el, index) => {
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
        <SimpleListElement
          key={index}
          index={index}
          isClickable={isListClickable}
          isEditable={isListEditable}
          isDeletable={isListDeletable}
          element={el}
          defaultOnDeleteClick={(element, id) =>
            this.defaultOnDeleteClick(element, id)
          }
        />
      );
    });
  }

  render() {
    const elements = this.state.elements;
    return (
      <div className="list-wrapper">
        <ul className="list">{elements}</ul>
      </div>
    );
  }
}

export default SimpleList;
