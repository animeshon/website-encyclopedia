import React from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import WorkInProgressContentGrid from '@/components/WorkInProgress/Content';

const Chapters = ({ chapters }) => {
    return (
        <WorkInProgressContentGrid title={"Chapters"} />
    );
};

// Chapters.getInitialProps = async ctx => {
//     return {};
// };

export default withContainer(Chapters);
export const getServerSideProps = withContainerProps();