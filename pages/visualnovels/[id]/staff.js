import React from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import StaffPage, { getProps } from '@/components/Staff/StaffPage';

export default withContainer(StaffPage);
export const getServerSideProps = withContainerProps(getProps);