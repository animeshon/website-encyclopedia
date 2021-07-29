

import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import cn from 'classnames';

import Button from '@/components/Button';

import { MdTune } from 'react-icons/md';

import { SearchContext } from '@/ctx/Search';

import styles from './ResultFilter.module.css';

const ResultFilter = () => {
    const { search: { search, filter }, dispatchSearch } = useContext(SearchContext);
    const [filterOpen, filterOpener] = useState(false);
    const [filterType, setFilterType] = useState();
    const [filterSubtype, setFilterSubtype] = useState();
    const [sortBy, setSortBy] = useState();
    const [filterDistributionSelf, setFilterDistributionSelf] = useState();
    const [filterDistributionCorporate, setFilterDistributionCorporate] = useState();

    useEffect(() => {
        if (filter) {
            setFilterType(filter.ft);
            setFilterSubtype(filter.fst);
            setSortBy(filter.s);
            setFilterDistributionSelf(filter.fds);
            setFilterDistributionCorporate(filter.fdc);
        }
    }, [filter])

    const subTypes = new Map([
        ["Anime", [
            { value: "MOVIE", label: "Movie" },
            { value: "MUSIC_VIDEO", label: "Music Video" },
            { value: "ONA", label: "ONA" },
            { value: "OVA", label: "OVA" },
            { value: "SPECIAL", label: "Special" },
            { value: "TV", label: "TV Series" },
            { value: "WEB", label: "Web Anime" },
        ]],
        ["GraphicNovel", [
            { value: "MANGA", label: "Manga" },
            { value: "MANHUA", label: "Manhua" },
            { value: "MANHWA", label: "Manhwa" },
            { value: "OVA", label: "OVA" },
            { value: "SPECIAL", label: "Special" },
            { value: "OEL", label: "Original English Language" },
            { value: "ONE_SHOT", label: "One Shot" },
            { value: "WEB_COMIC", label: "Web Comic" },
            { value: "YON_KOMA", label: "4 Koma" },
        ]],
        ["Organization", [
            { value: "CIRCLE", label: "Circle" },
            { value: "CORPORATE", label: "Corporation" },
        ]],
    ])

    const handleChangeTypeFilter = (type) => {
        setFilterType(type);
        setFilterSubtype(undefined);
    }

    const applyFilter = (e, type) => {
        e.preventDefault();

        dispatchSearch({
            type: 'applyFilter',
            payload: {
                q: search,
                s: sortBy,
                fds: filterDistributionSelf,
                fdc: filterDistributionCorporate,
                ft: filterType,
                fst: filterSubtype
            },
        });

        const query = {
            q: search,
            s: sortBy,
            fds: filterDistributionSelf,
            fdc: filterDistributionCorporate,
        }

        if (filterType) {
            query.ft = filterType;
        }
        if (filterSubtype) {
            query.fst = filterSubtype;
        }

        Router.push({
            pathname: '/search',
            query: query,
        });
    }

    return (
        <div className={cn(styles.filter, !filterOpen ? styles["filter-close"] : undefined)}>
            <header>
                <button onClick={() => { filterOpener(!filterOpen) }}><MdTune /><h4>Filter</h4></button>
            </header>
            <div className={filterOpen ? styles.open : styles.close}>
                <div className={`${styles.filter_container}`}>
                    <div className={`${styles.filter_group} ${styles.wide}`}>
                        <h5>Type</h5>
                        <a onClick={(e) => handleChangeTypeFilter(undefined)} className={filterType == undefined ? styles.selected : ''}>All</a>
                        <hr />
                        <a onClick={(e) => handleChangeTypeFilter("Anime")} className={filterType == 'Anime' ? styles.selected : ''}>Anime</a>
                        <a onClick={(e) => handleChangeTypeFilter("GraphicNovel")} className={filterType == 'GraphicNovel' ? styles.selected : ''}>Graphic Novel</a>
                        <a onClick={(e) => handleChangeTypeFilter("LightNovel")} className={filterType == 'LightNovel' ? styles.selected : ''}>Light Novel</a>
                        <a onClick={(e) => handleChangeTypeFilter("VisualNovel")} className={filterType == 'VisualNovel' ? styles.selected : ''}>Visual Novel</a>
                        <hr />
                        <a onClick={(e) => handleChangeTypeFilter("Character")} className={filterType == 'Character' ? styles.selected : ''}>Character</a>
                        <a onClick={(e) => handleChangeTypeFilter("Person")} className={filterType == 'Person' ? styles.selected : ''}>Person</a>
                        <a onClick={(e) => handleChangeTypeFilter("Organization")} className={filterType == 'Organization' ? styles.selected : ''}>Organization</a>
                        {/* <a onClick={(e) => handleChangeTypeFilter("Convention")} className={filterType == 'Convention' ? styles.selected : ''}>Convention</a> */}
                        {/* <a onClick={(e) => handleChangeTypeFilter("Magazine")} className={filterType == 'Magazine' ? styles.selected : ''}>Magazine</a> */}
                        <hr />
                        <a onClick={(e) => handleChangeTypeFilter("Universe")} className={filterType == 'Universe' ? styles.selected : ''}>Universe</a>
                        <a onClick={(e) => handleChangeTypeFilter("Canonical")} className={filterType == 'Canonical' ? styles.selected : ''}>Canonical</a>
                    </div>
                    <div className={`${styles.filter_group} ${styles.wide}`}>
                        <h5>Subtype</h5>
                        {subTypes.has(filterType) &&
                            <>
                                <a onClick={(e) => setFilterSubtype(undefined)} className={filterSubtype == undefined ? styles.selected : ''}>All</a>
                                {subTypes.get(filterType).map(e => {
                                    return (<a onClick={() => setFilterSubtype(e.value)} className={filterSubtype == e.value ? styles.selected : ''}>{e.label}</a>)
                                })}
                            </>
                        }
                    </div>
                    <div className={`${styles.filter_group} ${styles.wide}`}>
                        <h5>Publication</h5>
                        <a onClick={(e) => setFilterDistributionSelf(!filterDistributionSelf)} className={filterDistributionSelf ? styles.selected : ''}>Self-Published</a>
                        <a onClick={(e) => setFilterDistributionCorporate(!filterDistributionCorporate)} className={filterDistributionCorporate ? styles.selected : ''}>Corporate</a>
                    </div>
                    <div className={`${styles.filter_group} ${styles.wide}`}>
                        <h5>Sort by</h5>
                        <a onClick={(e) => setSortBy("RELEVANCE")} className={sortBy == "RELEVANCE" ? styles.selected : ''}>Relevance</a>
                        <a onClick={(e) => setSortBy("DATE")} className={sortBy == "DATE" ? styles.selected : ''}>Date</a>
                    </div>
                </div>
                <div>
                    <Button
                        className="cherry-red medium"
                        type="form-submit"
                        onClick={applyFilter}
                    >
                        Apply
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ResultFilter;
