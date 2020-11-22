// import Link from 'next/link';
// import parse from 'html-react-parser';
// import { kebabCase, replace } from 'lodash';

// import { MangaNavigation } from '@/resources/navigation/allTabNavigations';

// import AnyWrapper from '@/components/_AnyWrapper';
// import { MangaDetailsBox } from '@/components/_MangaDetailsBox';
// import Button from '@/components/Button';
// import CardImage from '@/components/Card/Image';

// const renderBuyLinks = links => {
//     let array = [];
//     for (const key in links) {
//         if (links.hasOwnProperty(key)) {
//             array.push(
//                 <div key={key} className="links-row">
//                     <p>
//                         {key === 'jp' && 'Japan'}
//                         {key === 'us' && 'United States'}
//                     </p>
//                     {links[key].map(link => {
//                         return (
//                             <a
//                                 key={link.id}
//                                 href={link.link}
//                                 target="_blank"
//                                 className="external-platform-button"
//                             >
//                                 <img src={link.image.uri} alt={link.name} />
//                             </a>
//                         );
//                     })}
//                 </div>,
//             );
//         }
//     }
//     return array;
// };

// const renderCharacters = items => {
//     const linkTo = '/characters/';
//     return items.map(item => {
//         const linkProps = {
//             href: `${linkTo}[character_id]`,
//             as: `/characters/${
//                 item.id + '_' + kebabCase(item.fname + '-' + item.lname)
//             }`,
//         };
//         return (
//             <div key={item.id} className="card">
//                 <Link {...linkProps}>
//                     <a>
//                         <CardImage
//                             type={item.type}
//                             sex={item.sex}
//                             picture={item.profile_picture}
//                             altText={`${item.fname} ${item.lname}`}
//                         />
//                     </a>
//                 </Link>

//                 <div className="card__info">
//                     <Link {...linkProps}>
//                         <a>
//                             <h4>
//                                 {item.fname} {item.lname}
//                             </h4>
//                         </a>
//                     </Link>
//                     <p className="card__jap-name">{item.japanese_name}</p>
//                     <p className="card__role">{replace(item.role, '-', ' ')}</p>
//                     <Button
//                         className="cherry-red medium"
//                         href={`${linkTo}[character_id]`}
//                         as={`${linkTo}${item.id}_${kebabCase(
//                             `${item.fname}-${item.lname}`,
//                         )}`}
//                         type="next-link"
//                     >
//                         More
//                     </Button>
//                 </div>
//             </div>
//         );
//     });
// };

// const renderVolumeMagazine = (items, mangaId) => {
//     return items.map(item => {
//         return (
//             <div key={item.id} className="volume-cover">
//                 <Link
//                     as={
//                         item.type === 'volume'
//                             ? `/manga/${mangaId}/volumes/volume-${item.issue_number}_${item.id}`
//                             : `/magazine/${item.id}`
//                     }
//                     href="/manga/[manga_id]/volumes/[volume_id]"
//                 >
//                     <a>
//                         <img
//                             src={item.cover.us ? item.cover.us : item.cover.jp}
//                             alt={item.name.en}
//                         />
//                     </a>
//                 </Link>
//                 <div className="appears-on-hover">
//                     <h5>{item.name.en}</h5>
//                     <p>
//                         {item.type === 'volume' ? 'Volume' : 'Number'}{' '}
//                         {item.issue_number}
//                     </p>
//                 </div>
//             </div>
//         );
//     });
// };

