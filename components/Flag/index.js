import React from 'react';
import cn from 'classnames';

const Flag = ({ nationality, className }) => {
    const n = nationality?.toLowerCase();
    return (<>
        {n &&
            <span className={cn(className, "fp", "fp-sm custom-fp", n == 'en' ? 'gb' : n)} />
        }
    </>);
};

export default Flag;
