const CustomInput = ({
    type = 'text',
    value = '',
    onChangeAction = () => {},
    className,
    placeholder
}) => {
    return (
        <input
            className={className}
            type={type}
            value={value}
            onChange={onChangeAction}
            placeholder={placeholder}
        />
    );
};

export default CustomInput;