// const MangaChapterPage = ({
//     manga_id,
//     title,
//     bannerImage,
//     profileImage,
//     bannerImageAltText,
//     profileImageAltText,
//     chapter_details,
// }) => {
//     return (
//         <AnyWrapper
//             id={manga_id}
//             title={title}
//             bannerImage={bannerImage}
//             profileImage={profileImage}
//             bannerImageAltText={bannerImageAltText}
//             profileImageAltText={profileImageAltText}
//             anyNav={MangaNavigation}
//             selectedMenu="Chapters"
//         >
//             <main className="landing__description">
//                 <section className="landing-section-box">
//                     <header>
//                         <h3>Description</h3>
//                     </header>
//                     <p>{parse(chapter_details.description.en)}</p>
//                 </section>
//                 {/*  */}
//                 <section className="landing-section-box">
//                     <header>
//                         <h4>Read</h4>
//                         <span />
//                     </header>
//                     {chapter_details.buy_links.length !== 0 ? (
//                         <div className="grid-halves manga-links">
//                             {renderBuyLinks(chapter_details.buy_links)}
//                         </div>
//                     ) : (
//                         <div className="no-links-available">
//                             We haven't found any source
//                         </div>
//                     )}
//                 </section>
//                 <section className="landing-section-box">
//                     <header>
//                         <h4>
//                             Characters in Volume{' '}
//                             {chapter_details.chapter_number}
//                         </h4>
//                         <span />
//                     </header>
//                     <div className="grid-halves">
//                         {renderCharacters(
//                             chapter_details.characters_appearences,
//                         )}
//                     </div>
//                 </section>
//                 <section className="landing-section-box">
//                     <header>
//                         <h4>Part of / Collected in</h4>
//                         <span />
//                     </header>
//                     <div className="grid-halves collected-in">
//                         {renderVolumeMagazine(
//                             chapter_details.collected_in,
//                             manga_id,
//                         )}
//                     </div>
//                 </section>
//             </main>
//             <aside className="landing__details">
//                 <header>
//                     <h3>Details</h3>
//                 </header>
//                 <MangaDetailsBox
//                     obj={chapter_details}
//                     pageType="manga-chapter-details"
//                 />
//             </aside>
//         </AnyWrapper>
//     );
// };

// MangaChapterPage.getInitialProps = async ctx => {
//     const { manga_id } = ctx.query;
//     const profileImage =
//         'https://dw9to29mmj727.cloudfront.net/promo/2016/5992-SeriesHeaders_Komi_2000x800.jpg';
//     const bannerImage =
//         'https://covers2.booksamillion.com/covers/bam/1/97/470/713/197470713X.jpg';
//     const title = "Komi Can't Communicate";
//     const bannerImageAltText = "Komi Can't Communicate Cover";
//     const profileImageAltText = "Komi Can't Communicate Hero";

//     const chapter_details = {
//         englishTitle: "Komi Can't Communicate",
//         japaneseTitle: '古見さんは、コミュ症です。',
//         romajiTitle: 'Komi-san wa, Komyushou desu.',
//         media: 'manga',
//         chapter_number: 2,
//         pages_in_chapter: 16,
//         ageRating: 'All',
//         description: {
//             en: `Socially anxious high school student <strong>Shoko Komi</strong>’s
//                 greatest dream is to make some friends, but everyone at
//                 school mistakes her crippling social anxiety for cool
//                 reserve! With the whole student body keeping their distance
//                 and Komi unable to utter a single word, friendship might
//                 be forever beyond her reach.`,
//         },
//         buy_links: {
//             jp: [
//                 {
//                     name: 'amazon',
//                     link: 'https://amazon.co.jp/',
//                     image: '/images/platform-amazon-jp.png',
//                     id: 'jhaksjdha',
//                 },
//                 {
//                     name: 'cd japan',
//                     link: 'https://cd-japan.jp/',
//                     image: '/images/platform-cdjapan.png',
//                     id: 'alkjdfsgk',
//                 },
//                 {
//                     name: 'ebay',
//                     link: 'https://ebay.jp/',
//                     image: '/images/platform-ebay.png',
//                     id: 'alkshjgdfklj',
//                 },
//             ],
//             us: [
//                 {
//                     name: 'amazon',
//                     link: 'https://amazon.com/',
//                     image: '/images/platform-amazon-us.png',
//                     id: 'akhjsfhg',
//                 },
//                 {
//                     name: 'viz media',
//                     link: 'https://vizmedia.com/',
//                     image: '/images/platform-vizmedia.png',
//                     id: 'jhakkjsdhfklsjdha',
//                 },
//                 {
//                     name: 'ebay',
//                     link: 'https://ebay.com/',
//                     image: '/images/platform-ebay.png',
//                     id: 'sdkjfhg',
//                 },
//             ],
//         },
//         collected_in: [
//             {
//                 type: 'volume',
//                 name: {
//                     en: "Komi Can't Communicate",
//                     rmj: 'Komi-San Wa, Komyushou Desu.',
//                     jp: '古見さんは、コミュ症です。',
//                 },
//                 cover: {
//                     us:
//                         'https://dw9to29mmj727.cloudfront.net/products/1974707121.jpg',
//                     jp:
//                         'https://vignette.wikia.nocookie.net/komisan-wa-komyushou-desu/images/e/e2/Komi_San_Volume_1.png',
//                 },
//                 issue_number: 1,
//                 id: '1jh3g4kj1hg34jhg1j2h5',
//             },
//             {
//                 type: 'magazine',
//                 name: {
//                     en: 'Shonen Sunday Magazine',
//                     rmj: 'Shūkan Shōnen Sandē',
//                     jp: '週刊少年サンデー',
//                 },

