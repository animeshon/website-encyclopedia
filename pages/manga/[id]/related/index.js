import React from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import RelatedPage, { getProps } from '@/components/Related/RelatedPage';

export default withContainer(RelatedPage);
export const getServerSideProps = withContainerProps(getProps);