

import React from 'react';
import styles from './ResultMetrics.module.css';

const ResultMetrics = ({ queryTime }) => {
    return (
        <em className={styles.results_displayer}>
            Results displayed in {(queryTime).toFixed(2)} seconds
        </em>
    );
};

export default ResultMetrics;
