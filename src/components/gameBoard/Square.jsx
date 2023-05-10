import React from 'react'
import './index.css';

const Square = ({ chooseSquare, val, styles }) => {
    return (
        <div className={`square w-full h-full flex justify-center items-center ${styles}`} onClick={chooseSquare}>
            <p className='game-letter text-4xl md:text-6xl'>{val}</p>
        </div>
    )
}

export default Square