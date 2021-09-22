import React from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import ContentPage, { getProps } from '@/components/Content/ContentPage';

export default withContainer(ContentPage);
export const getServerSideProps = withContainerProps(getProps);