import React from 'react';

const ComingSoonContentGrid = ({ title }) => {
    return (
        <main className="anime-episodes__description grid">
            <section className="landing-section-box">
                <header>
                    <h3 className="coming-soon-title">{title}</h3>
                </header>
                <div className="episodes-list">
                    {Array.apply(null, Array(5)).map(item => {
                        return (<img className="coming-soon-content-image" alt="coming soon image"/>);
                    })}
                </div>
            </section>
        </main>
    );
};

export default ComingSoonContentGrid;