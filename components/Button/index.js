import Link from 'next/link';

const Button = ({
    onClick = () => {},
    href,
    as,
    children,
    className,
    type = 'next-link',
}) => {
    switch (type) {
        case 'next-link':
            return (
                <Link as={as} href={href}>
                    <a className={`btn ${className}`}>{children}</a>
                </Link>
            );
        case 'form-submit':
            return (
                <input
                    onClick={onClick}
                    type="submit"
                    value={children}
                    className={className}
                />
            );
        case 'button':
            return (
                <button type="button" className={className}>
                    {children}
                </button>
            );
        default:
            return null;
    }
};

export default Button;
