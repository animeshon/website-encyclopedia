import React from 'react';

import withContainer from '@/components/Container';
import WorkInProgressContentGrid from '@/components/WorkInProgress/Content';

const Chpaters = ({ chapters }) => {
    return (
        <WorkInProgressContentGrid title={"Chpaters"} />
    );
};

Chpaters.getInitialProps = async ctx => {
    return {};
};

export default withContainer(Chpaters);
