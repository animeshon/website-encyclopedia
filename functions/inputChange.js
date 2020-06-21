import { useState } from 'react';

export const useInputChange = () => {
    const [input, setInput] = useState({});

    const handleInputChange = e =>
        setInput({
            ...input,
            [e.currentTarget.name]: e.currentTarget.value,
        });

    const setFieldValue = (fieldName, value) => {
        setInput({
            ...input,
            [fieldName]: value,
        });
    };

    return [input, handleInputChange, setFieldValue];
};
