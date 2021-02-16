

import React, { useState, useContext } from 'react';
import Router from 'next/router';

import { MdTune } from 'react-icons/md';

import { SearchContext } from '@/ctx/Search';

import styles from './ResultFilter.module.css';

const ResultFilter = () => {
    const { search: { search, filter }, dispatchSearch } = useContext(SearchContext);

    const [filterOpen, filterOpener] = useState(false);

    const applyFilter = (e, type) => {
        e.preventDefault();
        if (filter == type) {
            return;    
        }

        dispatchSearch({
            type: 'applyFilter',
            payload: type,
        });

        const query = {
            q: search
        }

        if (type) {
            query.ft = type;
        }

        Router.push({
            pathname: '/search',
            query: query,
        });
    } 

    return (
        <div className={styles.filter}>
            <header>
                <button onClick={() => { filterOpener(!filterOpen) }}><MdTune /><h4>Filter</h4></button>
            </header>
            <div className={`${styles.filter_container} ${filterOpen ? styles.open : styles.close}`}>
                <div className={`${styles.filter_group} ${styles.wide}`}>
                    <h5>Type</h5>
                    <a onClick={(e) => applyFilter(e, undefined)} className={filter == undefined ? styles.selected : ''}>All</a>
                </div>
                <div className={`${styles.filter_group} ${styles.wide}`}>
                    <h5>Type</h5>
                    <a onClick={(e) => applyFilter(e, "Anime")} className={filter == 'Anime' ? styles.selected : ''}>Anime</a>
                    <a onClick={(e) => applyFilter(e, "Manga")} className={filter == 'Manga' ? styles.selected : ''}>Manga</a>
                    <a onClick={(e) => applyFilter(e, "LightNovel")} className={filter == 'LightNovel' ? styles.selected : ''}>Light Novel</a>
                    <a onClick={(e) => applyFilter(e, "VisualNovel")} className={filter == 'VisualNovel' ? styles.selected : ''}>Visual Novel</a>
                    <a onClick={(e) => applyFilter(e, "Doujinshi")} className={filter == 'Doujinshi' ? styles.selected : ''}>Doujinshi</a>
                </div>
                <div className={`${styles.filter_group} ${styles.wide}`}>
                    <h5>Type</h5>
                    <a onClick={(e) => applyFilter(e, "Character")} className={filter == 'Character' ? styles.selected : ''}>Character</a>
                    <a onClick={(e) => applyFilter(e, "Person")} className={filter == 'Person' ? styles.selected : ''}>Person</a>
                    <a onClick={(e) => applyFilter(e, "Organization")} className={filter == 'Organization' ? styles.selected : ''}>Organization</a>
                    <a onClick={(e) => applyFilter(e, "Circle")} className={filter == 'Circle' ? styles.selected : ''}>Circle</a>
                    <a onClick={(e) => applyFilter(e, "Convention")} className={filter == 'Convention' ? styles.selected : ''}>Convention</a>
                    <a onClick={(e) => applyFilter(e, "Magazine")} className={filter == 'Magazine' ? styles.selected : ''}>Magazine</a>
                </div>
                <div className={`${styles.filter_group} ${styles.wide}`}>
                    <h5>Type</h5>
                    <a onClick={(e) => applyFilter(e, "Universe")} className={filter == 'Universe' ? styles.selected : ''}>Universe</a>
                    <a onClick={(e) => applyFilter(e, "Canonical")} className={filter == 'Canonical' ? styles.selected : ''}>Canonical</a>
                </div>
            </div>
        </div>
    );
};

export default ResultFilter;
