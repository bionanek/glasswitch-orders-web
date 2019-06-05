import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

export default function LoadingView() {
	return (
		<Container>
			<Row>
				<Col />
				<Col sm>
					<FontAwesomeIcon
						style={{ margin: '5px', color: 'white' }}
						className="fa-spin"
						icon={faSync}
						size="3x"
					/>
					<Form.Label style={{ margin: '5px', color: 'white', fontSize: '45px' }}>
						Loading
					</Form.Label>
				</Col>
				<Col />
			</Row>
		</Container>
	)
}
