import React from 'react';

import ChapterCard from '@/components/Chapter/ChapterCard';

const ChapterGrid = ({ chapters }) => {
    return (
        <main className="landing__description">
            <section className="landing-section-box">
                <header>
                    <h3>Chapters</h3>
                </header>
                <div className="grid-halves">
                    {chapters && chapters.length ? chapters.map(item => {
                        return (<ChapterCard chapter={item} key={item.id} />);
                    }) : 'There is currently no information about chapters available.'}
                </div>
            </section>
        </main>
    );
};

export default ChapterGrid;