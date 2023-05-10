import { useState, useEffect } from 'react';
import Square from './Square';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GameBoard = ({ theUser, socket, updateUser }) => {
    const { gameID } = useParams();

    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
    const [player, setPlayer] = useState("X");
    const [turn, setTurn] = useState(0)
    const [winner, setWinner] = useState("");
    const [players, setPlayers] = useState([])

    const chooseSquare = (idx) => {
        if (board[idx] === '' && !winner && theUser.username === players[turn]) {
            const updatedBoard = [...board].map((val, i) => {
                if (i === idx && val === '') {
                    return player;
                }
                return val
            });
            socket.emit('move', { player, updatedBoard, turn, gameID })
        }
    }

    const checkWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    useEffect(() => {
        updateData()
    }, [board]);

    const updateData = () => {
        if (checkWinner(board) != null) {
            setWinner(players[turn == 0 ? 1 : 0]);
            if(theUser.username === players[turn == 0 ? 1 : 0]) {
                axios
                    .put(`${process.env.REACT_APP_API_URL}/update-user/${theUser._id}`, { winsCounter: theUser.winsCounter + 1})
                    .then(response => updateUser(response.data))
            }
        }
        socket.on('board', data => {
            setPlayer(data.player)
            setBoard(data.updatedBoard)
            setTurn(data.turn);
        })
    }

    useEffect(() => {
        socket.on('start-game', data => {
            const [player1, player2] = data;
            const playersInRoom = [player1.theUser.username, player2.theUser.username];
            setPlayers(playersInRoom)
        })
    }, [])

    return (
        <div className='w-full md:w-2/3 flex flex-col justify-center items-center space-y-20 h-80 md:h-full'>
            {
                !winner ?
                    <h3 className='w-1/2'>Es el turno de: {players[turn]}</h3> :
                    <h3>Winner is: {winner}</h3>
            }
            <section className='w-1/2 h-1/2 flex'>
                <div className='board-row w-full h-1/3 felx flex-col'>
                    <Square chooseSquare={() => chooseSquare(0)} val={board[0]} styles={'border-r-2 border-b-2'} />
                    <Square chooseSquare={() => chooseSquare(1)} val={board[1]} styles={'border-r-2 border-b-2'} />
                    <Square chooseSquare={() => chooseSquare(2)} val={board[2]} styles={'border-r-2'} />
                </div>
                <div className='board-row w-full h-1/3'>
                    <Square chooseSquare={() => chooseSquare(3)} val={board[3]} styles={'border-r-2 border-b-2'} />
                    <Square chooseSquare={() => chooseSquare(4)} val={board[4]} styles={'border-r-2 border-b-2'} />
                    <Square chooseSquare={() => chooseSquare(5)} val={board[5]} styles={'border-r-2'} />
                </div>
                <div className='board-row w-full h-1/3'>
                    <Square chooseSquare={() => chooseSquare(6)} val={board[6]} styles={'border-b-2'} />
                    <Square chooseSquare={() => chooseSquare(7)} val={board[7]} styles={'border-b-2'} />
                    <Square chooseSquare={() => chooseSquare(8)} val={board[8]} />
                </div>
            </section>
        </div>
    )
}

export default GameBoard