import React from 'react';

import { GetTypedStaff } from '@/queries/GetStaff';
import GetContentSummary from '@/queries/GetContentSummary';
import GetRelated from '@/queries/GetRelated';

import DetailsCard from '@/components/DetailsCard';
import SummaryText from '@/components/Summary/SummaryText';
import SummaryCharacter from '@/components/Summary/SummaryCharacter';
// import SummaryTimeline from '@/components/Summary/SummaryTimeline';
import SummaryCanonical from '@/components/Summary/SummaryCanonical';
import SummaryRelated from '@/components/Summary/SummaryRelated';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ByContent } from '@/utilities/Premiere';
import * as stat from '@/utilities/ContentStatus';
import * as contentRelation from '@/utilities/ContentRelation';
import * as uri from '@/utilities/URI';
import * as roles from '@/utilities/TypedRole';
import * as restriction from '@/utilities/Restriction';
import { Type } from '@/utilities/MediaType';
import { ExecuteQueryBatch, PrepareKeyQuery, PrepareQuery, ExecuteQueries } from '@/utilities/Query';
import { AgeRating } from '@/utilities/AgeRating';
import { Length } from '@/utilities/VisualNovelLength';
import { DeleteUndefined } from '@/root/lib/server-side';

const ContentPage = ({
    description,
    characters,
    details,
    canonicals,
    related,
}) => {
    return (
        <div className="grid">
            <main className="landing__description">
                <SummaryText text={description} />
                <SummaryCharacter characters={characters} />
                <SummaryRelated related={related} />
                {/* <SummaryTimeline /> */}
                {canonicals && <SummaryCanonical canonicals={canonicals} />}
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
        PrepareKeyQuery("related", { id: id }, GetRelated()),
        PrepareKeyQuery("typedRoles", { id: id, collaborator: true, content: false }, GetTypedStaff(type)),
    ];
    const { info, related, typedRoles } = await ExecuteQueryBatch(client, queries);

    // build proper collaboration map
    const MapStaff = (staff) => {
        let mapStaff = {};
        staff.forEach(v => {
            if (!v.role.type || ![
                "ART_DIRECTION",
                "AUTHOR",
                "DIRECTION",
                "GAME_DEVELOPMENT",
                "MUSIC_COMPOSITION",
                "PRODUCTION",
                "STORY",
                "ILLUSTRATION",
                "STUDIO",
                "VOCALIST"].includes(v.role.type)) {
                return;
            }

            if (!mapStaff.hasOwnProperty(v.role.id)) {
                mapStaff[v.role.id] = {
                    role: v.role,
                    staff: [],
                };
            }
            mapStaff[v.role.id].staff.push(v.collaborator);
        });

        const arrayStaff = Object.keys(mapStaff).map(s => {
            return {
                key: roles.Role(mapStaff[s].role.type),
                value: mapStaff[s].staff.map(collaborator => {
                    return {
                        text: locale.EnglishAny(collaborator.names),
                        href: uri.Rewrite(collaborator.__typename, locale.EnglishAny(collaborator.names), collaborator.id),
                    }
                })
            }
        })

        return arrayStaff;
    }

    const collaborations = MapStaff(typedRoles.staff || []);

    const characters = (info.starring || []).map(i => {
        const { id, images, names } = i.character;
        return {
            id,
            name: locale.LatinAny(names),
            image: image.ProfileAny(images),
        };
    });

    const genres = (info.genres || []).map(genre => {
        return { text: locale.EnglishAny(genre.names) };
    });

    const universes = (info.partOfUniverses || []).map(universe => {
        return {
            href: uri.Rewrite('Universe', locale.EnglishAny(universe.names), universe.id),
            text: locale.EnglishAny(universe.names),
        }
    });

    const canonicals = (info.partOfCanonicals || []).map(canon => {
        const { id, __typename, images, names, ageRatings } = canon;
        return {
            id: id,
            type: __typename,
            name: locale.EnglishAny(names),
            image: image.ProfileAny(images, ageRatings),
        }
    });

    const relatedContent = (related.relations || []).map(i => {
        const { id, __typename, status, runnings, images, names, ageRatings, releaseDate } = i.object;
        if (names.length === 0) {
            return;
        }
        return {
            id: id,
            type: __typename,
            name: locale.EnglishAny(names),
            image: image.ProfileAny(images, ageRatings),
            media: Type(__typename),
            releaseDate: ByContent(__typename, releaseDate, runnings),
            status: stat.Status(status),
            relation: contentRelation.Type(i.type),
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

    const premiere = ByContent(info.__typename, info.releaseDate, info.runnings);

    return {
        description: locale.English(info.descriptions),
        characters: characters,
        canonicals: canonicals,
        related: relatedContent,
        details: [
            [
                { key: 'English', value: locale.English(info.names) },
                { key: 'Japanese', value: locale.Japanese(info.names) },
                { key: 'Romaji', value: locale.Romaji(info.names) },
            ],
            [
                { key: 'Media', value: info.type },
                { key: 'Chapters', value: info.chapters?.length },
                { key: 'Volumes', value: info.volumes?.length },
                { key: 'Episodes', value: info.episodes?.length },
                { key: 'Status', value: stat.Status(info.status) },
                { key: 'Season', value: premiere.season ? premiere.premiere : undefined },
                { key: 'Released', value: !premiere.season ? premiere.premiere : undefined },
                { key: 'Length', value: Length(info.length) },
                { key: 'Age Rating', value: AgeRating(info.ageRatings, ['USA']), flag: 'us' },
                { key: 'Restriction', value: restriction.Restrictions(info.restrictions).map(r => { return { text: r }; }) },
            ],
            [
                { key: 'Genres', value: genres },
                { key: 'Universes', value: universes },
            ],
            collaborations,
            crossrefs ? [{ key: 'Source', value: crossrefs }] : null,
        ]
    };
};

export default ContentPage;
