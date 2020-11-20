import React from 'react';

import withContainer from '@/components/Container';
import WorkInProgressStaffGrid from '@/components/WorkInProgress/Staff';

const Staff = ({people}) => {
    return (
        <WorkInProgressStaffGrid key={"coming-soon-staff"} title={"Staff"} />
    );
};

Staff.getInitialProps = async ctx => {
    return {};
};

export default withContainer(Staff);
