import React from 'react'

const Square = ({ chooseSquare, val, styles }) => {
    return (
        <div className={`square w-full h-full flex justify-center items-center ${styles}`} onClick={chooseSquare}>
            {val}
        </div>
    )
}

export default Square