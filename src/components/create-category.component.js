import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCategory extends Component {
  constructor(props) {
    super(props);

    this.onChangeNamecategory = this.onChangeNamecategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        namecategory: ''
    }
  }

  onChangeNamecategory(e) {
    this.setState({
        namecategory: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const category = {
        namecategory: this.state.namecategory
    }

    console.log(category);

    axios.post('http://localhost:5000/category/add', category)
      .then(res => console.log(res.data));

    this.setState({
        namecategory: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Стврити нову категорію</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Назва категорії: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.namecategory}
                onChange={this.onChangeNamecategory}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Створити категорію" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}