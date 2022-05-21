import React from 'react';
// import io from 'socket.io-client';
import './App.css'

import Container from './components/container/Container.js';

class App extends React.Component {
  componentDidMount() {
    //windowlocation = object with origin = domain without path. estabilishes socket 
   
    // const connection = io(window.location.origin)
    // connection.on('connect',() =>{
    //   console.log('connected to server')
    // })
  }
  render() {
    return (
      <div>
      <Container/>
      </div>
    )
  
  }
}


export default App