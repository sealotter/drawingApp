import React from 'react';
import CanvasBoard from '../canvas/Canvas';
import './style.css'



class Container extends React.Component {
  

  render(){

    return(
      <div className = 'container'>
        <div className='color-picker-container'>
          <input type='color' ></input>
        </div>

        <div className='canvas-container'>
          <CanvasBoard />
        </div>


      
      </div>
    )
  }
}


export default Container