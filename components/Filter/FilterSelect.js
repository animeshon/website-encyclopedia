import React from 'react';

import Select from 'react-select';

const FilterSelect = ({ height, ...props }) => {
    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          background: '#fff',
          borderColor: '#cfcfcf',
          minHeight: `${height}px`,
          height: `${height}px`,
          boxShadow: state.isFocused ? null : null,
        }),

        menu: (provided, state) => ({
            ...provided,
            textAlign: 'left',
          }),
    
        valueContainer: (provided, state) => ({
          ...provided,
          height: `${height}px`,
          padding: '0 6px'
        }),
    
        input: (provided, state) => ({
          ...provided,
          margin: '0px',
        }),
        indicatorSeparator: state => ({
          display: 'none',
        }),
        indicatorsContainer: (provided, state) => ({
          ...provided,
          height: `${height}px`,
        }),
      };

    return (
        <Select {...props} styles={customStyles}/>
    );
};

export default FilterSelect;