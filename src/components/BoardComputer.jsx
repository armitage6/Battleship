import React from 'react'
import CellComputer from './CellComputer';


const BoardComputer = (
    { computerBoard, setComputerBoard, onCellClick }
) => {
    return (
        <div className='board-computer'>
            {computerBoard.map((cellData, index) => (
                < CellComputer key={cellData.id} data={cellData} onClick={() => onCellClick(index)} />
            ))}
        </div>
    )
}

export default BoardComputer
