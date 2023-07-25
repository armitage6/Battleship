import { useEffect } from 'react';

const useRandomShipsGenerator = (board, setBoard) => {
    useEffect(() => {
        const generateRandomShips = () => {
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

        if (board.every((cell) => !cell.hasShip)) {
            generateRandomShips();
        }
    }, [board, setBoard]);
};

export default useRandomShipsGenerator;
