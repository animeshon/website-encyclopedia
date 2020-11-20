// TODO 


// const AnimeStaff = ({
//     anime_id,
//     title,
//     bannerImage,
//     profileImage,
//     staff_full_list,
// }) => {
//     const [openedSection, setSection] = useState({});

//     useEffect(() => {
//         let count = 0;
//         let state = {};
//         staff_full_list.map(item => {
//             for (const key in item) {
//                 if (item.hasOwnProperty(key)) {
//                     state = {
//                         ...state,
//                         [key]: count === 0 || count === 1 ? true : false,
//                     };
//                 }
//                 count++;
//             }
//             setSection(state);
//         });
//     }, [setSection]);

//     const openSection = (e, val) => {
//         setSection({
//             ...openedSection,
//             [e.currentTarget.name]: !val,
//         });
//     };

//     return (
//         <AnyWrapper
//             id={anime_id}
//             title={title.text}
//             bannerImage={bannerImage}
//             profileImage={profileImage}
//             bannerImageAltText={`${title.text} Cover`}
//             profileImageAltText={`${title.text} Hero`}
//             anyNav={AnimeNavigation}
//             selectedMenu="Staff"
//         >
//             <main className="anime-staff__description grid">
//                 <div className="landing-section-box">
//                     <header>
//                         <h3>Staff</h3>
//                     </header>
//                     <div className="grid-halves">
//                         {renderStaff(
//                             staff_full_list,
//                             openedSection,
//                             openSection,
//                         )}
//                     </div>
//                 </div>
//             </main>
//         </AnyWrapper>
//     );
// };
