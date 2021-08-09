import React from 'react';
import ProductionPage, { getProps } from '@/components/Production/ProductionPage';
import withContainer, { withContainerProps } from '@/components/Container';


export default withContainer(ProductionPage);
export const getServerSideProps = withContainerProps(getProps);