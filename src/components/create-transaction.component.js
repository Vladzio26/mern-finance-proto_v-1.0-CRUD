import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateTransaction extends Component {
  constructor(props) {
    super(props);

    this.onChangeNamecategory = this.onChangeNamecategory.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        namecategory: '',
        type: '',
        amount: 0,
        description: '',
        date: new Date(),
      category: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/category/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            category: response.data.map(category => category.namecategory),
            namecategory: response.data[0].namecategory
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeNamecategory(e) {
    this.setState({
        namecategory: e.target.value
    })
  }

  onChangeType(e) {
    this.setState({
        type: e.target.value
    })
  }

  onChangeAmount(e) {
    this.setState({
        amount: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
        description: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const transaction = {
        namecategory: this.state.namecategory,
        type: this.state.type,
        amount: this.state.amount,
        description: this.state.description,
        date: this.state.date
    }

    console.log(transaction);

    axios.post('http://localhost:5000/transaction/add', transaction)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Створити нову транзакцію</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Назва категорії: </label>
          <select ref="categoryInput"
              required
              className="form-control"
              value={this.state.namecategory}
              onChange={this.onChangeNamecategory}>
              {
                this.state.category.map(function(category) {
                  return <option 
                    key={category}
                    value={category}>{category}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Type: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}
              />
        </div>
        <div className="form-group">
          <label>Amount (in UAH): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.amount}
              onChange={this.onChangeAmount}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Створити запис транзакції" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}