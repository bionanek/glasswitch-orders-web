import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'

export default function IdNotFound() {
	return (
		<Container fluid>
			<Row>
				<Col />
				<Col sm>
					<Form.Label style={{ fontSize: '72px', color: 'white' }}>ID NOT FOUND</Form.Label>
				</Col>
				<Col />
			</Row>
		</Container>
	)
}
