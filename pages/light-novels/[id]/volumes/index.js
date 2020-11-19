import React from 'react';

import withContainer from '@/components/Container';
import ComingSoonContentGrid from '@/components/ComingSoonGrid/Content';

const Volumes = ({ volumes }) => {
    return (
        <ComingSoonContentGrid title={"Volumes"} />
    );
};

Volumes.getInitialProps = async ctx => {
    return {};
};

export default withContainer(Volumes);
