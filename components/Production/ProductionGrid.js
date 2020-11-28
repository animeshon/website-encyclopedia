import React from 'react';

import ProductionCard from '@/components/Production/ProductionCard';

const ProductionGrid = ({ productions }) => {
    return (<>
        {productions?.map(item => {
            return (<ProductionCard key={item.id} content={item} />);
        })}
    </>);
};

export default ProductionGrid;