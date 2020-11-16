import React from 'react';

import withContainer from '@/components/Container';
import ComingSoonContentGrid from '@/components/ComingSoonGrid/Content';

const Episodes = ({episodes}) => {
    return (
        <ComingSoonContentGrid title={"Episodes"} />
    );
};

Episodes.getInitialProps = async ctx => {
    return {};
};

export default withContainer(Episodes);
