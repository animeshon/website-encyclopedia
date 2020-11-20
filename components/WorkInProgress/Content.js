import React from 'react';

const WorkInProgressContentGrid = ({ title }) => {
    return (
        <main className="anime-episodes__description grid">
            <section className="landing-section-box">
                <header>
                    <h3 className="coming-soon-title">{title}</h3>
                    <h3 className="coming-soon-alert">Work in progress!</h3>
                </header>
                <div className="episodes-list">
                    {Array.apply(null, Array(5)).map(item => {
                        return (<img key={item} className="coming-soon-content-image" alt="coming soon image"/>);
                    })}
                </div>
            </section>
        </main>
    );
};

export default WorkInProgressContentGrid;