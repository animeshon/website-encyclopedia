import Link from 'next/link';

const Button = ({
    onClick = () => {},
    href,
    children,
    className,
    type = 'next-link',
    disabled,
}) => {
    switch (type) {
        case 'next-link':
            return (
                <Link href={href}>
                    <a className={`btn ${className}`}>{children}</a>
                </Link>
            );
        case 'form-submit':
            return (
                <input
                    onClick={onClick}
                    type="submit"
                    value={children}
                    className={`btn ${className}`}
                    disabled={disabled}
                />
            );
        case 'button':
            return (
                <button type="button" className={`btn ${className}`}>
                    {children}
                </button>
            );
        default:
            return null;
    }
};

export default Button;
