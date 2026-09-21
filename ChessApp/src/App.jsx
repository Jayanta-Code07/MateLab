

import './App.css'
import HomePage from './Home/HomePage'
import { Routes,Route } from "react-router-dom"
import BoardPage from './ChessBoard/BoardPage'
import { connectws } from './Hooks/ws'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "animate.css"

function App() {

  const socket=useRef(null);
  let [ attackDetails, setAttackDetails ]=useState(null);
  let [mate, setMate]=useState([]);
  let [moveValidate, setMoveValidate]=useState([]);

  const AppInfo={
    socket,
    attackDetails,
    setAttackDetails,
    mate,
    moveValidate,
  }


  useEffect(()=>{
    socket.current=connectws();

    socket.current.on("connect",()=>{
      socket.current.on("attacks",(attack_map)=>{
          setAttackDetails(attack_map);
      })
    })

    socket.current.on("checkMate",({ msg })=>{
      setMate(msg);
    })

    socket.current.on("validation",(isValid)=>{
      setMoveValidate(isValid);
    })

  },[])

  return (
    <>
    <Routes>
      <Route path='/' element={ <HomePage /> } />
      <Route path='/:id/play' element={ <BoardPage AppInfo={AppInfo} /> } />
    </Routes>
    </>
  )
}

export default App;
