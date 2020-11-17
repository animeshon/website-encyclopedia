import Link from 'next/link';

const Footer = ({ contextualClass }) => {
    return (
        <footer
            className={`home-footer${
                contextualClass ? ` ${contextualClass}` : ''
            }`}
        >
            <div className="internal-space">
                <ul>
                    <li className="no-xs">
                        <Link href="https://animeshon.com">
                            <a target="_blank">About</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.iubenda.com/privacy-policy/48776658">
                            <a target="_blank">Privacy</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.iubenda.com/privacy-policy/48776658/cookie-policy">
                            <a target="_blank">Cookie</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.iubenda.com/terms-and-conditions/48776658">
                            <a target="_blank">Terms</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/animeshon/[page]" as="/animeshon/contacts">
                            <a>Contacts</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/animeshon/[page]" as="/animeshon/license">
                            <a>License</a>
                        </Link>
                    </li>
                    <li className="no-xs">
                        <Link href="https://github.com/animeshon/website-encyclopedia">
                            <a target="_blank">GitHub</a>
                        </Link>
                    </li>
                </ul>
                <p>Made with ❤️ by Animeshon | Copyright &copy; 2020</p>
            </div>
        </footer>
    );
};

export default Footer;
