import Link from 'next/link';
import { kebabCase, capitalize } from 'lodash';

import { PeopleNavigation } from '@/resources/navigation/allTabNavigations';

import AnyWrapper from '@/components/_AnyWrapper';
import Button from '@/components/Button';
import CardImage from '@/components/Card/Image';

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
                            altText={`${item.fname} ${item.lname}`}
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
                        href={`${linkTo}[company_id]`}
                        as={`${linkTo}${item.id}_${kebabCase(
                            item.company_name,
                        )}`}
                        type="next-link"
                    >
                        More
                    </Button>
                </div>
            </div>
        );
    });
};

const AnimeCompanies = ({
    people_id,
    main_title,
    cover_image,
    hero_image,
    cover_image_alt_text,
    hero_image_alt_text,
    companies_full_list,
}) => {
    return (
        <AnyWrapper
            anyId={people_id}
            anyTitle={main_title}
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={cover_image_alt_text}
            heroImageAltText={hero_image_alt_text}
            anyNav={PeopleNavigation}
            selectedMenu="Organizations"
        >
            <main className="anime-characters__description grid">
                <section className="landing-section-box">
                    <header>
                        <h3>Organizations</h3>
                    </header>
                    <div className="grid-halves">
                        {renderCompanies(companies_full_list)}
                    </div>
                </section>
            </main>
        </AnyWrapper>
    );
};

AnimeCompanies.getInitialProps = async ctx => {
    const { people_id } = ctx.query;
    const hero_image =
        'http://i1.wp.com/fapservice.com/wp-content/uploads/2016/08/HorribleSubs-Fate-Kaleid-Liner-PRISMA-ILLYA-3rei-01-720p.mkv_snapshot_11.51_2016.07.06_15.34.51_stitch.jpg';
    const cover_image =
        'https://www.nautiljon.com/images/people/00/27/oonuma_shin_19372.jpg?1516112465';
    const main_title = 'Oonuma Shin';
    const cover_image_alt_text = 'Oonuma Shin';
    const hero_image_alt_text = 'Oonuma Shin Hero';

    const companies_full_list = [
        {
            company_name: 'Type Moon',
            company_japanese_name: 'TYPE-MOON',
            company_nation: {
                extended: 'japan',
                iso: 'jp',
            },
            type: 'organization',
            company_pic: '',
            id: '8WZqW4hZMSmiucnKrTdai5',
        },
    ];

    return {
        people_id,
        main_title,
        cover_image,
        hero_image,
        cover_image_alt_text,
        hero_image_alt_text,
        companies_full_list,
    };
};

export default AnimeCompanies;
