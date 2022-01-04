import React, { useEffect, useState } from 'react';

import GetReleases from '@/queries/GetReleases';

import ReleaseGrid from '@/components/Release/ReleaseGrid';
import FilterGroup from '@/components/Filter/FilterGroup';
import FilterSelect from '@/components/Filter/FilterSelect';
import Search from '@/components/Search';

import { ReleaseDataModelList } from '@/models/release';
import { SortBy } from '@/models/entity-list';

import styles from './ReleasePage.module.css';

import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

const ReleasePage = ({ releases }) => {
    const releaseModels = new ReleaseDataModelList(releases);

    releaseModels.Localize();
    // releaseModels.Sort(SortBy.NAME);

    const [sort, setSort] = useState();
    const [platform, setPlatform] = useState(null);
    const [releaseType, setReleaseType] = useState(null);
    const [language, setLanguage] = useState(null);
    const [filter, setFilter] = useState('');
    const [releasesShown, setReleasesShown] = useState();
    const NotFound = 'There is currently no information about releases available.';

    const PlatformOpts = releaseModels.GetAllPlatforms();
    const TypeOpts = releaseModels.GetAllSubtypes();

    const LanguageOpts = [];
    releaseModels.forEach(r => {
        r.LocalizedLanguages().forEach(l => {
            if (!LanguageOpts.find(lo => { return lo.value == l.value })) {
                LanguageOpts.push(l);
            }
        })
    });

    const sortOpts = [
        { value: SortBy.NAME, label: "Name" },
        { value: SortBy.DATE, label: "Date" },
    ];

    useEffect(() => {
        setSort(sortOpts[0]);
    }, [])

    const applyFiltersAndOrder = () => {
        let shown = releaseModels;
        shown.Sort(sort?.value);

        platform ? shown = shown.filter(r => r.Platforms().includes(platform.value)) : undefined;
        releaseType ? shown = shown.filter(r => r.Subtype() == releaseType.value) : undefined;
        language ? shown = shown.filter(r => r.Languages().find(l => l.code == language.value)) : undefined;
        filter ? shown = shown.ContainsString(filter.toLowerCase()) : undefined;

        setReleasesShown(shown);
    };

    useEffect(() => {
        applyFiltersAndOrder();
    }, [sort, platform, releaseType, language, filter]);

    return (
        <main className="landing__description">
            <section className="landing-section-box">
                <header>
                    <h3>Releases</h3>
                </header>
            </section>
            {releases && releases.length ? <>
                <FilterGroup classNameOpen={styles["release-filter"]}>
                    <ul>
                        <li>
                            <p>Search</p>
                            <Search placeholder={"Search by name..."} action={(value) => setFilter(value)} delay={300} />
                        </li>
                        <li>
                            <p>Order by</p>
                            <FilterSelect
                                height={30}
                                options={sortOpts}
                                value={sort}
                                onChange={(e) => setSort(e)} />
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p>Filter Language</p>
                            <FilterSelect
                                height={30}
                                placeholder={"Select Language..."}
                                options={LanguageOpts}
                                isSearchable={true}
                                isClearable={true}
                                value={language}
                                onChange={(e) => setLanguage(e)} />
                        </li>
                        <li>
                            <p>Filter Platforms</p>
                            <FilterSelect
                                height={30}
                                placeholder={"Select Platform..."}
                                options={PlatformOpts}
                                isSearchable={true}
                                isClearable={true}
                                value={platform}
                                onChange={(e) => setPlatform(e)} />
                        </li>
                        <li>
                            <p>Filter Release Type</p>
                            <FilterSelect
                                height={30}
                                placeholder={"Select Release Type..."}
                                options={TypeOpts}
                                isSearchable={true}
                                isClearable={true}
                                value={releaseType}
                                onChange={(e) => setReleaseType(e)} />
                        </li>
                    </ul>
                </FilterGroup>
                <ReleaseGrid releases={releasesShown} />
            </> : NotFound}
        </main>
    );
};

export const getProps = async (ctx, client) => {
    const id = ctx.query.id.replace(".", "/");
    const data = await ExecuteQuery(client, PrepareQuery({ id: id }, GetReleases()));

    return { releases: data.releases || [] };
};

export default ReleasePage;