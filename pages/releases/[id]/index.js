import React from 'react';

import GetContentSummary from '@/queries/GetContentSummary';

import DetailsCard from '@/components/DetailsCard';
import SummaryText from '@/components/Summary/SummaryText';
import SummaryCharacter from '@/components/Summary/SummaryCharacter';
import RelatedGrid from '@/components/Related/RelatedGrid';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { PremiereAny, ByContent } from '@/utilities/Premiere';
import * as stat from '@/utilities/ContentStatus';
import * as restriction from '@/utilities/Restriction';
import { Type } from '@/utilities/MediaType';
import { ExecuteQueryBatch, PrepareKeyQuery } from '@/utilities/Query';
import { AgeRating } from '@/utilities/AgeRating';
import { Censorship } from '@/utilities/Censorship';
import { FromAlpha2 } from '@/utilities/Nationality';

import withContainer, { withContainerProps } from '@/components/Container';
import { GameReleaseType } from '@/utilities/GameReleaseType';
import { GameVoice } from '@/utilities/GameVoice';
import { GameAnimation } from '@/utilities/GameAnimation';

const ReleasePage = ({
    description,
    characters,
    details,
    releaseOf,
}) => {
    return (
        <div className="grid">
            <main className="landing__description">
                <SummaryText text={description} />
                <section className="landing-section-box">
                    <header>
                        <h3>Contents</h3>
                    </header>
                    <div className="related grid-halves">
                        <RelatedGrid related={releaseOf} />
                    </div>
                </section>
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
        PrepareKeyQuery("info", { id: id }, GetContentSummary(type)),
    ];
    const { info } = await ExecuteQueryBatch(client, queries);

    const releaseOf = (info.contents || []).map(i => {
        const { id, __typename, status, runnings, descriptions, releaseDate, images, names, ageRatings } = i;
        if (names.length === 0) {
            return;
        }
        return {
            id: id,
            type: __typename,
            name: locale.EnglishAny(names),
            description: locale.EnglishAny(descriptions),
            image: image.ProfileAny(images, ageRatings),
            media: Type(__typename),
            releaseDate: ByContent(__typename, releaseDate, runnings),
            status: stat.Status(status),
        };
    });

    const crossrefs = (info.crossrefs || []).map(i => {
        const m = {
            "vndb-org": "VNDB",
            "anidb-net": "AniDB",
            "animenewsnetwork-com": "Anime News Network",
            "mangaupdates-com": "Baka-Updates Manga",
            "myanimelist-net": "My Anime List",
            "doujinshi-org": "The Doujinshi & Manga Lexicon",
        }
        return {
            text: m[i.namespace],
            href: i.website?.formattedAddress,
            external: true,
        }
    });

    return {
        description: locale.English(info.descriptions),
        releaseOf: releaseOf,
        details: [
            [
                { key: 'English', value: locale.English(info.names) },
                { key: 'Japanese', value: locale.Japanese(info.names) },
                { key: 'Romaji', value: locale.Romaji(info.names) },
            ],
            [
                { key: 'Languages', value: FromAlpha2(info.languages.map(l => l.alpha2)).map(a => { return { text: a.name } }) },
                { key: 'Official Release', value: info.isDoujinshi ? "No" : "Yes" },
                { key: 'Freeware', value: info.isFree ? "Yes" : "No" },
                { key: 'Game Release Type', value: GameReleaseType(info.type).name },
                { key: 'Released', value: PremiereAny(info.releaseDate, info.runnings) },
                { key: 'Age Rating', value: AgeRating(info.ageRatings, ['USA']), flag: 'us' },
                { key: 'Restriction', value: restriction.Restrictions(info.restrictions).map(r => { return { text: r }; }) },
                { key: 'Censorship', value: Censorship(info.censorship).name },
            ],
            [
                { key: 'Voiced', value: GameVoice(info.voicedDegree).name },
                { key: 'Animation', value: GameAnimation(info.animationStoryDegree).name },
                { key: 'Animation Erotic Scenes', value: GameAnimation(info.animationEroDegree).name },
            ],
            [
                { key: 'Resolution', value: info.widthResolution && info.heightResolution ? `${info.widthResolution}x${info.heightResolution}` : undefined },
                { key: 'Patchable Release', value: info.isPatch ? "Yes" : "No" },
                { key: 'Engine', value: info.engine },
            ],
            [
                { key: 'EAN10', value: info.ean10 },
                { key: 'EAN13', value: info.ean13 ? info.ean13 : undefined },
                { key: 'SKU', value: info.sku },
                { key: 'UPCE', value: info.upce },
                { key: 'UPCA', value: info.upca },
            ],
            crossrefs ? [{ key: 'Source', value: crossrefs }] : null,
        ]
    };
};

export default withContainer(ReleasePage);
export const getServerSideProps = withContainerProps(getProps);