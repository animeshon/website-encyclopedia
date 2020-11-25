import React from 'react';
import styles from './WorkInProgress.module.css';

const WorkInProgressContentGrid = ({ title }) => {
    return (
        <main className="anime-episodes__description grid">
            <section className="landing-section-box">
                <header>
                    <h3 className={styles.coming_soon_title}>{title}</h3>
                    <h3 className={styles.coming_soon_alert}>Work in progress!</h3>
                </header>
                <div className={styles.episodes_list}>
                    {Array.apply(null, Array(5)).map(item => {
                        return (<img key={item} className={styles.coming_soon_content_image} alt="coming soon image"/>);
                    })}
                </div>
            </section>
        </main>
    );
};

export default WorkInProgressContentGrid;