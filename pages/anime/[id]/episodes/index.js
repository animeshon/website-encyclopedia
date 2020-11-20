import React from 'react';

import withContainer from '@/components/Container';
import WorkInProgressContentGrid from '@/components/WorkInProgress/Content';

const Episodes = ({episodes}) => {
    return (
        <WorkInProgressContentGrid title={"Episodes"} />
    );
};

Episodes.getInitialProps = async ctx => {
    return {};
};

export default withContainer(Episodes);
