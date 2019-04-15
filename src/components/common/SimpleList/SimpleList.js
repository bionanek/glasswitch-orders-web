import React from "react";
import "./SimpleList.scss";
import SimpleListElement from "./SimpleListElement";

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
    return (
      <div className="list-wrapper">
        <ul className="list">{this.state.elements}</ul>
      </div>
    );
  }
}

export default SimpleList;
