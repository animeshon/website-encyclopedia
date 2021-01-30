import React from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import WorkInProgressStaffGrid from '@/components/WorkInProgress/Staff';

const Staff = ({ people }) => {
    return (
        <WorkInProgressStaffGrid title={"Members"} />
    );
};

// Staff.getInitialProps = async ctx => {
//     return {};
// };

export default withContainer(Staff);
export const getServerSideProps = withContainerProps();