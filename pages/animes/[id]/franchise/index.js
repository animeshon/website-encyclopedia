import React from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import CanonicalPage, { getProps } from '@/components/Canonical/CanonicalPage';

export default withContainer(CanonicalPage);
export const getServerSideProps = withContainerProps(getProps);
