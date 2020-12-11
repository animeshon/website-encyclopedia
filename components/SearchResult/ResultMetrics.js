

import React from 'react';
import styles from './ResultMetrics.module.css';

const ResultMetrics = ({ results, total, queryTime }) => {
    return (
        <em className={styles.results_displayer}>
            {results} of {total} results displayed in {(queryTime).toFixed(2)} seconds
        </em>
    );
};

export default ResultMetrics;
