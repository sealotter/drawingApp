import React from 'react';
import CanvasBoard from '../canvas/Canvas';
import './style.css'




class Container extends React.Component {
  

  render(){

    return(
      <div className = 'container'>


        <div className='canvas-container'>
          <CanvasBoard />
        </div>


      
      </div>
    )
  }
}


export default Container