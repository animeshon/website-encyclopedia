// TODO 

// const renderStaff = (items, openSection, actionSection) => {
//     return items.map(item => {
//         let arrayOfSections = [];
//         for (const key in item) {
//             if (item.hasOwnProperty(key)) {
//                 arrayOfSections.push(
//                     <section key={key} className="expandable-section">
//                         <h4>
//                             <button
//                                 name={key}
//                                 onClick={e =>
//                                     actionSection(e, openSection[key])
//                                 }
//                             >
//                                 <span className="label">
//                                     {replace(key, '_', ' ')}
//                                 </span>
//                                 <span className="line" />
//                                 <span
//                                     className={`toggler ${
//                                         openSection[key] ? 'opened' : 'closed'
//                                     }`}
//                                 ></span>
//                             </button>
//                         </h4>
//                         <div
//                             className={`staff-members-holder ${
//                                 openSection[key] ? 'opened' : 'closed'
//                             }`}
//                         >
//                             {item[key].map(i => {
//                                 const linkProps = {
//                                     href: '/people/[people_id]',
//                                     as: `/people/${
//                                         i.id + '_' + kebabCase(i.name)
//                                     }`,
//                                 };
//                                 return (
//                                     <div key={i.id} className="card">
//                                         <Link {...linkProps}>
//                                             <a>
//                                                 <CardImage
//                                                     type={i.type}
//                                                     sex={i.sex}
//                                                     picture={i.profilePic}
//                                                     altText={`${i.name} Profile Picture`}
//                                                 />
//                                             </a>
//                                         </Link>

//                                         <div className="card__info">
//                                             <Link {...linkProps}>
//                                                 <a>
//                                                     <h4>{i.name}</h4>
//                                                 </a>
//                                             </Link>
//                                             <p className="card__jap-name">
//                                                 {i.japanese_name}
//                                             </p>
//                                             <p className="card__role">
//                                                 <span
//                                                     className={`fp fp-sm custom-fp ${i.nationality.iso}`}
//                                                 />
//                                                 {capitalize(i.sex)}
//                                             </p>
//                                             <Button
//                                                 className="cherry-red medium"
//                                                 type="next-link"
//                                                 {...linkProps}
//                                             >
//                                                 More
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </section>,
//                 );
//             }
//         }
//         return arrayOfSections;
//     });
// };