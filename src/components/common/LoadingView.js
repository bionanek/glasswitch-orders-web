import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

export default function LoadingView() {
	return (
		<Container>
			<Row>
				<Col sm>
					<FontAwesomeIcon
						style={{ margin: '5px', color: 'white' }}
						className="fa-spin"
						icon={faSync}
						size="5x"
					/>
					<Form.Label style={{ margin: '5px', color: 'white', fontSize: '72px' }}>
						Loading
					</Form.Label>
				</Col>
			</Row>
		</Container>
	)
}
