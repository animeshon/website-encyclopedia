import React from 'react';

import EpisodeCard from '@/components/EpisodeCard';

const EpisodeGrid = ({ episodes }) => {
    return (
        <main className="anime-episodes__description grid">
            <section className="landing-section-box">
                <header>
                    <h3>Episodes</h3>
                </header>
                <div className="episodes-list">
                    {episodes && episodes.length ? episodes.map(item => {
                        return (<EpisodeCard episode={item} key={item.id} />);
                    }) : 'There is currently no information about episodes available.'}
                </div>
            </section>
        </main>
    );
};

export default EpisodeGrid;