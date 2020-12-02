import React from 'react';
import Link from 'next/link';

import * as uri from '@/utilities/URI';

const EpisodeCard = ({ episode }) => {
    const href = uri.Rewrite('Episode', episode.name, episode.id);
    const releaseDate = new Date(episode).toLocaleDateString('en-US')
    
    return (
        <div key={id} className="episodes-list__box">
            <Link href={href}>
                <a>
                    <figure className="episodes-list__image">
                        <img src={episode.image.uri} alt={episode.name} />
                    </figure>
                </a>
            </Link>
            <div className="episode-details">
                <div className="episode-details__season-episode">
                    Episode {episode.identifier}
                </div>
                <Link href={href}>
                    <a>
                        <h4>{episode.name}</h4>
                    </a>
                </Link>
                <p className="episode-details__length-date">
                    <span>{episode.length} minutes</span>
                    {' - '}
                    <time dateTime={releaseDate}>{releaseDate}</time>
                </p>
                <p className="episode-details__description">
                    {truncate(episode.description, {
                        length: 240,
                        omission: ' ...',
                    })}
                </p>
            </div>
        </div>
    );
};

export default EpisodeCard;