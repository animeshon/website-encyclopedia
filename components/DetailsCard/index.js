import Link from 'next/link';

import styles from './DetailsCard.module.css';
import Flag from '@/components/Flag';

// NOTE: The following are all possible formats:

// [[{key: 'Key', value: 'Value'}]]
// [[{key: 'Key', value: 'Value' href: 'Link']]
// [[{key: 'Key', value: [{text: 'Value', href: 'Link'}, {text: 'Value'}]}]]

export const DetailsCard = ({ items }) => {
    var lastBlockCount = 0;

    return (
        <div className={styles.details__table}>
            {items.map(item => {
                var blocks = [];
                var counter = 0;

                if (lastBlockCount) {
                    blocks.push(<hr className={styles.details__breaker} key={JSON.stringify(item)} />);
                }

                blocks.push(item.map(pair => {
                    var value = undefined;
                    if (!Array.isArray(pair.value)) {
                        if (!pair.value) { return undefined } else { counter++ }

                        value = pair.href ? (<Link href={pair.href}><a>{pair.value}</a></Link>) : pair.value;
                    } else {
                        if (!pair.value.length) { return undefined } else { counter++ }

                        value = pair.value.map(value => {
                            if (!value.text) { return undefined } else { counter++ }
                            return value.href ? (<p><Link href={value.href}><a>{value.text}</a></Link></p>) : (<p>{value.text}</p>);
                        })
                    }

                    const flag = pair.flag ? <Flag nationality={pair.flag}/> : undefined;
                    return (
                        <div className={styles.details__row} key={pair.key}>
                            <div className={styles.details__key}>{pair.key}</div>
                            <div className={styles.details__value}>{flag}{value}</div>
                        </div>
                    );
                }));

                if (counter) {
                    lastBlockCount = counter;
                    return blocks;
                }
            })}
        </div>
    );
};

export default DetailsCard;