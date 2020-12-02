import React from 'react';
import styles from './WorkInProgress.module.css';
import stylesCard from '@/components/Card/Info/CardInfo.module.css';
import stylesExpandable from '@/components/ExpandableSection/ExpandableSection.module.css';

import SafeImage from '@/components/SafeImage';

const WorkInProgressStaffCard = ({ w1, w2, w3, w4 }) => {
    return (

        <div className={stylesCard.card}>
            <SafeImage className={stylesCard.card__image} fallback={undefined}>
            </SafeImage>
            <div className={stylesCard.card__info}>
                <p className={stylesCard.card__jap-name}>
                    <div className={styles.coming_soon_staff_title} style={{width : w1}}/>
                </p>
                <p className={stylesCard.card__jap-name}>
                    <div className={styles.coming_soon_staff_title} style={{width : w2}}/>
                </p>
                <p className={stylesCard.card__role}>
                    <div className={styles.coming_soon_staff_small} style={{width : w3}}/>
                </p>
                <p className={stylesCard.card__role}>
                    <div className={styles.coming_soon_staff_small} style={{width : w4}}/>
                </p>
            </div>
        </div>
    );
};


const WorkInProgressStaffGrid = ({ title }) => {
    return (
        <main className="anime-episodes__description grid">
            <section className="landing-section-box">
                <header>
                    <h3 className={styles.coming_soon_title}>{title}</h3>
                    <h3 className={styles.coming_soon_alert}>Work in progress!</h3>
                </header>

                {Array.apply(null, Array(3)).map(item => {
                    return (<section key={"section".concat(item)} className={stylesExpandable.expandable_section}>
                        <h4>
                            <button>
                                <span className={stylesExpandable.label}>
                                    <div className={styles.coming_soon_staff_header}></div>
                                </span>
                                <span className={stylesExpandable.line} />
                                <span
                                    className={`${stylesExpandable.toggler} ${stylesExpandable.opened}`}
                                ></span>
                            </button>
                        </h4>
                        <div className={`staff-members-holder opened`}>
                            <WorkInProgressStaffCard key={"1-section".concat(item)} w1={100} w2={150} w3={200} w4={80} />
                            <WorkInProgressStaffCard key={"2-section".concat(item)} w1={230} w2={70} w3={150} w4={60} />
                            <WorkInProgressStaffCard key={"3-section".concat(item)} w1={60} w2={120} w3={180} w4={30} />
                        </div>
                    </section>);
                })}


            </section>
        </main>
    );
};

export default WorkInProgressStaffGrid;