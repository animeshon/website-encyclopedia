import React from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import CharacterPage, { getProps } from '@/components/Character/CharacterPage';

export default withContainer(CharacterPage);
export const getServerSideProps = withContainerProps(getProps);