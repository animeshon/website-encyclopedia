import React from 'react';

import withContainer from '@/components/Container';
import WorkInProgressContentGrid from '@/components/WorkInProgress/Content';

const Volumes = ({ volumes }) => {
    return (
        <WorkInProgressContentGrid title={"Volumes"} />
    );
};

Volumes.getInitialProps = async ctx => {
    return {};
};

export default withContainer(Volumes);
