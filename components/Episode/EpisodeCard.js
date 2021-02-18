import React from 'react';
import Link from 'next/link';

import * as uri from '@/utilities/URI';
import * as text from '@/utilities/Text';

const EpisodeCard = ({ episode }) => {
    const href = uri.Rewrite('Episode', episode.name, episode.id);
    const releaseDate = new Date(episode).toLocaleDateString('en-US')
    
    return (
        <div key={episode.id} className="episodes-list__box">
            <Link href={href}>
                <a>
                    <picture className="episodes-list__image">
                        <img src={episode.image.uri} alt={episode.name} />
                    </picture>
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
                    {text.Truncate(episode.description, 240)}
                </p>
            </div>
        </div>
    );
};

export default EpisodeCard;