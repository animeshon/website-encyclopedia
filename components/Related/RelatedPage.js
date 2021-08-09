import React, { useState, useEffect } from 'react';

import GetRelated from '@/queries/GetRelated';

import RelatedGrid from '@/components/Related/RelatedGrid';
import ExpandableSection from '@/components/ExpandableSection';
import FilterGroup from '@/components/Filter/FilterGroup';
import FilterSelect from '@/components/Filter/FilterSelect';

import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

import RelatedContentDataModel, { RelatedContentDataModelList } from '@/models/related-content';
import Entity from '@/models/entity';
import { SortBy } from '@/models/entity-list';

const RelatedPage = ({ related, highlighted }) => {
    const [sort, setSort] = useState();
    const [typeFilter, setTypeFilter] = useState([]);

    const relatedModels = RelatedContentDataModelList.FromRelatedRawData(related);
    relatedModels.Localize();

    const relations = relatedModels.GetAllRelations(highlighted);
    const types = relatedModels.GetAllTypes();

    const typesOpts = types.map(l => {
        return { value: l, label: Entity.LocalizeType(l) }
    });
    const sortOpts = [
        { value: SortBy.DATE, label: "Date" },
        { value: SortBy.NAME, label: "Name" },
    ];

    const onSortChange = async (selectedOption) => {
        setSort(selectedOption);
    };

    const onTypeFilterChange = async (selectedOption) => {
        setTypeFilter(selectedOption);
    };

    useEffect(() => {
        setSort(sortOpts[0]);
    }, [])

    useEffect(() => {
        relatedModels.Sort(sort?.value);
    }, [sort])

    return (
        <main className="landing__description">
            <section className="landing-section-box">
                <header>
                    <h3>Related</h3>
                </header>
            </section>
            {relatedModels.Size() ? <>
                <FilterGroup>
                    <ul>
                        <li>
                            <p>Sort By</p>
                            <FilterSelect height={30} options={sortOpts} value={sort} onChange={onSortChange} />
                        </li>
                        <li>
                            <p>Types</p>
                            <FilterSelect height={30} options={typesOpts} value={typeFilter} isClearable={true} onChange={onTypeFilterChange} />
                        </li>
                    </ul>
                </FilterGroup>
                {relatedModels.Sort(sort?.value)}
                {relations.map(i => {
                    let entities = relatedModels.GetByRelation(i);
                    if (typeFilter.length) {
                        entities = entities.GetByTypes(typeFilter.map(t => t.value));
                    }
                    return entities.Size() ? (<ExpandableSection key={[i, sort?.vlaue]} label={RelatedContentDataModel.LocalizeRelation(i)}>
                        <RelatedGrid related={entities} />
                    </ExpandableSection>) : undefined;
                })}</>
                : 'There is currently no related content available.'}
        </main>
    );
};

export const getProps = async (ctx, client) => {
    const id = ctx.query.id.replace(".", "/");
    const data = await ExecuteQuery(client, PrepareQuery({ id: id }, GetRelated()));

    const highlighted = ["ADAPTATION", "BASE", "PREQUEL", "SEQUEL"];
    return {
        related: data.relations || [],
        highlighted: highlighted,
    };
};

export default RelatedPage;