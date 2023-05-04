import React from 'react'
import GameBoard from '../components/gameBoard/GameBoard'
import Chat from '../components/chatRoom/Chat'

const GameRoom = ({theUser, socket, getTheUser}) => {
  const updateUser = user => {
    getTheUser(user)
  }
  return (
    <div className='flex w-full h-screen flex-col md:flex-row'>
        <GameBoard theUser={theUser} socket={socket} updateUser={updateUser}/> 
        <Chat socket={socket} />
    </div>
  )
}

export default GameRoom