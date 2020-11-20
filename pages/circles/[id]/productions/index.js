import React from 'react';

import withContainer from '@/components/Container';
import WorkInProgressStaffGrid from '@/components/WorkInProgress/Staff';

const Staff = ({people}) => {
    return (
        <WorkInProgressStaffGrid title={"Productions"} />
    );
};

Staff.getInitialProps = async ctx => {
    return {};
};

export default withContainer(Staff);
