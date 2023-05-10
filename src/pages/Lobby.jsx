import {useState, useEffect} from 'react'
import NewPlayerPopUp from '../components/newPlayerPopUp/NewPlayerPopUp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserCard from '../components/userCard/UserCard';

const Lobby = ({socket, theUser}) => {
  const [match, setMatch] = useState(false);
  const [matchAccepted, setMatchAccepted] = useState(null)
  const [gameId, setGameId] = useState(null);
  const [allLeadingUsers, setAllLeadingUsers] = useState([]);
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/all-users`)
      .then(response => setAllLeadingUsers(response.data))
      .catch(err => console.log(err))
  }, [])
  const navigate = useNavigate('/game-room');

  useEffect(() => {

    socket.on('game-found', gameId => {
      setMatch(true);
      setGameId(gameId);
    });

  }, [])

  useEffect(() => {
      socket.emit('accept-game', {gameId, theUser, matchAccepted});
      socket.on('decline-game', gameId => {
        console.log('declined');
        setMatch(false);
      });

      socket.on('move to board', () => navigate(`/game-room/${gameId}`));
  }, [matchAccepted])

  const matchResponse = (response) => {
    setMatchAccepted(response)
  }

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tic tac toe MVP players:</h2>
                    <p className="mt-6 text-xs leading-8 text-gray-600">
                        Matches will be created automatically. Please wait until you receive a request to join a game.
                    </p>
                </div>
                <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {allLeadingUsers.length ? 
                    allLeadingUsers.map((person) => (
                        <li key={person.username}>
                            <UserCard person={person} />
                        </li>
                    )) :
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl w-full">There are no MVP players yet!</h2>
                    }
                </ul>
            </div>
            <NewPlayerPopUp matchAccepted={matchResponse} setMatch={setMatch} match={match} />
        </div>
    )
}

export default Lobby