import React from 'react';

import CardInfo from '@/components/Card/Info';

const StaffGrid = ({ collaborations }) => {
    return (<>
        {collaborations.map(c => {
            return <CardInfo key={c} info={c} caption={c.GetJobRole()}></CardInfo>
        })}
    </>);
};

export default StaffGrid;