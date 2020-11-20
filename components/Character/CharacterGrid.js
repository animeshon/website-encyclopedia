import React from 'react';

import CharacterCard from '@/components/Character/CharacterCard';

const CharacterGrid = ({ characters }) => {
    return (<>
        {characters?.map(item => {
            return (<CharacterCard
                key={item.character.id}
                character={item.character}
                cast={item.cast} />
            );
        })}
    </>);
};

export default CharacterGrid;