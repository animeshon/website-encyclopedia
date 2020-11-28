import React from 'react';

const Flag = ({ nationality }) => {
    const n = nationality?.toLowerCase();
    return (<>
        {n &&
            <span className={`fp fp-sm custom-fp ${n == 'en' ? 'gb' : n}`} />
        }
    </>);
};

export default Flag;
