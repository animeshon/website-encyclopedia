

// // TODO children
// {
//     item.childContents && primary == 'primary' && (
//         <aside className="search-result__aside">
//             <h3>Episodes</h3>
//             <div className="search-result__column">
//                 <AnimeEpisodes
//                     animeTitle={mainTitle}
//                     animeId={mainId}
//                     episodes={episodes}
//                 />
//             </div>
//             <div className="search-result__more-trigger">
//                 <Link
//                     href="/anime/[anime_id]/episodes"
//                     as={`/anime/${mainId}_${kebabCase(
//                         mainTitle,
//                     )}/episodes`}
//                 >
//                     <button>more</button>
//                 </Link>
//             </div>
//         </aside>
//     )
// } 


// const ChildContents = ({ episodes, animeId, animeTitle }) => {
//     return episodes.map(episode => {
//         const image = episode.images[0]
//             ? episode.images[0].image.file.publicUri
//             : undefined;
//         const name = episode.names[0].text;
//         const descirption = episode.description[0]
//             ? episode.description[0].text
//             : undefined;
//         const episodeId = episode.id;

//         return (
//             <Link
//                 key={episodeId}
//                 href="/anime/[anime_id]/episodes/[episode_id]"
//                 as={`/anime/${animeId}_${kebabCase(
//                     animeTitle,
//                 )}/episodes/${episodeId}_${kebabCase(name)}`}
//             >
//                 <div className="search-result__aside__item">
//                     {image && (
//                         <figure>
//                             <img src={image} alt="" />
//                         </figure>
//                     )}
//                     <div className="search-result__aside__texts">
//                         <h4>{name}</h4>
//                         {descirption && <p>{descirption}</p>}
//                     </div>
//                 </div>
//             </Link>
//         );
//     });
// };
