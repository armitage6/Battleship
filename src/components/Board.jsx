import React from 'react'
import Cell from './Cell'

import '../componentsCss/board.css'
import { useState, useEffect } from 'react';
import BoardComputer from './BoardComputer';

const Board = () => {

    const [playerBoard, setPlayerBoard] = useState(
        Array.from({ length: 100 }, (_, index) => ({
            id: index,
            hasShip: false,
        }))
    );

    const [computerBoard, setComputerBoard] = useState(
        Array.from({ length: 100 }, (_, index) => ({
            id: index,
            hasShip: false,
        }))
    );

    const [numShips, setNumShips] = useState(0);
    const [currentShipLength, setCurrentShipLength] = useState(0);
    const [playerAttacks, setPlayerAttacks] = useState([]);
    const [computerAttacks, setComputerAttacks] = useState([]);


    const generateRandomShips = (board, setBoard) => {

        if (board.some((cell) => cell.hasShip)) {

            return;
        }


        const shipLengths = [5, 4, 3, 3, 2];
        let newBoard = [...board];

        for (const shipLength of shipLengths) {
            let isShipPlaced = false;
            while (!isShipPlaced) {

                const orientation = Math.floor(Math.random() * 2);


                const startCellIndex = Math.floor(Math.random() * 100);
                const startCellRow = Math.floor(startCellIndex / 10);
                const startCellCol = startCellIndex % 10;


                let canBePlaced = true;
                for (let i = 0; i < shipLength; i++) {
                    const cellRow =
                        orientation === 0 ? startCellRow : startCellRow + i;
                    const cellCol =
                        orientation === 1 ? startCellCol : startCellCol + i;
                    if (
                        cellRow >= 10 ||
                        cellCol >= 10 ||
                        newBoard[cellRow * 10 + cellCol].hasShip
                    ) {
                        canBePlaced = false;
                        break;
                    }
                }


                if (canBePlaced) {
                    for (let i = 0; i < shipLength; i++) {
                        const cellRow =
                            orientation === 0 ? startCellRow : startCellRow + i;
                        const cellCol =
                            orientation === 1 ? startCellCol : startCellCol + i;
                        newBoard[cellRow * 10 + cellCol].hasShip = true;
                    }
                    isShipPlaced = true;
                }
            }
        }

        setBoard(newBoard);
    };

    // ...

    useEffect(() => {
        generateRandomShips(computerBoard, setComputerBoard);
    }, []);



    const handleCellClick = (index) => {
        if (numShips >= 5) {

            return;
        }
        if (currentShipLength >= 4) {

            return;
        }





        setPlayerBoard(prevBoard => {
            const newBoard = [...prevBoard];
            newBoard[index].hasShip = true;
            return newBoard;
        });
        setCurrentShipLength(prevLength => prevLength + 1);
    }



    const handleNewShip = () => {
        setNumShips(prevNumShips => prevNumShips + 1);
        setCurrentShipLength(0);
    }


    const checkGameStatus = () => {

        const playerLost = playerBoard.every((cell) => !cell.hasShip || cell.isHit);

        if (playerLost) {
            alert('Perdiste');
            return;
        }


        const playerWon = computerBoard.every((cell) => !cell.hasShip || cell.isHit);

        if (playerWon) {
            alert('Ganaste');
            return;
        }
    };


    const handleComputerCellClick = (index) => {
        // Verificar si la celda ya ha sido atacada
        if (computerBoard[index].isAttacked) {
            // Si la celda ya ha sido atacada, salir de la función
            return;
        }

        const isHit = computerBoard[index].hasShip;
        setPlayerAttacks((prevAttacks) => [
            ...prevAttacks,
            { cellIndex: index, isHit },
        ]);

        setComputerBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[index].isAttacked = true;
            newBoard[index].isHit = isHit;
            return newBoard;
        });

        let computerMoveIndex;
        do {
            computerMoveIndex = Math.floor(Math.random() * 100);
        } while (
            computerAttacks.some((attack) => attack.cellIndex === computerMoveIndex)
        );
        const computerIsHit = playerBoard[computerMoveIndex].hasShip;
        setComputerAttacks((prevAttacks) => [
            ...prevAttacks,
            { cellIndex: computerMoveIndex, isHit: computerIsHit },
        ]);

        setPlayerBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[computerMoveIndex].isAttacked = true;
            newBoard[computerMoveIndex].isHit = computerIsHit;
            return newBoard;
        });


        checkGameStatus();
    };



    return (
        <>
            <div>
                <h1 className='mb-3'>Jugador</h1>
                <button className='m-3 btn btn-light' onClick={handleNewShip} disabled={numShips >= 5}>
                    {numShips >= 5 ? 'Ya no se pueden poner más barcos' : 'Colocar nuevo barco'}

                </button>
                <div className='board'>

                    {playerBoard.map((cellData, index) => (
                        <Cell key={cellData.id} data={cellData} onClick={() => handleCellClick(index)} />
                    ))}
                </div>
            </div>

            <div >
                <h1 className='mb-5 '>Computadora </h1>


                <div className=''>

                    <BoardComputer
                        computerBoard={computerBoard}
                        setComputerBoard={setComputerBoard}
                        onCellClick={handleComputerCellClick}

                    />

                </div>
            </div>

        </>
    );
};

export default Board;