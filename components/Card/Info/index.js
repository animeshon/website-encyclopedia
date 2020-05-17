const CardInfo = () => {
    return (
        <div className="card__info">
            <Link {...linkProps}>
                <a>
                    <h4>
                        {i.fname} {i.lname}
                    </h4>
                </a>
            </Link>
            <p className="card__jap-name">{i.japanese_name}</p>
            <p className="card__role">{replace(i.role, '-', ' ')}</p>
            <Button
                className="cherry-red medium"
                href="/people/[people_id]"
                as={`/people/${i.id}_${kebabCase(`${i.fname}-${i.lname}`)}`}
                type="next-link"
            >
                More
            </Button>
        </div>
    );
};

export default CardInfo;
