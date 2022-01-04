import React from 'react';

import AppearanceCard from '@/components/Appearance/AppearanceCard';

export const PruneInvalidAppearances = (appearances) => {
    return appearances.filter(a => ["Anime", "LightNovel", "VisualNovel", "GraphicNovel"].includes(a.Type()));
}

const AppearanceGrid = ({ appearances }) => {
    return (
        <>
            {appearances?.map(item => {
                return (<AppearanceCard key={item.GetResourceName()} content={item} />);
            })}
        </>
    );
};

export default AppearanceGrid;