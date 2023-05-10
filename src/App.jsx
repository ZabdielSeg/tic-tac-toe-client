import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react'
import Login from './pages/Login';
import Lobby from './pages/Lobby';
import NavBar from './components/NavBar/NavBar';
import GameRoom from './pages/GameRoom';
import { Route, Routes } from 'react-router-dom';
const socket = io('192.168.100.88:4000')

function App() {
  const [user, setUser] = useState({});
  const [allConnectedUsers, setAllConnectedUsers] = useState([]);

  const getTheUser = (user) => {
    setUser(user);
  }

  const addUser = (newUser) => {
    setAllConnectedUsers([...allConnectedUsers, newUser])
  }

  useEffect(() => {
    socket.on('userInfo', data => {
      setAllConnectedUsers([...allConnectedUsers, data.userData])
    });
  }, [user, socket])

  return (
    <>
      <NavBar theUser={user} />
      <div className="App">
        <Routes>
          <Route path='/' element={<Login getTheUser={getTheUser} addUser={addUser} socket={socket} />} />
          <Route path='/lobby' element={<Lobby socket={socket} theUser={user} />} />
          <Route path='/game-room/:gameID' element={<GameRoom theUser={user} socket={socket} getTheUser={getTheUser} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
