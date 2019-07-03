import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Col, Row, Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTh } from '@fortawesome/free-solid-svg-icons'
import SimpleList from '../simpleList/SimpleList'
import LoadingView from '../LoadingView'
import './ListView.scss'
import CreateRecordModal from '../modals/createRecord/CreateRecordModal'
import ProductGrid from '../../products/components/grid/ProductGrid'

const ListView = props => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [isRecordCreateModalOpen, setIsRecordCreateModalOpen] = useState(false)
	const [listView, setListView] = useState(true)

	const [fetchedRecords, setFetchedRecords] = useState([])

	const recordsReactiveObjects = recordsList => {
		return recordsList.map(record => {
			const recordRO = { ...record }

			recordRO.clickHandler = () => {
				props.history.push(`/${props.page}/${record.id}`)
			}

			recordRO.editHandler = event => {
				event.stopPropagation()
				props.history.push(`/${props.page}/${record.id}/edit`)
			}

			recordRO.deleteHandler = async recordId => {
				const deleteResult = await props.deleteRecord(recordId)

				if (deleteResult !== undefined && deleteResult.status === 200) {
					const fetchedData = await props.getAllRecords()
					setFetchedRecords(recordsReactiveObjects(fetchedData.data))
				}
			}
			return recordRO
		})
	}

	const fetchData = async () => {
		const fetchedData = await props.getAllRecords()
		setFetchedRecords(recordsReactiveObjects(fetchedData.data))
		setIsLoaded(true)
	}

	useEffect(() => {
		fetchData()
	}, [])

	const renderListView = () => {
		return (
			<Container className="list-view" fluid>
				<Row>
					<Col sm>
						<Button
							onClick={
								props.page === 'orders'
									? () => props.history.push(`/orders/create`)
									: () => setIsRecordCreateModalOpen(true)
							}
							className="create-record-button"
							variant="primary"
						>
							{`New ${props.createNewRecordLabel}`}
						</Button>
					</Col>

					<Col sm>{/* SEARCH BAR */}</Col>

					{props.page === 'products' ? (
						<Col sm>
							<ButtonGroup className="layout-change-buttons">
								<Button
									onClick={() => setListView(true)}
									variant={listView ? 'success' : 'secondary'}
								>
									<FontAwesomeIcon icon={faList} size="2x" />
								</Button>

								<Button
									onClick={() => setListView(false)}
									variant={listView ? 'secondary' : 'success'}
								>
									<FontAwesomeIcon icon={faTh} size="2x" />
								</Button>
							</ButtonGroup>
						</Col>
					) : null}
				</Row>

				{listView ? (
					<SimpleList
						elementsList={fetchedRecords}
						titleFieldName={props.titleFieldName}
						subtitleFieldName={props.subtitleFieldName}
						clickable
						editable
						deletable
					/>
				) : (
					<ProductGrid
						productsList={fetchedRecords}
						imageSource="imageUrl"
						name="name"
						code="code"
						pln="pln"
						eur="eur"
						usd="usd"
					/>
				)}

				<CreateRecordModal
					isOpen={isRecordCreateModalOpen}
					onModalClose={() => setIsRecordCreateModalOpen(false)}
					titleLabel={`Create ${props.createNewRecordLabel}`}
					onRefreshList={fetchData}
					modalMode={props.page}
				/>
			</Container>
		)
	}

	return <> {isLoaded ? renderListView() : LoadingView()} </>
}

export default withRouter(ListView)
