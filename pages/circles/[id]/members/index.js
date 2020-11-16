import React from 'react';

import withContainer from '@/components/Container';
import ComingSoonStaffGrid from '@/components/ComingSoonGrid/Staff';

const Staff = ({people}) => {
    return (
        <ComingSoonStaffGrid title={"Members"} />
    );
};

Staff.getInitialProps = async ctx => {
    return {};
};

export default withContainer(Staff);
