import React from "react";
import Col from 'react-bootstrap/Col'

const DetailElement = props => {
  return (
    <Col sm>
      <strong>{props.header}</strong>
      <br/>
      <span>{props.value}</span>
    </Col>
  )
}

export default DetailElement;