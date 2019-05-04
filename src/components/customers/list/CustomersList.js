import React, { Component } from "react";
import SimpleList from "../../common/simpleList/SimpleList";
import { withRouter } from "react-router-dom";
import { getAllCustomers } from "../../../utils/api/customersApiService";

class CustomersList extends Component {
  constructor(props) {
    super(props);
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
    const response = await getAllCustomers();
    const customersList = this.getCustomersReactiveObjectsList(response.data);

    this.setState({ customers: customersList });
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

      customerRO.deleteHandler = null;

      return customerRO;
    }, this);
  }
}

export default withRouter(CustomersList);
