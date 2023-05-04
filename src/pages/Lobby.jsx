import {useState, useEffect} from 'react'
import NewPlayerPopUp from '../components/newPlayerPopUp/NewPlayerPopUp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Lobby = ({socket, theUser}) => {
  const [match, setMatch] = useState(false);
  const [matchAccepted, setMatchAccepted] = useState(false)
  const [gameId, setGameId] = useState(null);
  const [allLeadingUsers, setAllLeadingUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/all-users`)
      .then(response => setAllLeadingUsers(response.data))
      .catch(err => console.log(err))
  }, [])
  const navigate = useNavigate('/game-room');

  useEffect(() => {
    socket.emit('join-lobby', theUser);

    socket.on('game-found', gameId => {
      setMatch(true)
      if (matchAccepted) {
        socket.emit('accept-game', gameId);
        setGameId(gameId);
        navigate('/game-room')
      } else {
        socket.emit('decline-game', gameId);
      }
    });

  }, [theUser, socket, matchAccepted])

  const matchResponse = (response) => {
    setMatchAccepted(response)
  }

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tic tac toe MVP players:</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Matches will be created automatically. Please wait until you receive a request to join a game.
                    </p>
                </div>
                <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {allLeadingUsers.length ? 
                    allLeadingUsers.map((person) => (
                        <li key={person.username}>
                            <div className="flex items-center gap-x-6">
                                <img className="h-16 w-16 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.username}</h3>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">Leading with {person.winsCounter} wins</p>
                                </div>
                            </div>
                        </li>
                    )) :
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl w-full">There are no MVP players yet!</h2>
                    }
                </ul>
            </div>
            {match && <NewPlayerPopUp matchAccepted={matchResponse} />}
        </div>
    )
}

export default Lobby