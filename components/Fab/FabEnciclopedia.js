import React, { useEffect, useState } from 'react'
import Link from 'next/link';


import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { BiArrowToTop } from "react-icons/bi";
import { FaPatreon } from "react-icons/fa";
import { MdBugReport } from "react-icons/md";
import { RiStarSmileFill } from "react-icons/ri";

import styles from './FabEnciclopedia.module.css';

const FabEnciclopedia = ({ }) => {

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollTop = () => {
        window.scrollTo(0, 0)
    };

    return (
        <Fab
            alwaysShowTitle={false}
            icon={<RiStarSmileFill size={"2em"} />}
            mainButtonStyles={{ "background-color": "#ef0c40" }}
        >
            {scrollPosition != 0 && <Action text="Top" onClick={scrollTop} style={{ "background-color": "#ee2d5a" }}>
                <BiArrowToTop size={"2em"} />
            </Action>}
            <Action text="Report a Problem" style={{ "background-color": "#ee2d5a" }}>
                <Link href={'https://forms.gle/f5z7FxGVDftVb88F6'}>
                    <a target="_blank" rel="noreferrer" className={styles.link}>
                    <MdBugReport size={"2em"} />
                    </a>
                </Link>
            </Action>
            <Action text="Support" style={{ "background-color": "#ee2d5a" }}>
                <Link href={'https://www.patreon.com/animeshon'}>
                    <a target="_blank" rel="noreferrer" className={styles.link}>
                        <FaPatreon size={"1em"} />
                    </a>
                </Link>
            </Action>
        </Fab>
    )
};

export default FabEnciclopedia;