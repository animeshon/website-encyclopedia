import React, { useState, useRef, useEffect } from 'react';

const CollapsableSection = ({ maxHeight, mainClass, collapsedClass, moreClass, children }) => {
    const [expanded, setExpanded] = useState(false);
    const [height, setHeight] = useState(0)
    const ref = useRef(null)

    const expand = (flag) => {
        if (flag) {
            ref.current.classList.remove(collapsedClass);
        } else {
            ref.current.classList.add(collapsedClass);
        }
        setExpanded(flag);
    };

    function handleExpand(e) {
        e.preventDefault();
        expand(!expanded);
    }

    useEffect(() => {
        setHeight(ref.current.clientHeight);
        if (ref.current.clientHeight > maxHeight) {
            expand(false);
        }
    }, []);

    return (
        <>
            <div ref={ref} className={mainClass}>
                {children}
            </div>

            {height > maxHeight ? <div className={moreClass}>
                <p onClick={handleExpand}>{expanded ? 'less...' : 'more...'}</p>
            </div> : undefined}
        </>
    );
};

export default CollapsableSection;