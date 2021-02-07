import React from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import ReleasePage, { getProps } from '@/components/Release/ReleasePage';

export default withContainer(ReleasePage);
export const getServerSideProps = withContainerProps(getProps);