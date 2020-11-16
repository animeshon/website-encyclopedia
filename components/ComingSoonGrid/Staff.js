import React from 'react';
import ComingSoonStaffCard from '@/components/ComingSoonCard/Staff';

const ComingSoonStaffGrid = ({ title }) => {
    return (
        <main className="anime-episodes__description grid">
            <section className="landing-section-box">
                <header>
                    <h3 className="coming-soon-title">{title}</h3>
                    <h3 className="coming-soon-alert">This page is coming soon!</h3>
                </header>

                {Array.apply(null, Array(3)).map(item => {
                    return (<section key={"section".concat(item)} className="expandable-section">
                        <h4>
                            <button>
                                <span className="label">
                                    <div className="coming-soon-staff-header"></div>
                                </span>
                                <span className="line" />
                                <span
                                    className={`toggler opened`}
                                ></span>
                            </button>
                        </h4>
                        <div className={`staff-members-holder opened`}>
                            <ComingSoonStaffCard key={"1-section".concat(item)} w1={100} w2={150} w3={200} w4={80} />
                            <ComingSoonStaffCard key={"2-section".concat(item)} w1={230} w2={70} w3={150} w4={60} />
                            <ComingSoonStaffCard key={"3-section".concat(item)} w1={60} w2={120} w3={180} w4={30} />
                        </div>
                    </section>);
                })}


            </section>
        </main>
    );
};

export default ComingSoonStaffGrid;