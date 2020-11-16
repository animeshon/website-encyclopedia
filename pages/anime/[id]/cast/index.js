import { useState } from 'react';
import Link from 'next/link';
import uniq from 'lodash/uniq';
import kebabCase from 'lodash/kebabCase';
import capitalize from 'lodash/capitalize';

import { undef } from '@/functions/undef';
import { localizer } from '@/functions/localizer';
import { langPickerSwitcher } from '@/functions/langPickerSwitcher';

import getAnimeCast from '@/queries/anime/Cast';

import AnyWrapper from '@/components/_AnyWrapper';
import Button from '@/components/Button';
import CardImage from '@/components/Card/Image';

import { AnimeNavigation } from '@/resources/navigation/allTabNavigations';

const AnimeCast = ({
    anime_id,
    title,
    bannerImage,
    profileImage,
    cast_full_list,
    list_of_flags,
}) => {
    const [productionLang, setProductionLang] = useState('jpn');

    const changeProductionLang = e => {
        setProductionLang(e.currentTarget.value);
    };
    const final_list = langPickerSwitcher(
        uniq(list_of_flags.filter(i => i != '')),
    ).sort();

    return (
        <AnyWrapper
            id={anime_id}
            title={title}
            bannerImage={bannerImage}
            profileImage={profileImage}
            bannerImageAltText={`${title} Cover`}
            profileImageAltText={`${title} Hero`}
            anyNav={AnimeNavigation}
            selectedMenu="Cast"
        >
            <main className="anime-cast__description grid">
                <section className="landing-section-box">
                    <header>
                        <h3>Cast</h3>
                        {final_list.length !== 0 && (
                            <select default onChange={changeProductionLang}>
                                {final_list.map(obj => {
                                    const { iso, extended } = obj;
                                    return (
                                        <option
                                            key={iso}
                                            value={iso}
                                            selected={iso == productionLang}
                                        >
                                            {extended}
                                        </option>
                                    );
                                })}
                            </select>
                        )}
                    </header>
                    <div className="grid-halves">
                        {renderCast(cast_full_list, productionLang)}
                    </div>
                </section>
            </main>
        </AnyWrapper>
    );
};

const renderCast = (items, filter) => {
    const linkTo = '/people/';
    return items.map(item => {
        const linkProps = {
            href: `${linkTo}[people_id]`,
            as: `${linkTo}${item.id + '_' + kebabCase(item.name)}`,
        };

        if (item.nationality.iso == filter) {
            return (
                <div key={item.id} className="card">
                    <Link {...linkProps}>
                        <a>
                            <CardImage
                                type={item.type}
                                sex={item.sex}
                                picture={item.profile_picture}
                                altText={item.name}
                            />
                        </a>
                    </Link>
                    <div className="card__info">
                        <Link {...linkProps}>
                            <a>
                                <h4>{item.name}</h4>
                            </a>
                        </Link>
                        <p className="card__jap-name">{item.japanese_name}</p>
                        <p className="card__role">
                            <span
                                className={`fp fp-sm custom-fp ${item.nationality.iso}`}
                            />
                            {/* {capitalize(item.sex)} TODO: skipped cause is not consistent */}
                        </p>
                        <Button
                            className="cherry-red medium character-button-ref"
                            type="next-link"
                            href={`/characters/[character_id]`}
                            as={`/characters/${
                                item.character.id +
                                '_' +
                                kebabCase(item.character.name)
                            }`}
                        >
                            <span className="character-image">
                                <img
                                    src={item.character.picture}
                                    alt={item.character.name}
                                />
                            </span>
                            <span className="character-name">
                                {item.character.name}
                            </span>
                        </Button>
                    </div>
                </div>
            );
        }
    });
};

AnimeCast.getInitialProps = async ctx => {
    const { anime_id } = ctx.query;
    const client = ctx.apolloClient;

    const raw_id = anime_id.substring(0, 12);

    const res = await client.query({
        query: getAnimeCast(raw_id),
    });

    const data = res.data.queryAnime[0];

    const titles = data ? data.names : []; // returns an array
    const cast = data ? data.voiceActings : []; // returns an array
    const bannerImage = data ? data.images[0].image.files[0].publicUri : ''; // returns a string

    const profileImage = ''; // TODO: Banner image not present
    const title = undef(localizer(titles, ['eng'], ['Latn'])); // returns a string

    const list_of_flags = [];

    const cast_full_list = cast.map(member => {
        const { actor, voiced, localization } = member;

        const actor_id = actor.id;
        const actor_name = undef(localizer(actor.names, null, ['Latn']), '');
        const actor_japanese_name = undef(
            localizer(actor.names, ['jpn'], ['Jpan']),
            '',
        );
        const actor_pic = actor.images[0]
            ? actor.images[0].image.files[0].publicUri
            : '';

        const character_id = voiced.id;
        const character_pic = voiced.images[0]
            ? voiced.images[0].image.files[0].publicUri
            : '';
        const character_name = undef(localizer(voiced.names, null, ['Latn']), '');

        list_of_flags.push(localization.language.code);

        return {
            name: actor_name,
            japanese_name: actor_japanese_name,
            character: {
                name: character_name,
                picture: character_pic,
                id: character_id,
            },
            // sex: '', TODO: skipped coause is not consistent
            nationality: {
                extended: actor_japanese_name ? 'japan' : '',
                iso: localization.language.code,
            },
            type: 'people',
            person_profession: 'voice-actor',
            profile_picture: actor_pic,
            id: actor_id,
        };
    });

    // TODO: Voice Actors filters based on nationality is impossible to be integrated cause no nationality filter is present
    // TODO: Voice Actors fallback images based on sex are not settable cause of not consistent gender field

    return {
        anime_id,
        title,
        bannerImage,
        profileImage,
        cast_full_list,
        list_of_flags,
    };
};

export default AnimeCast;
