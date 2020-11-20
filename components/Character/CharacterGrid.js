import React from 'react';

import CharacterCard from '@/components/Character/CharacterCard';
import ExpandableSection from '@/components/ExpandableSection';


const CharacterGrid = ({ characters, category }) => {
    return (
        <ExpandableSection key={category} label={characters.role} >
            {characters.items.map(item => {
                return (<CharacterCard
                    key={item.character.id}
                    character={item.character}
                    cast={item.cast}/>
                );
            })}
        </ExpandableSection>
    );
};

export default CharacterGrid;