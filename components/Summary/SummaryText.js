import React from 'react';
const SummaryText = ({ text }) => {
    return (
        <section className="landing-section-box">
            <header>
                <h3>Description</h3>
            </header>
            <p className="text_description">{text ? text : 'There is currently no description available.'}</p>
        </section>
    );
};

export default SummaryText;