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
                    <li>
                        <Link href="/animeshon/[page]" as="/animeshon/about">
                            <a>About</a>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/animeshon/[page]"
                            as="/animeshon/privacy-policy"
                        >
                            <a>Privacy</a>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/animeshon/[page]"
                            as="/animeshon/terms-and-conditions"
                        >
                            <a>Terms</a>
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
                    <li>
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
