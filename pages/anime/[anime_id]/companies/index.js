import Link from 'next/link';
import capitalize from 'lodash/capitalize';
import kebabCase from 'lodash/kebabCase';

import { undef } from '@/functions/undef';
import { localizer } from '@/functions/localizer';

import getAnimeOrganizations from '@/queries/anime/Organizations';

import AnyWrapper from '@/components/_AnyWrapper';
import Button from '@/components/Button';
import CardImage from '@/components/Card/Image';

import { AnimeNavigation } from '@/resources/navigation/allTabNavigations';

const AnimeCompanies = ({
    anime_id,
    title,
    cover_image,
    hero_image,
    companies_full_list,
}) => {
    return (
        <AnyWrapper
            anyId={anime_id}
            anyTitle={title}
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={`${title} Cover`}
            heroImageAltText={`${title} Hero`}
            anyNav={AnimeNavigation}
            selectedMenu="Companies"
        >
            <main className="anime-characters__description grid">
                <section className="landing-section-box">
                    <header>
                        <h3>Companies</h3>
                    </header>
                    <div className="grid-halves">
                        {renderCompanies(companies_full_list)}
                    </div>
                </section>
            </main>
        </AnyWrapper>
    );
};

const renderCompanies = items => {
    const linkTo = '/companies/';
    return items.map(item => {
        const linkProps = {
            href: `${linkTo}[company_id]`,
            as: `${linkTo}${item.id + '_' + kebabCase(item.company_name)}`,
        };
        return (
            <div key={item.id} className="card">
                <Link {...linkProps}>
                    <a>
                        <CardImage
                            type={item.type}
                            picture={item.company_pic}
                            altText={`${item.company_name}`}
                        />
                    </a>
                </Link>
                <div className="card__info">
                    <Link {...linkProps}>
                        <a>
                            <h4>{item.company_name}</h4>
                        </a>
                    </Link>
                    <p className="card__jap-name">
                        {item.company_japanese_name}
                    </p>
                    <p className="card__role">
                        <span
                            className={`fp fp-sm custom-fp ${item.company_nation.iso}`}
                        />
                        {capitalize(item.type)}
                    </p>
                    <Button
                        className="cherry-red medium"
                        {...linkProps}
                        type="next-link"
                    >
                        More
                    </Button>
                </div>
            </div>
        );
    });
};

AnimeCompanies.getInitialProps = async ctx => {
    const { anime_id } = ctx.query;
    const client = ctx.apolloClient;

    const raw_id = anime_id.substring(0, 12);

    const res = await client.query({
        query: getAnimeOrganizations(raw_id),
    });

    const data = res.data.queryAnime[0];

    const titles = data ? data.names : []; // returns an array
    const cover_image = data ? data.images[0].image.files[0].publicUri : ''; // returns a string
    const staff = data ? data.staff : [];

    const companies_full_list = staff
        .map(item => {
            const {
                localization,
                collaborator: { __typename, id, images, names },
                role,
            } = item;

            if (__typename == 'Organization') {
                var company_name = undef(localizer(names, ['eng'], ['Latn']), '');
                if (company_name == '') {
                    company_name = undef(localizer(names, null, ['Latn']), '');
                }

                const company_japanese_name = undef(
                    localizer(names, ['jpn'], ['Jpan']),
                    '',
                );

                const iso = localization.country.alpha2.toLowerCase();

                return {
                    company_name,
                    company_japanese_name,
                    company_nation: {
                        iso,
                    },
                    type: role.names[0].text,
                    company_pic: images[0]
                        ? images[0].image.files[0].publicUri
                        : '',
                    id,
                };
            }
        })
        .filter(i => i !== undefined);

    const title = undef(localizer(titles, ['eng'], ['Latn'])); // returns a string

    const hero_image = ''; // : Banner image not present

    return {
        anime_id,
        title,
        cover_image,
        hero_image,
        companies_full_list,
    };
};

export default AnimeCompanies;
