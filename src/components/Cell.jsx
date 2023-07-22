import React from 'react';

const Cell = ({ data, onClick }) => {
    let backgroundColorClass;
    if (data.isAttacked) {
        backgroundColorClass = data.isHit ? 'bg-danger' : 'bg-success';
    } else if (data.hasShip) {
        backgroundColorClass = 'bg-secondary';
    } else {
        backgroundColorClass = 'bg-light';
    }

    return (
        <div
            className={`cell ${backgroundColorClass}`}
            onClick={onClick}
        ></div>
    );
};

export default Cell;
