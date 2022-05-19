
import React, { useRef} from 'react';

import { useEffect } from 'react';
import './style.css'
import io from 'socket.io-client'
//*issues to fix: figure out how to move drawing activity and mouse into a useffect

// import './style.css'
//challenges: 1)one big componentdidupdate cycle  that also needs to capture the memoized data of the functions from the mouse movements?(usecallback) need the exact data of your mouse(drawing) and the other users mouse(sockets)
//2) knowing taht as a single user drawing its essentially one big componentupdate for the drawing itself but then how that extends to sockets and weird to wrap my head around eg. state vs. add event listeners for mousemovements === like lisa said sockets being 1 big event listener
//interesting to think of how to place state on the mouse. whether to use the state or directly assign boolean value each time & transitioning that from single user to multiple (q: would that be affected)
//similar to lisa had with the api for grace shopper, there was a rate limit, so had to consider a throttle so wont overload the connect, creating a time delay to space it out 


const CanvasBoard = () => {
  

  const { current: canvasDetail } = useRef({color: 'red', socketUrl: '/'})
  //const socket = io(window.location.origin)

  // socket.on('connect',() => {
  //   console.log('i am connected' )
  // })

  // const changeColor = newColor => {
  //   canvasDetail.color = newColor

  // }
 

  //for socket
  useEffect(() => {
    console.log('client', process.env.NODE_ENV)
    if(process.env.NODE_ENV === 'developement') {
      canvasDetail.socketUrl = 'http://localhost:3000'
    }
    console.log('socketurl is' , canvasDetail.socketUrl)
    canvasDetail.socket = io.connect(canvasDetail.socketUrl, () => {
      console.log('connect to server......')

      //listengin for disconnect from a client
      
      
    })
    canvasDetail.socket.on('image-data', (data) =>{
      const image = new Image()
      const canvas = document.querySelector('#canvas-board')
      const ctx = canvas.getContext('2d')
      image.src = data
      //constructor  
      image.addEventListener('load', () => {
        ctx.drawImage(image, 0, 0)
      })
    })
  })
  

  //for pointer
  useEffect(() =>  {
    // const canvasRef = useRef(null)
    // const ctx = useRef(null)
    const canvas = document.querySelector('#canvas-board')
    const ctx = canvas.getContext('2d')
    
    canvas.height = window.innerHeight - 30
    canvas.width = window.innerWidth

    var set_position ={x:0, y: 0}
    var last_position= {x: 0, y: 0}
   


    const drawOnCanvas = () => {
    //   if(mouseDown) {
      //drawing 
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.moveTo(last_position.x, last_position.y)
        ctx.lineTo(set_position.x, set_position.y)
        ctx.stroke()
        ctx.strokeStyle = canvasDetail.color
        ctx.closePath()

          //throttle
        if(!canvasDetail.waiting) {
          const base64EncodedUrl = canvas.toDataURL('image/png')
          canvasDetail.socket.emit('image-data', base64EncodedUrl)
          canvasDetail.waiting = true
          setTimeout(() => {
            canvasDetail.waiting = false
          },100)
        }
        
 
    }

    canvas.addEventListener('mousemove', function(evt) {
      last_position.x = set_position.x
      last_position.y = set_position.y
      set_position.x = evt.pageX - canvas.offsetLeft
      set_position.y = evt.pageY - canvas.offsetTop
    }, false)

   

    canvas.addEventListener('mousedown', function(evt) {
      canvas.addEventListener('mousemove', drawOnCanvas, false )
    }, false)
    canvas.addEventListener('mouseup', function(evt) {
      canvas.removeEventListener('mousemove', drawOnCanvas, false)
     
    }, false)

    return () => {
      canvas.removeEventListener('mousemove', drawOnCanvas)
    }
       

    
   
 

  })

  



  
    return (
      <div>
        <canvas className='canvas-board' id='canvas-board'>
          {/* ref = {canvasRef} onMouseDown = {onMouseDown} onMouseUp = {onMouseUp} onMouseMove = {onMouseMove} */}

        </canvas>
        <br/>
        {/* <select value={color} onChange={(evt) => setColor(evt.target.value)}> {colors.map(color => <option key = {color} value = {color}>{color}</option>)}</select> */}

     </div>
    )

}





export default CanvasBoard