const config = require('../config.json');
const blizzard = require('blizzard.js').initialize(
    {
      apikey: config.apiKey
    }
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleQuery = this.handleQuery.bind(this);
    
    this.state = {
      data: null,
    };
  }
  
  handleQuery(data) {
    this.setState(
        {
          data: data,
        }
    );
  }
  
  render() {
    return (
        <div>
          <Form onQuery={this.handleQuery}/>
          <Data data={this.state.data}/>
        </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const form = ReactDOM.findDOMNode(this);
    const data = new FormData(form);
    const baseURL = config.characterAPI;
    
    console.log(data.get('name'));
    console.log(data.get('realm'));
    
    blizzard.wow.character(
        ['profile'],
        {
          origin: 'us',
          realm: data.get('realm'),
          name: data.get('name'),
        }
    ).then(response => {
      this.props.onQuery(response.data);
    });
  }
  
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="Character Name"/>
          <input type="text" name="realm" placeholder="Realm"/>
          <button type="submit">Submit</button>
        </form>
    );
  }
}

class Data extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    if (this.props.data === null) {
      return <div>Enter a name, and a realm to get started.</div>;
    }
    return <div>{this.props.data.lastModified}</div>;
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);