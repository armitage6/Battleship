import React from 'react';

const CellComputer = ({ data, onClick }) => {
    let backgroundColorClass;
    if (data.isAttacked) {
        backgroundColorClass = data.isHit ? 'bg-danger' : 'bg-success';
    } else {
        backgroundColorClass = 'bg-light';
    }

    return (
        <div
            className={`cell-computer ${backgroundColorClass}`}
            onClick={onClick}
        ></div>
    );
};

export default CellComputer;
