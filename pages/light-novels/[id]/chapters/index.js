import React from 'react';

import withContainer from '@/components/Container';
import ComingSoonContentGrid from '@/components/ComingSoonGrid/Content';

const Chpaters = ({ chapters }) => {
    return (
        <ComingSoonContentGrid title={"Chpaters"} />
    );
};

Chpaters.getInitialProps = async ctx => {
    return {};
};

export default withContainer(Chpaters);
