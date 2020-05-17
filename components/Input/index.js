const CustomInput = ({
    type = 'text',
    value = '',
    onChangeAction = () => {},
    className,
}) => {
    return (
        <input
            className={className}
            type={type}
            value={value}
            onChange={onChangeAction}
        />
    );
};

export default CustomInput;
