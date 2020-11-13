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
    cover_image,
    hero_image,
    description,
    characters,
    anime_details,
    canonicals,
}) => {
    const { language } = useContext(LanguageContext);

    return (
        <AnyWrapper
            anyId={anime_id}
            anyTitle={title}
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={`${title} Cover`}
            heroImageAltText={`${title} Hero`}
            anyNav={AnimeNavigation}
            selectedMenu="Summary"
        >
            <main className="landing__description">
                {/*  */}
                <section className="landing-section-box">
                    <header>
                        <h3>Description</h3>
                    </header>
                    <p className="text_description">{description ? parse(description) : ''}</p>
                </section>
                {/* Characters */}
                {characters && characters.length > 0 && (
                    <section className="landing-section-box">
                        <header>
                            <h3>Characters</h3>
                            <span />
                            {characters.length > 3 && (
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
                            {canonicals.length > 3 && (
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
               
                {/*  */}
            </main>
            <aside className="landing__details">
                <header>
                    <h3>Details</h3>
                </header>
                <AnimeDetailsBox obj={anime_details} />
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
    const data = await withQuery(ctx, getAnimeSummary, function (data) { return data.queryAnime[0]; });

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
        cover_image:    withProfileImageAny(data.images),
        hero_image:     withCoverImage(data.images),
        characters:     characters,
        canonicals:     undefined, // TODO: data.partOfCanonicals
        anime_details: {
            english_title:      withEnglishLocale(data.names),
            japanese_title:     withJapaneseLocale(data.names),
            romaji_title:       withRomajiLocale(data.names),
            media:              data.type,
            episodes_number:    data.episodes.length,
            status:             data.status.toLowerCase(),
            season:             withJapaneseSeasonAny(data.runnings),
            age_rating:         withAgeRating(data.ageRatings, ['USA']),
            genres,
            universe,
        },
    };
};

export default Anime;
