import Link from 'next/link';
import { kebabCase, capitalize } from 'lodash';

import { MangaNavigation } from '@/resources/navigation/allTabNavigations';

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
    manga_id,
    title,
    bannerImage,
    profileImage,
    bannerImageAltText,
    profileImageAltText,
    companies_full_list,
}) => {
    return (
        <AnyWrapper
            anyId={manga_id}
            anyTitle={title}
            bannerImage={bannerImage}
            profileImage={profileImage}
            bannerImageAltText={bannerImageAltText}
            profileImageAltText={profileImageAltText}
            anyNav={MangaNavigation}
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
    const { manga_id } = ctx.query;
    const profileImage =
        'https://dw9to29mmj727.cloudfront.net/promo/2016/5992-SeriesHeaders_Komi_2000x800.jpg';
    const bannerImage = 'https://m.media-amazon.com/images/I/51B5wtc70mL.jpg';
    const title = "Komi Can't Communicate";
    const bannerImageAltText = "Komi Can't Communicate Cover";
    const profileImageAltText = "Komi Can't Communicate Hero";

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
        manga_id,
        title,
        bannerImage,
        profileImage,
        bannerImageAltText,
        profileImageAltText,
        companies_full_list,
    };
};

export default AnimeCompanies;
