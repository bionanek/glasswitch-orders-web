import React, {Component} from 'react'
import CustomersApiService from '../../../utils/api/customersApiService'
import CustomerForm from './CustomerForm'

class CustomerEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      customer: null,
    }
  }

  async componentDidMount() {
    const customerId = parseInt(this.props.match.params.id)

    this.setState({ customer: await CustomersApiService.getCustomer(customerId) })
  }

  async handleSubmit(event, customer) {
    event.preventDefault()
    event.stopPropagation()

    const customerId = parseInt(this.props.match.params.id)
    await CustomersApiService.updateCustomer(customerId, customer)

    this.props.history.push(`/customers/${customerId}`)
  }

  render() {
    const { customer } = this.state
    return (
      <CustomerForm customer={customer} onSubmit={(e, cust) => this.handleSubmit(e, cust)} />
    )
  }
}

export default CustomerEdit