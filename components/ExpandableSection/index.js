import React, { useState } from 'react';

const ExpandableSection = ({ label, openDefault = true, children }) => {
    const [open, setOpen] = useState(openDefault);

    return (
        <section key={label} className="expandable-section">
            <h4>
                <button name={label} onClick={() => setOpen(!open)} >
                    <span className="label">
                        {label}
                    </span>
                    <span className="line" />
                    <span className={`toggler ${open ? 'opened' : 'closed' }`} />
                </button>
            </h4>
            <div className={`staff-members-holder ${open ? 'opened' : 'closed'}`} >
                { children }
            </div>
        </section>
    );
};

export default ExpandableSection;