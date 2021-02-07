import React, { useEffect, useState } from 'react';

import GetRelated from '@/queries/GetRelated';

import ReleaseGrid from '@/components/Release/ReleaseGrid';
import FilterGroup from '@/components/Filter/FilterGroup';
import FilterSelect from '@/components/Filter/FilterSelect';
import Search from '@/components/Search';

import styles from './ReleasePage.module.css';

import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

const ReleasePage = ({ releases }) => {
    const [order, setOrder] = useState("name");
    const [platform, setPlatform] = useState(null);
    const [releaseType, setReleaseType] = useState(null);
    const [language, setLanguage] = useState(null);
    const [filter, setFilter] = useState('');
    const NotFound = 'There is currently no information about releases available.';

    const PlatformOpts = [
        { value: "win", label: "windows" },
        { value: "win1", label: "windows1" },
        { value: "win2", label: "windows2" },
        { value: "win3", label: "windows3" },
        { value: "win4", label: "windows4" },
    ];

    const TypeOpts = [
        { value: "partial", label: "partial" },
        { value: "complete", label: "complete" },
        { value: "dlc", label: "expansion" },
    ];

    const OrderBy = [
        { value: "name", label: "Name" },
        { value: "date", label: "date" },
    ]
    const Language = [
        { value: "jp", label: "Japanese" },
        { value: "eng", label: "English" },
        { value: "ita", label: "Italian" },
    ];

    useEffect(() => {
        setOrder(OrderBy[0]);
    }, [])

    useEffect(() => {
        console.log(order)
        console.log(platform)
        console.log(releaseType)
        console.log(language)
        console.log(filter)
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
                                options={Language}
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
                <ReleaseGrid releases={[{
                    id: 123,
                    name: "Fate/Stay Night - Trial Edition",
                    image: {
                        uri: "https://cdn-us.animeshon.com/i/N7/XK/EllrIwZB/QV-1NjhQUYQt.png"
                    },
                    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
                    lang: "jp",
                    platform: ["PS1", "PS2", "PSVITA"],
                    doujinshi: false,
                    releaseDate: "01/11/2015",
                    rating: "18+",
                    releaseType: "FULL",
                    type: "VisualNovelRelease"
                },
                {
                    id: 1234,
                    name: "Fate/Stay Night - First Press Limited Edition",
                    image: {
                        uri: "https://cdn-us.animeshon.com/i/N7/XK/EllrIwZB/QV-1NjhQUYQt.png"
                    },
                    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
                    lang: "en",
                    platform: ["XBOX", "NDS"],
                    doujinshi: true,
                    releaseDate: "01/11/2005",
                    rating: "12+",
                    releaseType: "PATCH",
                    type: "VisualNovelRelease"
                }
                ]} />
            </> : NotFound}
        </main>
    );
};

export const getProps = async (ctx, client, type) => {
    const { id } = ctx.query;
    // const data = await ExecuteQuery(client, PrepareQuery({ id: id }, GetRelated(type)));

    return { releases: ["a"] };
};

export default ReleasePage;