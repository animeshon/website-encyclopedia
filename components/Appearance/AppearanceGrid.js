import React from 'react';

import AppearanceCard from '@/components/Appearance/AppearanceCard';

export const PruneInvalidAppearances = (appearances) => {
    return appearances.filter(a => ["Anime", "LightNovel", "VisualNovel", "Manga", "Doujinshi"].includes(a.type));
}

const AppearanceGrid = ({ appearances }) => {
    return (
        <>
            {appearances?.map(item => {
                return (<AppearanceCard key={item.id} content={item} />);
            })}
        </>
    );
};

export default AppearanceGrid;