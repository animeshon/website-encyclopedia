import React from 'react';

import CardInfo from '@/components/Card/Info';

const StaffGrid = ({ collaborations }) => {
    return (<>
        {collaborations.staff.map(s => {
            const info = {
                ...s,
                caption: collaborations.role.name,
            }
            return <CardInfo key={info.id} info={info}></CardInfo>
        })}
    </>);
};

export default StaffGrid;