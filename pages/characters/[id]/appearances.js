import React, { useState, useEffect } from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import GetAppearances from '@/queries/GetAppearances';

import AppearanceGrid, { PruneInvalidAppearances } from '@/components/Appearance/AppearanceGrid';
import ExpandableSection from '@/components/ExpandableSection';
import FilterGroup from '@/components/Filter/FilterGroup';
import FilterSelect from '@/components/Filter/FilterSelect';

import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

import CharacterDataModel, { CharacterDataModelList } from '@/models/character';
import { SortBy } from '@/models/entity-list';
import Entity from '@/models/entity';

const Appearances = ({ appearances }) => {
    const [sort, setSort] = useState();
    const [relationFilter, setRelationFilter] = useState([]);
    const [shown, setShown] = useState();

    const appearancesModel = PruneInvalidAppearances(CharacterDataModelList.FromContentRawData(appearances));
    appearancesModel.Localize();

    const types = appearancesModel.GetAllTypes();

    const typesOpts = appearancesModel.GetAllRoles().map(l => {
        return { value: l, label: CharacterDataModel.LocalizeRole(l) }
    });
    const sortOpts = [
        { value: SortBy.DATE, label: "Date" },
        { value: SortBy.NAME, label: "Name" },
    ];

    useEffect(() => {
        setSort(sortOpts[1]);
    }, [])

    useEffect(() => {
        appearancesModel.Sort(sort?.value);
        setShown(appearancesModel);
    }, [sort])

    return (
        <main className="landing__description">
            <section className="landing-section-box">
                <header>
                    <h3>Appearances</h3>
                </header>
            </section>
            <FilterGroup>
                <ul>
                    <li>
                        <p>Sort By</p>
                        <FilterSelect height={30} options={sortOpts} value={sort} onChange={setSort} />
                    </li>
                    <li>
                        <p>Types</p>
                        <FilterSelect height={30} options={typesOpts} value={relationFilter} isClearable={true} onChange={setRelationFilter} />
                    </li>
                </ul>
            </FilterGroup>
            <div className="appearances grid-halves">
                {shown && shown.length ?
                    types.map(i => {
                        const a = shown.GetByTypes([i]).GetByRelation(relationFilter?.value);
                        return a.Size() != 0 ? (<ExpandableSection key={i} label={Entity.LocalizeType(i)}>
                            <AppearanceGrid appearances={a} />
                        </ExpandableSection>) : undefined;
                    })
                    : 'There is currently no appearances information available.'}
            </div>
        </main>
    );
};

export const getProps = async (ctx, client) => {
    const id = ctx.query.id.replace(".", "/");
    const data = await ExecuteQuery(client, PrepareQuery({ id: id, first: 1000000000 }, GetAppearances()));

    return {
        appearances: data.appearances || [],
    };
};

export default withContainer(Appearances);
export const getServerSideProps = withContainerProps(getProps);
