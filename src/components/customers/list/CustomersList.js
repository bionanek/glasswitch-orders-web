import React, { Component } from "react";
import SimpleList from "../../common/simpleList/SimpleList";
import { withRouter } from "react-router-dom";
import CustomersApiService from "../../../utils/api/customersApiService";

class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.apiService = new CustomersApiService();

    this.state = {
      customers: []
    };
  }

  render() {
    return (
      <div className="customers-list-wrapper">
        <SimpleList
          elements={this.state.customers}
          deletable={true}
          editable={true}
          clickable={true}
        />
      </div>
    );
  }

  async componentDidMount() {
    this.setState({ customers: await this.getAllCustomers() });
  }

  async getAllCustomers() {
    const response = await this.apiService.getAllCustomers();
    return this.getCustomersReactiveObjectsList(response.data);
  }

  getCustomersReactiveObjectsList(customersList) {
    return customersList.map(customer => {
      let customerRO = { ...customer };

      customerRO.editHandler = e => {
        e.stopPropagation();
        const editUrl = `customers/${customer.id}/edit`;
        this.props.history.push(editUrl);
      };

      customerRO.clickHandler = () => {
        this.props.history.push(`customers/${customer.id}`);
      };

      customerRO.deleteHandler = async customerId => {
        const deleteResult = await this.apiService.deleteCustomer(customerId);

        if (deleteResult !== undefined && deleteResult.status === 200) {
          this.refreshList();
        }
      };

      return customerRO;
    }, this);
  }

  async refreshList() {
    const customers = await this.getAllCustomers();

    this.setState({ customers: customers });
  }
}

export default withRouter(CustomersList);
