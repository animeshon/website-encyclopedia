import { CharacterNavigation } from '@/resources/navigation/allTabNavigations';

import AnyWrapper from '@/components/_AnyWrapper';

const CharacterPictures = ({
    character_id,
    character_name,
    character_pictures,
    hero_image,
    hero_image_alt_text,
    cover_image,
    cover_image_alt_text,
}) => {
    return (
        <AnyWrapper
            anyId={character_id}
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={cover_image_alt_text}
            heroImageAltText={hero_image_alt_text}
            anyNav={CharacterNavigation}
            anyTitle={character_name}
            selectedMenu="Pictures"
        >
            <main className="landing__description">
                <section className="landing-section-box">
                    <header>
                        <h3>Pictures</h3>
                    </header>
                    <div className="picture__masonry">
                        {character_pictures.map((item, index) => {
                            return (
                                <div key={index} className="tile">
                                    <img src={item.link} alt={item.alt} />
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
        </AnyWrapper>
    );
};

CharacterPictures.getInitialProps = async ctx => {
    const { character_id } = ctx.query;
    const hero_image =
        'http://2.bp.blogspot.com/-IlqVBmHSO7c/UQk4sPRMVsI/AAAAAAAAAiI/TQm72CS8kls/s1600/Monkey+D.+Luffy+2.jpg';
    const hero_image_alt_text = 'Monkey D. Luffy Hero';
    const cover_image =
        'https://s-media-cache-ak0.pinimg.com/originals/0a/fb/46/0afb465b38987240997ed8d3cb054c64.png';
    const cover_image_alt_text = 'Monkey D. Luffy Cover';
    const character_name = 'Monkey D. Luffy';
    const character_pictures = [
        {
            link:
                'https://th.bing.com/th/id/AMMS_af518f27b65e6c4e963335c4fb96fcfa?pid=Api&w=1617&h=2859&rs=1',
            alt: '',
        },
        {
            link:
                'https://yt3.ggpht.com/a/AGF-l795tyjmZ7pidq4iflOVGcUyQyx5To-SQ3WXfA=s900-c-k-c0xffffffff-no-rj-mo',
            alt: '',
        },
        {
            link:
                'https://th.bing.com/th/id/OIP.CL36JWSnftuSufg-RZ4_pgHaMo?pid=Api&rs=1',
            alt: '',
        },
        {
            link:
                'https://res.cloudinary.com/teepublic/image/private/s--IgqQVKvn--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1456932411/production/designs/435986_1.jpg',
            alt: '',
        },
        {
            link:
                'http://images4.fanpop.com/image/photos/19800000/Luffy-monkey-d-luffy-19829370-900-675.jpg',
            alt: '',
        },
        {
            link:
                'https://static.comicvine.com/uploads/original/9/96675/3553034-621452-monkey_d_luffy_after_timeskip__paint__by_twin_gamer_d4ez19r.jpg',
            alt: '',
        },
        {
            link:
                'https://th.bing.com/th/id/AMMS_af518f27b65e6c4e963335c4fb96fcfa?pid=Api&w=1617&h=2859&rs=1',
            alt: '',
        },
        {
            link:
                'https://yt3.ggpht.com/a/AGF-l795tyjmZ7pidq4iflOVGcUyQyx5To-SQ3WXfA=s900-c-k-c0xffffffff-no-rj-mo',
            alt: '',
        },
        {
            link:
                'https://th.bing.com/th/id/OIP.CL36JWSnftuSufg-RZ4_pgHaMo?pid=Api&rs=1',
            alt: '',
        },
        {
            link:
                'https://res.cloudinary.com/teepublic/image/private/s--IgqQVKvn--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1456932411/production/designs/435986_1.jpg',
            alt: '',
        },
        {
            link:
                'http://images4.fanpop.com/image/photos/19800000/Luffy-monkey-d-luffy-19829370-900-675.jpg',
            alt: '',
        },
        {
            link:
                'https://static.comicvine.com/uploads/original/9/96675/3553034-621452-monkey_d_luffy_after_timeskip__paint__by_twin_gamer_d4ez19r.jpg',
            alt: '',
        },
        {
            link:
                'https://th.bing.com/th/id/AMMS_af518f27b65e6c4e963335c4fb96fcfa?pid=Api&w=1617&h=2859&rs=1',
            alt: '',
        },
        {
            link:
                'https://yt3.ggpht.com/a/AGF-l795tyjmZ7pidq4iflOVGcUyQyx5To-SQ3WXfA=s900-c-k-c0xffffffff-no-rj-mo',
            alt: '',
        },
        {
            link:
                'https://th.bing.com/th/id/OIP.CL36JWSnftuSufg-RZ4_pgHaMo?pid=Api&rs=1',
            alt: '',
        },
        {
            link:
                'https://res.cloudinary.com/teepublic/image/private/s--IgqQVKvn--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1456932411/production/designs/435986_1.jpg',
            alt: '',
        },
        {
            link:
                'http://images4.fanpop.com/image/photos/19800000/Luffy-monkey-d-luffy-19829370-900-675.jpg',
            alt: '',
        },
        {
            link:
                'https://static.comicvine.com/uploads/original/9/96675/3553034-621452-monkey_d_luffy_after_timeskip__paint__by_twin_gamer_d4ez19r.jpg',
            alt: '',
        },
        {
            link:
                'https://th.bing.com/th/id/AMMS_af518f27b65e6c4e963335c4fb96fcfa?pid=Api&w=1617&h=2859&rs=1',
            alt: '',
        },
        {
            link:
                'https://yt3.ggpht.com/a/AGF-l795tyjmZ7pidq4iflOVGcUyQyx5To-SQ3WXfA=s900-c-k-c0xffffffff-no-rj-mo',
            alt: '',
        },
        {
            link:
                'https://th.bing.com/th/id/OIP.CL36JWSnftuSufg-RZ4_pgHaMo?pid=Api&rs=1',
            alt: '',
        },
        {
            link:
                'https://res.cloudinary.com/teepublic/image/private/s--IgqQVKvn--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1456932411/production/designs/435986_1.jpg',
            alt: '',
        },
        {
            link:
                'http://images4.fanpop.com/image/photos/19800000/Luffy-monkey-d-luffy-19829370-900-675.jpg',
            alt: '',
        },
        {
            link:
                'https://static.comicvine.com/uploads/original/9/96675/3553034-621452-monkey_d_luffy_after_timeskip__paint__by_twin_gamer_d4ez19r.jpg',
            alt: '',
        },
        {
            link:
                'https://th.bing.com/th/id/AMMS_af518f27b65e6c4e963335c4fb96fcfa?pid=Api&w=1617&h=2859&rs=1',
            alt: '',
        },
        {
            link:
                'https://yt3.ggpht.com/a/AGF-l795tyjmZ7pidq4iflOVGcUyQyx5To-SQ3WXfA=s900-c-k-c0xffffffff-no-rj-mo',
            alt: '',
        },
        {
            link:
                'https://th.bing.com/th/id/OIP.CL36JWSnftuSufg-RZ4_pgHaMo?pid=Api&rs=1',
            alt: '',
        },
        {
            link:
                'https://res.cloudinary.com/teepublic/image/private/s--IgqQVKvn--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1456932411/production/designs/435986_1.jpg',
            alt: '',
        },
        {
            link:
                'http://images4.fanpop.com/image/photos/19800000/Luffy-monkey-d-luffy-19829370-900-675.jpg',
            alt: '',
        },
        {
            link:
                'https://static.comicvine.com/uploads/original/9/96675/3553034-621452-monkey_d_luffy_after_timeskip__paint__by_twin_gamer_d4ez19r.jpg',
            alt: '',
        },
        {
            link:
                'https://th.bing.com/th/id/AMMS_af518f27b65e6c4e963335c4fb96fcfa?pid=Api&w=1617&h=2859&rs=1',
            alt: '',
        },
        {
            link:
                'https://yt3.ggpht.com/a/AGF-l795tyjmZ7pidq4iflOVGcUyQyx5To-SQ3WXfA=s900-c-k-c0xffffffff-no-rj-mo',
            alt: '',
        },
        {
            link:
                'https://th.bing.com/th/id/OIP.CL36JWSnftuSufg-RZ4_pgHaMo?pid=Api&rs=1',
            alt: '',
        },
        {
            link:
                'https://res.cloudinary.com/teepublic/image/private/s--IgqQVKvn--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1456932411/production/designs/435986_1.jpg',
            alt: '',
        },
        {
            link:
                'http://images4.fanpop.com/image/photos/19800000/Luffy-monkey-d-luffy-19829370-900-675.jpg',
            alt: '',
        },
        {
            link:
                'https://static.comicvine.com/uploads/original/9/96675/3553034-621452-monkey_d_luffy_after_timeskip__paint__by_twin_gamer_d4ez19r.jpg',
            alt: '',
        },
        {
            link:
                'https://th.bing.com/th/id/AMMS_af518f27b65e6c4e963335c4fb96fcfa?pid=Api&w=1617&h=2859&rs=1',
            alt: '',
        },
        {
            link:
                'https://yt3.ggpht.com/a/AGF-l795tyjmZ7pidq4iflOVGcUyQyx5To-SQ3WXfA=s900-c-k-c0xffffffff-no-rj-mo',
            alt: '',
        },
        {
            link:
                'https://th.bing.com/th/id/OIP.CL36JWSnftuSufg-RZ4_pgHaMo?pid=Api&rs=1',
            alt: '',
        },
        {
            link:
                'https://res.cloudinary.com/teepublic/image/private/s--IgqQVKvn--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1456932411/production/designs/435986_1.jpg',
            alt: '',
        },
        {
            link:
                'http://images4.fanpop.com/image/photos/19800000/Luffy-monkey-d-luffy-19829370-900-675.jpg',
            alt: '',
        },
        {
            link:
                'https://static.comicvine.com/uploads/original/9/96675/3553034-621452-monkey_d_luffy_after_timeskip__paint__by_twin_gamer_d4ez19r.jpg',
            alt: '',
        },
        {
            link:
                'https://th.bing.com/th/id/AMMS_af518f27b65e6c4e963335c4fb96fcfa?pid=Api&w=1617&h=2859&rs=1',
            alt: '',
        },
        {
            link:
                'https://yt3.ggpht.com/a/AGF-l795tyjmZ7pidq4iflOVGcUyQyx5To-SQ3WXfA=s900-c-k-c0xffffffff-no-rj-mo',
            alt: '',
        },
        {
            link:
                'https://th.bing.com/th/id/OIP.CL36JWSnftuSufg-RZ4_pgHaMo?pid=Api&rs=1',
            alt: '',
        },
        {
            link:
                'https://res.cloudinary.com/teepublic/image/private/s--IgqQVKvn--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1456932411/production/designs/435986_1.jpg',
            alt: '',
        },
        {
            link:
                'http://images4.fanpop.com/image/photos/19800000/Luffy-monkey-d-luffy-19829370-900-675.jpg',
            alt: '',
        },
        {
            link:
                'https://static.comicvine.com/uploads/original/9/96675/3553034-621452-monkey_d_luffy_after_timeskip__paint__by_twin_gamer_d4ez19r.jpg',
            alt: '',
        },
    ];

    return {
        character_id,
        character_name,
        character_pictures,
        hero_image,
        hero_image_alt_text,
        cover_image,
        cover_image_alt_text,
    };
};

export default CharacterPictures;
