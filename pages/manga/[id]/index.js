import Link from 'next/link';
import parse from 'html-react-parser';
import { kebabCase, replace } from 'lodash';

import { MangaNavigation } from '@/resources/navigation/allTabNavigations';

import AnyWrapper from '@/components/_AnyWrapper';
import { MangaDetailsBox } from '@/components/_MangaDetailsBox';

import getMangaSummary from '@/queries/manga/Summary';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ExecuteQuery } from '@/utilities/Query';
import { AgeRating } from '@/utilities/AgeRating';

import * as uri from '@/utilities/URI';

const renderCharacters = items => {
    return items.map(item => (
        <li key={item.id}>
            <Link href={uri.Rewrite('Character', item.name, item.id)}>
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
            <Link href={uri.Rewrite('Canonical', item.name, item.id)}>
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

const Manga = ({
    manga_id,
    title,
    bannerImage,
    profileImage,
    bannerImageAltText,
    profileImageAltText,
    description,
    characters,
    details,
    canonicals,
}) => {
    return (
        <AnyWrapper
            id={manga_id}
            bannerImage={bannerImage}
            profileImage={profileImage}
            bannerImageAltText={bannerImageAltText}
            profileImageAltText={profileImageAltText}
            anyNav={MangaNavigation}
            title={title}
            selectedMenu="Summary"
        >
            <main className="landing__description">
                {/*  */}
                <section className="landing-section-box">
                    <header>
                        <h3>Description</h3>
                    </header>
                    <p>{description ? parse(description) : 'There is currently no description available.'}</p>
                </section>
                {/* Characters */}
                <section className="landing-section-box">
                    <header>
                        <h3>Characters</h3>
                        <span />
                        {characters.length > 3 && (
                            <Link href={uri.Rewrite('Manga', item.name, item.id, 'characters')}>
                                <a className="view-all-link">View all</a>
                            </Link>
                        )}
                    </header>
                    <ul className="characters-list">
                        {renderCharacters(characters)}
                    </ul>
                </section>
                {/* Manga Timeline */}
                {/* <section className="landing-section-box">
                    <header>
                        <h3>Manga Timeline</h3>
                        <span />
                    </header>
                </section> */}
                {/* Adaptations */}
                {canonicals && canonicals.length > 0 && (
                    <section className="landing-section-box">
                        <header>
                            <h3>Canonical Franchise</h3>
                            <span />
                            {canonicals.length > 1 && (
                                <Link href={uri.Rewrite('Canonical', item.name, item.id, item.type)}>
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
                <MangaDetailsBox obj={details} pageType="manga-landing" />
            </aside>
        </AnyWrapper>
    );
};

Manga.getInitialProps = async ctx => {
    const { manga_id } = ctx.query;
    const data = await ExecuteQuery(ctx, manga_id, getMangaSummary, function (data) { return data.queryManga[0]; });

    const characters = (data.starring || []).map(i => {
        const { id, images, names } = i.character;
        return {
            id,
            name: locale.LatinAny(names),
            image: image.ProfileAny(images),
        };
    });

    const genres = (data.genres || []).map(genre => {
        return genre.names[0].text;
    });

    const universe = data.partOfCanonicals?.partOfUniverses ? {
        id: data.partOfCanonicals.partOfUniverses.id,
        name: locale.EnglishAny(data.partOfCanonicals.partOfUniverses.names),
    } : undefined;

    return {
        manga_id:       data.id,
        title:          locale.EnglishAny(data.names),
        description:    locale.English(data.descriptions),
        bannerImage:    image.ProfileAny(data.images),
        profileImage:   image.Cover(data.images),
        characters:     characters,
        canonicals:     undefined, // TODO: data.partOfCanonicals
        details: {
            englishTitle:       locale.English(data.names),
            japaneseTitle:      locale.Japanese(data.names),
            romajiTitle:        locale.Romaji(data.names),
            media:              data.type,
            chapterCount:       data.chapters?.length,
            volumeCount:        data.volumes?.length,
            status:             data.status?.toLowerCase(),
            date_start:         undefined, // TODO
            date_end:           undefined, // TODO
            ageRating:          AgeRating(data.ageRatings, ['USA']),
            genres,
            universe,
        },
        bannerImageAltText:     '', // TODO
        profileImageAltText:    '', // TODO
    };
};

export default Manga;
