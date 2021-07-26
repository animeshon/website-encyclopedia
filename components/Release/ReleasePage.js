import React, { useEffect, useState } from 'react';

import GetReleases from '@/queries/GetRelease';

import ReleaseGrid from '@/components/Release/ReleaseGrid';
import FilterGroup from '@/components/Filter/FilterGroup';
import FilterSelect from '@/components/Filter/FilterSelect';
import Search from '@/components/Search';

import styles from './ReleasePage.module.css';

import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as gameRelease from '@/utilities/GameReleaseType';
import { AgeRating } from '@/utilities/AgeRating';
import { FromAlpha2 } from '@/utilities/Nationality';
import * as platforms from '@/utilities/Platform';

const filterByPlatfrorm = (shown, platform) => {
    const newShown = [];
    shown.forEach(s => {
        if (s.platforms.includes(platform)) {
            newShown.push(s);
        }
    })
    return newShown;
};

const filterByReleaseType = (shown, releaseType) => {
    const newShown = [];
    shown.forEach(s => {
        if (s.releaseType.type == releaseType) {
            newShown.push(s);
        }
    })
    return newShown;
};

const filterByReleaseLanguage = (shown, language) => {
    const newShown = [];
    shown.forEach(s => {
        let c = false;
        s.languages.forEach(l => {
            if (!c && l.code == language) {
                newShown.push(s);
                c = true;
            }
        })
    })
    return newShown;
};


const search = (shown, search) => {
    const newShown = [];
    shown.forEach(s => {
        if (s.name.toLowerCase().includes(search)) {
            newShown.push(s);
        }
    })
    return newShown;
};

const ReleasePage = ({ releases }) => {
    const [order, setOrder] = useState("name");
    const [platform, setPlatform] = useState(null);
    const [releaseType, setReleaseType] = useState(null);
    const [language, setLanguage] = useState(null);
    const [filter, setFilter] = useState('');
    const [releasesShown, setReleasesShown] = useState(releases);
    const NotFound = 'There is currently no information about releases available.';

    const PlatformOpts = [];

    releases.forEach(r => {
        r.platforms.forEach(p => {
            if (PlatformOpts.filter(po => { return po.value == p }).length == 0) {
                PlatformOpts.push({ value: p, label: platforms.Platform(p).name });
            }
        })
    });

    const TypeOpts = [];
    releases.forEach(r => {
        if (TypeOpts.filter(to => { return to.value == r.releaseType.type }).length == 0) {
            TypeOpts.push({ value: r.releaseType.type, label: r.releaseType.label });
        }
    });

    const LanguageOpts = [];
    releases.forEach(r => {
        r.languages.forEach(l => {
            if (LanguageOpts.filter(lo => { return lo.value == l.code }).length == 0) {
                LanguageOpts.push({ value: l.code, label: l.name });
            }
        })
    });

    const OrderBy = [
        { value: "name", label: "Name" },
        { value: "date", label: "Date" },
    ]

    useEffect(() => {
        setOrder(OrderBy[0]);
    }, []);

    const applyFiltersAndOrder = () => {
        let shown = Object.assign([], releases);
        platform ? shown = filterByPlatfrorm(shown, platform.value) : undefined;
        releaseType ? shown = filterByReleaseType(shown, releaseType.value) : undefined;
        language ? shown = filterByReleaseLanguage(shown, language.value) : undefined;
        filter ? shown = search(shown, filter.toLowerCase()) : undefined;
        shown.sort(function (a, b) {
            if (order.value == "date") {
                const getTime = (date) => {
                    return date ? new Date(date).getTime() : 9999999999999;
                }
                return getTime(a.releaseDate) < getTime(b.releaseDate) ? -1 : 1;
            }
            return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        });
        setReleasesShown(shown);
    };

    useEffect(() => {
        applyFiltersAndOrder();
    }, [order, platform, releaseType, language, filter]);

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
                                options={OrderBy}
                                value={order}
                                onChange={(e) => setOrder(e)} />
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
                {releasesShown && <ReleaseGrid releases={releasesShown} />}
            </> : NotFound}
        </main>
    );
};

export const getProps = async (ctx, client) => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(client, PrepareQuery({ id: id }, GetReleases(type)));

    const releases = (data.releases || []).map(i => {
        const { __typename, platforms, id, releaseDate, images, names, descriptions, ageRatings, isDoujinshi, type } = i;
        if (names.length === 0) {
            return;
        }
        let releaseType = undefined;
        if (__typename == "VisualNovelRelease") {
            releaseType = { type: type, label: gameRelease.GameReleaseType(type).name };
        }

        const languages = [];
        i.languages?.forEach(l => {
            let language = undefined;
            if (l.alpha2) {
                language = l.alpha2.toLowerCase();
                languages.push(language);
            }
        })

        return {
            id: id,
            type: __typename,
            name: locale.EnglishAny(names),
            image: image.ProfileAny(images, ageRatings),
            description: locale.English(descriptions),
            releaseDate: releaseDate,
            platforms: platforms,
            isOfficial: !isDoujinshi,
            releaseType: releaseType,
            languages: FromAlpha2(languages),
            rating: AgeRating(ageRatings, ['USA'], undefined, false)
        };
    });

    return { releases: releases };
};

export default ReleasePage;