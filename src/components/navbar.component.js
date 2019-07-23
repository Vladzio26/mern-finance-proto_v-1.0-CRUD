import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Фінанс трекер</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Транзакції</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Створити транзакцію</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Створити категорію</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}