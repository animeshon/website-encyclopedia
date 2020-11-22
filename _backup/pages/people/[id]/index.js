// import Link from 'next/link';
// import parse from 'html-react-parser';
// import { replace } from 'lodash';

// import { PeopleNavigation } from '@/resources/navigation/allTabNavigations';

// import AnyWrapper from '@/components/_AnyWrapper';
// // import { PeopleNavigation } from '@/components/_MangaDetailsBox';

// const renderProductions = items => {
//     return items.map((item, index) => {
//         const { bannerImage, id, title, type, role } = item;

//         if (index + 1 <= 3) {
//             return (
//                 <div key={id} className="appearences__item">
//                     <figure className="appearences__item-cover">
//                         <img src={bannerImage.en} />
//                     </figure>
//                     <article className="appearences__item-contents">
//                         <header>
//                             <h4>{title.en}</h4>
//                             <h5>{title.jp}</h5>
//                             <p className="appearences__media-type">{type}</p>
//                         </header>
//                         <aside>
//                             {role.map(r => {
//                                 return (
//                                     <p>
//                                         {r.name}: {r.number_participated}
//                                     </p>
//                                 );
//                             })}
//                         </aside>
//                     </article>
//                 </div>
//             );
//         } else return;
//     });
// };

// const People = ({
//     people_id,
//     title,
//     bannerImage,
//     profileImage,
//     bannerImageAltText,
//     profileImageAltText,
//     biography_description,
//     productions,
//     people_details,
// }) => {
//     return (
//         <AnyWrapper
//             id={people_id}
//             bannerImage={bannerImage}
//             profileImage={profileImage}
//             bannerImageAltText={bannerImageAltText}
//             profileImageAltText={profileImageAltText}
//             anyNav={PeopleNavigation}
//             title={title}
//             selectedMenu="Biography"
//         >
//             <main className="landing__description">
//                 {/*  */}
//                 <section className="landing-section-box">
//                     <header>
//                         <h3>Biography</h3>
//                     </header>
//                     <p>{parse(biography_description)}</p>
//                 </section>
//                 {/* Adaptations */}
//                 {productions.length !== 0 && (
//                     <section className="landing-section-box">
//                         <header>
//                             <h3>Productions</h3>
//                             <span />
//                             {productions.length > 3 && (
//                                 <Link
//                                     href="/people/[people_id]/productions"
//                                     as={`/people/${people_id}/productions`}
//                                 >
//                                     <a className="view-all-link">View all</a>
//                                 </Link>
//                             )}
//                         </header>
//                         <div className="appearences summary__box">
//                             {renderProductions(productions)}
//                         </div>
//                     </section>
//                 )}
//                 {/*  */}
//             </main>
//             <aside className="landing__details">
//                 <header>
//                     <h3>Info</h3>
//                 </header>
//             </aside>
//         </AnyWrapper>
//     );
// };

// People.getInitialProps = async ctx => {
//     const { people_id } = ctx.query;

//     const profileImage =
//         'http://i1.wp.com/fapservice.com/wp-content/uploads/2016/08/HorribleSubs-Fate-Kaleid-Liner-PRISMA-ILLYA-3rei-01-720p.mkv_snapshot_11.51_2016.07.06_15.34.51_stitch.jpg';
//     const bannerImage =
//         'https://www.nautiljon.com/images/people/00/27/oonuma_shin_19372.jpg?1516112465';
//     const title = 'Oonuma Shin';
//     const bannerImageAltText = 'Oonuma Shin';
//     const profileImageAltText = 'Oonuma Shin Hero';
//     const biography_description = `Oonuma Shin was born March 8, 1976 in Tokyo, Japan.
//     <br/><br/>
//     After graduating from Gakkou Houjin Chiyoda Gakuen he joined officeAO where he
//     worked as animator. After joining Shaft in 2004 as subcontractor he became Shinbou’s
//     right hand during the next few productions. He made his directorial debut with Ef - a Tale
//     of Memories. After being done with Shaft he worked as a director at Silver Link.
//     <br/><br/>
//     Oonuma is known to like so called moe games.`;

//     const people_details = {
//         japanese_name: '',
//         date_of_birth: '',
//         gender: 'male',
//         nationality: 'jp',
//         jobs: ['animator', 'director'],
//         resources: [
//             {
//                 source: 'wikipedia',
//                 links: {
//                     en: 'https://en.wikipedia.net',
//                     jp: 'https://jp.wikipedia.net',
//                 },
//             },
//         ],
//     };

//     const productions = [
//         {
//             title: {
//                 en: 'One Piece',
//                 jp: 'ワンピース',
//             },
//             bannerImage: {
//                 en:
//                     'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
//                 jp:
//                     'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
//             },
//             type: 'anime',
//             kind: 'anime',
//             role: [
//                 {
//                     name: 'Episode Direction',
//                     number_participated: `12`,
//                 },
//                 {
//                     name: 'Storyboard',
//                     number_participated: `3`,
//                 },
//             ],
//         },
//         {
//             title: {
//                 en: 'One Piece',
//                 jp: 'ワンピース',
//             },
//             bannerImage: {
//                 en:
//                     'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
//                 jp:
//                     'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
//             },
//             type: 'manga',
//             kind: 'manga',
//             role: [
//                 {
//                     name: 'Episode Direction',
//                     number_participated: `12`,
//                 },
//                 {
//                     name: 'Storyboard',
//                     number_participated: `3`,
//                 },
//             ],
//         },
//         {
//             title: {
//                 en: 'One Piece',
//                 jp: 'ワンピース',
//             },
//             bannerImage: {
//                 en:
//                     'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
//                 jp:
//                     'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
//             },
//             type: 'anime',
//             kind: 'anime',
//             role: [
//                 {
//                     name: 'Episode Direction',
//                     number_participated: `12`,
//                 },
//                 {
//                     name: 'Storyboard',
//                     number_participated: `3`,
//                 },
//             ],
//         },
//         {
//             title: {
//                 en: 'One Piece',
//                 jp: 'ワンピース',
//             },
//             bannerImage: {
//                 en:
//                     'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
//                 jp:
//                     'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
//             },
//             type: 'anime',
//             kind: 'anime',
//             roles: [
//                 {
//                     name: 'Episode Direction',
//                     number_participated: `12`,
//                 },
//                 {
//                     name: 'Storyboard',
//                     number_participated: `3`,
//                 },
//             ],
//         },
//     ];

//     return {
//         people_id,
//         title,
//         bannerImage,
//         profileImage,
//         bannerImageAltText,
//         profileImageAltText,
//         biography_description,
//         people_details,
//         productions,
//     };
// };

// export default People;
