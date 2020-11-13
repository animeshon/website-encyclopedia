import { useContext } from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import replace from 'lodash/replace';
import kebabCase from 'lodash/kebabCase';

import { LanguageContext } from '@/ctx/languages';

import getAnimeSummary from '@/queries/anime/Summary';

import AnyWrapper from '@/components/_AnyWrapper';
import { AnimeDetailsBox } from '@/components/_AnimeDetailsBox';

import { AnimeNavigation } from '@/resources/navigation/allTabNavigations';
import { withEnglishLocaleAny, withEnglishLocale, withRomajiLocale, withJapaneseLocale, withLatinLocaleAny } from 'utilities/Localization';
import { withQuery } from 'utilities/Query';
import { withProfileImageAny, withCoverImage } from 'utilities/Image';
import { withAgeRating } from 'utilities/AgeRating';
import { withJapaneseSeasonAny } from 'utilities/Season';

const Anime = ({
    anime_id,
    title,
    bannerImage,
    profileImage,
    description,
    characters,
    details,
    canonicals,
}) => {
    const { language } = useContext(LanguageContext);

    return (
        <AnyWrapper
            anyId={anime_id}
            anyTitle={title}
            bannerImage={bannerImage}
            profileImage={profileImage}
            bannerImageAltText={title}
            profileImageAltText={title}
            anyNav={AnimeNavigation}
            selectedMenu="Summary"
        >
            <main className="landing__description">
                <section className="landing-section-box">
                    <header>
                        <h3>Description</h3>
                    </header>
                    <p className="text_description">{description ? parse(description) : 'There is currently no description available.'}</p>
                </section>
                
                {characters && characters.length > 0 && (
                    <section className="landing-section-box">
                        <header>
                            <h3>Characters</h3>
                            <span />
                            {characters.length > 1 && (
                                <Link
                                    href="/anime/[anime_id]/characters"
                                    as={`/anime/${anime_id}/characters`}
                                >
                                    <a className="view-all-link">View all</a>
                                </Link>
                            )}
                        </header>
                        <ul className="characters-list">
                            {renderCharacters(characters)}
                        </ul>
                    </section>
                )}

                {/* Anime Timeline 
                <section className="landing-section-box">
                    <header>
                        <h3>Anime Timeline</h3>
                        <span />
                    </header>
                </section>
                */}
                
                {canonicals && canonicals.length > 0 && (
                    <section className="landing-section-box">
                        <header>
                            <h3>Canonical Franchise</h3>
                            <span />
                            {canonicals.length > 1 && (
                                <Link href="" as="">
                                    <a className="view-all-link">View all</a>
                                </Link>
                            )}
                        </header>
                        <ul className="adaptations-list">
                            {renderCanonicals(canonicals)}
                        </ul>
                    </section>
                )}
            </main>
            <aside className="landing__details">
                <header>
                    <h3>Details</h3>
                </header>
                <AnimeDetailsBox obj={details} />
            </aside>
        </AnyWrapper>
    );
};

const renderCharacters = items => {
    return items.map(item => (
        <li key={item.id}>
            <Link
                href="/characters/[character_id]"
                as={`/characters/${item.id}_${kebabCase(`${item.name}`)}`}
            >
                <a>
                    <div className="cover">
                        <img src={item.image} />
                    </div>
                    <span>{item.name}</span>
                </a>
            </Link>
        </li>
    ));
};

const renderCanonicals = items => {
    return items.map(item => (
        <li key={item.id}>
            <Link
                href={`/${item.type}/[${item.type}_id]`}
                as={`/${item.type}/${item.id}_${kebabCase(item.product_name)}`}
            >
                <a>
                    <div className="cover">
                        <img src={item.cover_url} />
                    </div>
                    <span>{replace(item.type, '-', ' ')}</span>
                </a>
            </Link>
        </li>
    ));
};

Anime.getInitialProps = async ctx => {
    const { anime_id } = ctx.query;
    const data = await withQuery(ctx, anime_id, getAnimeSummary, function (data) { return data.queryAnime[0]; });

    const characters = (data.starring || []).map(i => {
        const { id, images, names } = i.character;
        return {
            id,
            name: withLatinLocaleAny(names),
            image: withProfileImageAny(images),
        };
    });

    const genres = (data.genres || []).map(genre => {
        return genre.names[0].text;
    });

    const universe = data.partOfCanonicals?.partOfUniverses ? {
        id: data.partOfCanonicals.partOfUniverses.id,
        name: withEnglishLocaleAny(data.partOfCanonicals.partOfUniverses.names),
    } : undefined;

    return {
        anime_id:       data.id,
        title:          withEnglishLocaleAny(data.names),
        description:    withEnglishLocale(data.descriptions),
        bannerImage:    withProfileImageAny(data.images),
        profileImage:   withCoverImage(data.images),
        characters:     characters,
        canonicals:     undefined, // TODO: data.partOfCanonicals
        details: {
            englishTitle:       withEnglishLocale(data.names),
            japaneseTitle:      withJapaneseLocale(data.names),
            romajiTitle:        withRomajiLocale(data.names),
            media:              data.type,
            episodeCount:       data.episodes?.length,
            status:             data.status?.toLowerCase(),
            season:             withJapaneseSeasonAny(data.runnings),
            ageRating:          withAgeRating(data.ageRatings, ['USA']),
            genres,
            universe,
        },
    };
};

export default Anime;
