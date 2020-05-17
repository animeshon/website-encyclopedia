import AnyWrapper from '../../../AnyWrapper';

import { AnimeNavigation } from '../../../../resources/navigation/allTabNavigations';

const AnimeSongs = ({
    anime_id,
    cover_image,
    hero_image,
    cover_image_alt_text,
    hero_image_alt_text,
}) => {
    return (
        <AnyWrapper
            anyId={anime_id}
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={cover_image_alt_text}
            heroImageAltText={hero_image_alt_text}
            anyNav={AnimeNavigation}
            selectedMenu="Songs"
        >
            <main className="anime-songs__description grid">
                <section className="landing-section-box">
                    <header>
                        <h3>Songs</h3>
                        <span />
                    </header>
                </section>
            </main>
        </AnyWrapper>
    );
};

AnimeSongs.getInitialProps = async ctx => {
    const { anime_id } = ctx.query;
    const hero_image =
        'https://www.ricedigital.co.uk/wp-content/uploads/2016/01/Fatekaleid04D.jpgoriginal.jpg';
    const cover_image =
        'https://i2.wp.com/www.otakutale.com/wp-content/uploads/2017/10/Fate-kaleid-liner-Prisma-Illya-2017-Sequel-Anime-Visual.jpg';
    const cover_image_alt_text = 'Fate Kaleid Prisma Ilya Cover';
    const hero_image_alt_text = 'Fate Kaleid Prisma Ilya Hero';

    return {
        anime_id,
        cover_image,
        hero_image,
        cover_image_alt_text,
        hero_image_alt_text,
    };
};

export default AnimeSongs;
