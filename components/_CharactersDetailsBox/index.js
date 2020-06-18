import Link from 'next/link';

export const CharactersDetailsBox = ({ obj }) => {
    return (
        <div className="details__table">
            {obj.japanese_name && (
                <div className="details__row">
                    <div className="details__key">Japanese{`\n`}Name</div>
                    <div className="details__value">{obj.japanese_name}</div>
                </div>
            )}
            {obj.birth_date && (
                <div className="details__row">
                    <div className="details__key">Date{`\n`}of Birth</div>
                    <div className="details__value">{obj.birth_date}</div>
                </div>
            )}
            {obj.gender && (
                <div className="details__row">
                    <div className="details__key">Gender</div>
                    <div className="details__value">{obj.gender}</div>
                </div>
            )}
            {/*  */}
            <hr className="details__breaker" />
            {/*  */}
            {obj.abilities.length > 0 && (
                <div className="details__row">
                    <div className="details__key">Abilities</div>
                    <div className="details__value">
                        <ul>
                            {obj.abilities.map(element => {
                                return <li key={element}>{element}</li>;
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {obj.clothing.length > 0 && (
                <div className="details__row">
                    <div className="details__key">Clothing</div>
                    <div className="details__value">
                        <ul>
                            {obj.clothing.map(element => {
                                return <li key={element}>{element}</li>;
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {obj.entity && (
                <div className="details__row">
                    <div className="details__key">Entity</div>
                    <div className="details__value">{obj.entity}</div>
                </div>
            )}
            {obj.fashion_accessories.length > 0 && (
                <div className="details__row">
                    <div className="details__key">Fashion{'\n'}Accessories</div>
                    <div className="details__value">
                        <ul>
                            {obj.fashion_accessories.map(element => {
                                return <li key={element}>{element}</li>;
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {obj.fetish_appeals.length > 0 && (
                <div className="details__row">
                    <div className="details__key">Fetish{'\n'}Appeals</div>
                    <div className="details__value">
                        <ul>
                            {obj.fetish_appeals.map(element => {
                                return <li key={element}>{element}</li>;
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {obj.looks.length > 0 && (
                <div className="details__row">
                    <div className="details__key">Looks</div>
                    <div className="details__value">
                        <ul>
                            {obj.looks.map(element => {
                                return <li key={element}>{element}</li>;
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {obj.personality.length > 0 && (
                <div className="details__row">
                    <div className="details__key">Personality</div>
                    <div className="details__value">
                        <ul>
                            {obj.personality.map(element => {
                                return <li key={element}>{element}</li>;
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {/*  */}
            <hr className="details__breaker" />
            {/*  */}
            {obj.resources.length > 0 && (
                <div className="details__row">
                    <div className="details__key">Resources</div>
                    <div className="details__value">
                        <ul>
                            {obj.resources.map(element => {
                                return (
                                    <li key={element.label}>
                                        <a href={element.link} target="_blank">
                                            {element.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};
