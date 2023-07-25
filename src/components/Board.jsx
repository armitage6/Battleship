import { useState, useEffect } from 'react';
import React from 'react'
import Cell from './Cell'
import BoardComputer from './BoardComputer';
import useRandomShipsGenerator from '../hook/useRandomShipsGenerator';
import '../componentsCss/board.css'

import Swal from 'sweetalert2';

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




    // Se usa funcion importada 
    useRandomShipsGenerator(computerBoard, setComputerBoard);

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


    // Funcion que se encarga de establecer las alertas si gana o pierde
    const checkGameStatus = () => {

        const playerLost = playerBoard.every((cell) => !cell.hasShip || cell.isHit);

        if (playerLost) {
            Swal.fire('Perdiste, ¡reinicia y vuelve a jugar!');
            return;
        }


        const playerWon = computerBoard.every((cell) => !cell.hasShip || cell.isHit);

        if (playerWon) {
            Swal.fire('Ganaste, ¡reinicia y vuelve a jugar!');
            return;
        }
    };


    const handleComputerCellClick = (index) => {

        if (computerBoard[index].isAttacked) {

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


    //Restablece los valores y se llama a la funcion generateRandomShips para que genere los barcos alatorios
    const handleRestart = () => {

        Swal.fire({
            icon: 'question',
            title: 'Alerta',
            text: '¿Quieres volver a jugar?',
            showDenyButton: true,
            denyButtonAriaLabel: 'No',
            confirmButtonText: 'si'

        }).then(response => {
            if (response.isConfirmed) {

                setPlayerBoard(
                    Array.from({ length: 100 }, (_, index) => ({
                        id: index,
                        hasShip: false,
                    }))
                );
                setComputerBoard(
                    Array.from({ length: 100 }, (_, index) => ({
                        id: index,
                        hasShip: false,

                    }))
                );

                setNumShips(0);
                setCurrentShipLength(0);
                setPlayerAttacks([]);
                setComputerAttacks([]);
            } else if (response.isDenied) {
                Swal.fire('Puedes volver a jugar cuando quieras :)')
            }
        })





    };



    return (
        <>
            <div>
                <h1 className='mb-3'>Jugador</h1>
                <button className='m-3 btn btn-light' onClick={handleNewShip} disabled={numShips >= 5}>
                    {numShips >= 5 ? 'Ya no se pueden poner más barcos' : 'Colocar nuevo barco'}

                </button>
                <button className='m-3 btn btn-light' onClick={handleRestart}>Reiniciar</button>
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