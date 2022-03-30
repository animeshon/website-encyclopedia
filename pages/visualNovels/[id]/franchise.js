// import React from 'react';

// import withContainer, { withContainerProps } from '@/components/Container';
// import CanonicalPage, { getProps } from '@/components/Canonical/CanonicalPage';

// export default withContainer(CanonicalPage);
// export const getServerSideProps = withContainerProps(getProps);

import React from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import WorkInProgressContentGrid from '@/components/WorkInProgress/Content';

const WIP = () => {
    return (
        <WorkInProgressContentGrid title={"Canonical Franchise"} />
    );
};

// Episodes.getInitialProps = async ctx => {
//     return {};
// };

export default withContainer(WIP);
export const getServerSideProps = withContainerProps();