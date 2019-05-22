import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import SimpleList from '../../common/simpleList/SimpleList'
import CustomersApiService from '../../../utils/api/customersApiService'
import './CustomersList.scss'
import CustomerCreate from '../crud/CustomerCreate'

class CustomersList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      customers: [],
      isCustomerCreateModalOpen: false,
    }
  }

  async componentDidMount() {
    this.setState({ customers: await this.getAllCustomers() })
  }

  async getAllCustomers() {
    const response = await CustomersApiService.getAllCustomers()
    return this.getCustomersReactiveObjectsList(response.data)
  }

  getCustomersReactiveObjectsList(customersList) {
    return customersList.map(customer => {
      const customerRO = { ...customer }

      customerRO.editHandler = e => {
        e.stopPropagation()
        const editUrl = `customers/${customer.id}/edit`
        this.props.history.push(editUrl)
      }

      customerRO.clickHandler = () => {
        this.props.history.push(`customers/${customer.id}`)
      }

      customerRO.deleteHandler = async customerId => {
        const deleteResult = await CustomersApiService.deleteCustomer(customerId)

        if (deleteResult !== undefined && deleteResult.status === 200) {
          this.refreshList()
        }
      }

      return customerRO
    }, this)
  }

  openCloseCreateModal() {
    const isOpen = this.state.isCustomerCreateModalOpen
    this.setState({ isCustomerCreateModalOpen: !isOpen })
  }

  async refreshList() {
    const customers = await this.getAllCustomers()

    this.setState({ customers })
  }

  render() {
    return (
      <div className="customers-list-wrapper">
        <Button variant="primary" className="new-customer-button" onClick={() => this.openCloseCreateModal()}>New Customer</Button>
        <SimpleList
          elementsList={this.state.customers}
          titleFieldName="name"
          subtitleFieldName="delivery_country"
          deletable
          editable
          clickable
        />
        <CustomerCreate
          isOpen={this.state.isCustomerCreateModalOpen}
          onModalClose={() => this.openCloseCreateModal()}
        />
      </div>
    )
  }
}

export default withRouter(CustomersList)