import React from 'react';

import withContainer from '@/components/Container';
import WorkInProgressStaffGrid from '@/components/WorkInProgress/Staff';

const Companies = ({companies}) => {
    return (
        <WorkInProgressStaffGrid title={"Companies"} />
    );
};

Companies.getInitialProps = async ctx => {
    return {};
};

export default withContainer(Companies);