//                 cover: {
//                     jp: 'https://i.redd.it/vuvfs0cq0t211.jpg',
//                 },
//                 issue_number: 29,
//                 id: '36jk5h4jk12g5hjk57',
//             },
//         ],
//         characters_appearences: [
//             {
//                 fname: 'Shouko',
//                 lname: 'Komi',
//                 japanese_name: '美遊・エーデルフェルト',
//                 sex: 'female',
//                 type: 'character',
//                 role: 'main-character',
//                 profile_picture:
//                     'https://pm1.narvii.com/7213/a5ea8f55fbb18752a8761b4b059fca9a2ae5a854r1-400-400v2_00.jpg',
//                 id: '8WZqW4hZMSmiucnKrTdai5',
//             },
//             {
//                 fname: 'Hitohito',
//                 lname: 'Tadano',
//                 japanese_name: '美遊・エーデルフェルト',
//                 sex: 'male',
//                 type: 'character',
//                 role: 'main-character',
//                 profile_picture:
//                     'https://www.anime-planet.com/images/characters/hitohito-tadano-132049.jpg',
//                 id: 'm5akibjJM2UGGHNdi4aQX3',
//             },
//             {
//                 fname: 'Rumiko',
//                 lname: 'Manbagi',
//                 japanese_name: '美遊・エーデルフェルト',
//                 sex: 'female',
//                 type: 'character',
//                 role: 'main-character',
//                 profile_picture:
//                     'https://vignette.wikia.nocookie.net/komisan-wa-komyushou-desu/images/7/76/Manbagi.PNG/revision/latest/scale-to-width-down/340?cb=20180722174428',
//                 id: 'm5akibjJM2UGGHNdi4aQX3',
//             },
//             {
//                 fname: 'Najimi',
//                 lname: 'Osana',
//                 japanese_name: '美遊・エーデルフェルト',
//                 sex: 'female',
//                 type: 'character',
//                 role: 'supporting-character',
//                 profile_picture:
//                     'https://pm1.narvii.com/7177/8771c01a3826dc32452b54123bcc7cfb6263f2bfr1-276-276v2_00.jpg',
//                 id: 'm5akibjJM2UGGHNdi4aQX3',
//             },
//         ],
//         release_date: {
//             jp: 'Feb 17, 2016',
//             us: 'Mar 23, 2017',
//             de: 'Mar 28, 2017',
//             it: 'Mar 29, 2017',
//         },
//     };

//     return {
//         manga_id,
//         title,
//         bannerImage,
//         profileImage,
//         bannerImageAltText,
//         profileImageAltText,
//         chapter_details,
//     };
// };

// export default MangaChapterPage;
