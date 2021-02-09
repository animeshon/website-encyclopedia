import React from 'react';

import getSummary from '@/queries/person/Summary';
import ContainerQuery from '@/queries/container/Container';

import DetailsCard from '@/components/DetailsCard';
import SummaryVoiceActings from '@/components/Summary/SummaryVoiceActings';
import withContainer, { withContainerProps } from '@/components/Container';
import SummaryText from '@/components/Summary/SummaryText';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as time from '@/utilities/Time';
import * as blood from '@/utilities/BloodType';
import * as gender from '@/utilities/Gender';
import * as uri from '@/utilities/URI';
import { Type } from '@/utilities/MediaType';
import { ExecuteQueryBatch, PrepareKeyQuery, PrepareQuery, ExecuteQueries } from '@/utilities/Query';
import { AgeRating } from '@/utilities/AgeRating';
import { Length } from '@/utilities/VisualNovelLength';

const PersonPage = ({
    description,
    details,
    voiceActings,
}) => {
    return (
        <div className="grid">
            <main className="landing__description">
                <SummaryText text={description} />
                <SummaryVoiceActings characters={voiceActings} />
            </main>
            <aside className="landing__details">
                <header>
                    <h3>Details</h3>
                </header>
                <DetailsCard items={details} />
            </aside>
        </div>
    );
};

export const getProps = async (ctx, client, type) => {
    const { id } = ctx.query;

    const queries = [
        PrepareKeyQuery("info", { id: id }, getSummary()),
    ];
    const { info } = await ExecuteQueryBatch(client, queries);

    // prune double characters
    let characters = [];
    (info.voiceActings || []).forEach(i => {
        const { isPrimary, voiced: { id, appearances } } = i;
        if (!isPrimary) {
            return;
        }
        let char = characters.filter(i => i.id === id);
        if (char.length && !char[0].main) {
            char[0].main = appearances.length > 0;
        } else if (!char.length) {
            characters.push({
                id: id,
                main: appearances.length > 0
            })
        }
    });

    // Get voice actings of primary characters
    characters = characters.filter(c => c.main)
        .concat(characters.filter(c => !c.main))
        .slice(0, 5);

    // enqueue graphql query to get details
    const charQueries = characters.map(x => {
        return PrepareQuery({ id: x.id }, ContainerQuery());
    });
    // wait
    const chars = await ExecuteQueries(client, charQueries);
    const voiceActings = (chars || []).map(i => {
        const { id, images, names } = i;
        return {
            id,
            name: locale.LatinAny(names),
            image: image.ProfileAny(images),
        };
    });

    return {
        description: locale.English(info.descriptions),
        voiceActings: voiceActings,
        details: [
            [
                { key: 'English', value: locale.English(info.names) },
                { key: 'Japanese', value: locale.Japanese(info.names) },
                { key: 'Romaji', value: locale.Romaji(info.names) },
            ],
            [
                { key: 'Birthday', value: time.EnglishDate(info.birthday) },
                // TODO hometown
                // TODO birthplace
                { key: 'Gender', value: gender.Gender(info.gender) },
                { key: 'Blood Type', value: blood.BloodType(info.bloodType) },
            ]
        ]
    };
};

export default withContainer(PersonPage);
export const getServerSideProps = withContainerProps(getProps);