import React from 'react';

const ComingSoonStaffCard = ({ w1, w2, w3, w4 }) => {
    return (

        <div className="card">
            <figure className="card__image">
            </figure>
            <div className="card__info">
                <p className="card__jap-name" >
                    <div className="coming-soon-staff-title" style={{width : w1}}/>
                </p>
                <p className="card__jap-name">
                    <div className="coming-soon-staff-title" style={{width : w2}}/>
                </p>
                <p className="card__role">
                    <div className="coming-soon-staff-small" style={{width : w3}}/>
                </p>
                <p className="card__role">
                    <div className="coming-soon-staff-small" style={{width : w4}}/>
                </p>
            </div>
        </div>
    );
};

export default ComingSoonStaffCard;