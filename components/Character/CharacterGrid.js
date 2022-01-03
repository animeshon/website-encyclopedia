import React from 'react';

import CharacterCard from '@/components/Character/CharacterCard';

const CharacterGrid = ({ characters, language }) => {
    return (<>
        {characters?.map(item => {
            return (<CharacterCard
                key={item.GetResourceName()}
                character={item}
                language={language} />
            );
        })}
    </>);
};

export default CharacterGrid;