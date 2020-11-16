import React from 'react';

import withContainer from '@/components/Container';
import ComingSoonStaffGrid from '@/components/ComingSoonGrid/Staff';

const Companies = ({companies}) => {
    return (
        <ComingSoonStaffGrid title={"Companies"} />
    );
};

Companies.getInitialProps = async ctx => {
    return {};
};

export default withContainer(Companies);
