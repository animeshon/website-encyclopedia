import Link from 'next/link';
import { kebabCase, capitalize } from 'lodash';

import AnyWrapper from '../../../AnyWrapper';
import { AnimeNavigation } from '../../../../resources/navigation/allTabNavigations';

import Button from '../../../../components/Button';

import CardImage from '../../../../components/Card/Image';

const renderCompanies = items => {
    return items.map(item => {
        const linkProps = {
            href: '/companies/[company_id]',
            as: `/companies/${item.id + '_' + kebabCase(item.company_name)}`,
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
                        href="/companies/[company_id]"
                        as={`/companies/${item.id}_${kebabCase(
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
    anime_id,
    cover_image,
    hero_image,
    cover_image_alt_text,
    hero_image_alt_text,
    companies_full_list,
}) => {
    return (
        <AnyWrapper
            anyId={anime_id}
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={cover_image_alt_text}
            heroImageAltText={hero_image_alt_text}
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

AnimeCompanies.getInitialProps = async ctx => {
    const { anime_id } = ctx.query;
    const hero_image =
        'https://www.ricedigital.co.uk/wp-content/uploads/2016/01/Fatekaleid04D.jpgoriginal.jpg';
    const cover_image =
        'https://i2.wp.com/www.otakutale.com/wp-content/uploads/2017/10/Fate-kaleid-liner-Prisma-Illya-2017-Sequel-Anime-Visual.jpg';
    const cover_image_alt_text = 'Fate Kaleid Prisma Ilya Cover';
    const hero_image_alt_text = 'Fate Kaleid Prisma Ilya Hero';
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
        anime_id,
        cover_image,
        hero_image,
        cover_image_alt_text,
        hero_image_alt_text,
        companies_full_list,
    };
};

export default AnimeCompanies;
