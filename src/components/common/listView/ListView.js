import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Col, Row, Button, ButtonGroup, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTh } from '@fortawesome/free-solid-svg-icons'
import SimpleList from '../simpleList/SimpleList'
import LoadingView from '../LoadingView'
import CreateRecordModal from '../modals/createRecord/CreateRecordModal'
import ProductGrid from '../../products/components/grid/ProductGrid'
import './ListView.scss'

const ListView = props => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [isRecordCreateModalOpen, setIsRecordCreateModalOpen] = useState(false)
	const [listView, setListView] = useState(true)

	const [records, setRecords] = useState([])

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
					setRecords(recordsReactiveObjects(fetchedData.data))
				}
			}
			return recordRO
		})
	}

	const handleSearch = async event => {
		const search = event.target.value

		if (search === '') {
			const fetchedData = await props.getAllRecords()
			setRecords(recordsReactiveObjects(fetchedData.data))
			return
		}

		const fetchedData = await props.searchRecords(search)
		setRecords(recordsReactiveObjects(fetchedData.data))
	}

	const fetchData = async () => {
		const fetchedData = await props.getAllRecords()
		setRecords(recordsReactiveObjects(fetchedData.data))
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
							block
						>
							{`New ${props.createNewRecordLabel}`}
						</Button>
					</Col>

					<Col sm>
						<Form.Control
							onChange={handleSearch}
							type="text"
							name="searchBar"
							placeholder={`Search ${props.page}`}
							required
						/>
					</Col>

					{props.page === 'products' ? (
						<Col sm>
							<ButtonGroup className="layout-change-buttons d-flex">
								<Button
									onClick={() => setListView(true)}
									variant={listView ? 'success' : 'secondary'}
								>
									<FontAwesomeIcon icon={faList} size="1x" />
								</Button>

								<Button
									onClick={() => setListView(false)}
									variant={listView ? 'secondary' : 'success'}
								>
									<FontAwesomeIcon icon={faTh} size="1x" />
								</Button>
							</ButtonGroup>
						</Col>
					) : null}
				</Row>

				{listView ? (
					<SimpleList
						elementsList={records}
						titleFieldName={props.titleFieldName}
						subtitleFieldName={props.subtitleFieldName}
						clickable
						editable
						deletable
					/>
				) : (
					<ProductGrid
						productsList={records}
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
