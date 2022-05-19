import React from 'react';
// import io from 'socket.io-client';


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
      <Container/>
    )
  
  }
}


export default App