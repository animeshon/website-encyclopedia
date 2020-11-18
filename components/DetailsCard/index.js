import Link from 'next/link';

// NOTE: The following are all possible formats:

// [[{key: 'Key', value: 'Value'}]]
// [[{key: 'Key', value: 'Value' href: 'Link']]
// [[{key: 'Key', value: [{text: 'Value', href: 'Link'}, {text: 'Value'}]}]]

export const DetailsCard = ({ items }) => {
    var counter = 0;

    return (
        <div className="details__table">
            {items.map(item => {
                var blocks = [];
                if (counter) {
                    blocks.push(<hr className="details__breaker" key={JSON.stringify(item)} />);
                }
                counter = 0;

                blocks.push(item.map(pair => {
                    var value = undefined;
                    if (!Array.isArray(pair.value)) {
                        if (!pair.value) { return undefined } else { counter++ }


                        value = pair.href ? (<Link href={pair.href}><a>{pair.value}</a></Link>) : pair.value;
                    } else {
                        if (!pair.value.length) { return undefined } else { counter++ }

                        var isFirst = true;
                        value = pair.value.map(value => {
                            if (!value.text) { return undefined } else { counter++ }

                            const text = isFirst ? value.text : `, ${value.text}`;
                            isFirst = false;

                            return value.href ? (<Link href={value.href}><a>{text}</a></Link>) : text;
                        })
                    }

                    const flag = pair.flag ? (<span className={`fp fp-sm custom-fp ${pair.flag}`} />) : undefined;
                    return (
                        <div className="details__row" key={pair.key}>
                            <div className="details__key">{pair.key}</div>
                            <div className="details__value">{flag}{value}</div>
                        </div>
                    );
                }));

                if (counter) {
                    return blocks;
                }
            })}
        </div>
    );
};

export default DetailsCard;