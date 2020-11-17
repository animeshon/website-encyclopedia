import React from 'react';

const ExpandableSection = ({ label, identifier, open, action, children }) => {
    return (
        <section key={identifier} className="expandable-section">
            <h4>
                <button name={identifier} onClick={e => action(e, open[identifier])} >
                    <span className="label">
                        {label}
                    </span>
                    <span className="line" />
                    <span className={`toggler ${open[identifier] ? 'opened' : 'closed' }`} />
                </button>
            </h4>
            <div className={`staff-members-holder ${open[identifier] ? 'opened' : 'closed'}`} >
                { children }
            </div>
        </section>
    );
};

export default ExpandableSection;