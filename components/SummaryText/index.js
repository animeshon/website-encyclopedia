import React from 'react';
import parse from 'html-react-parser';

const SummaryText = ({ text }) => {
    return (
        <section className="landing-section-box">
            <header>
                <h3>Description</h3>
            </header>
            <p className="text_description">{text ? parse(text) : 'There is currently no description available.'}</p>
        </section>
    );
};

export default SummaryText;