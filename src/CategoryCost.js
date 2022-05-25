//libraries
import { useState } from 'react';
//css
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();


const CategoryCost = () => {

    const [categoryValue, setCategoryValue] = useState(null);
    const categories = ['All Inclusive', 'Labor', 'Materials'];

    const handleCategoryChange = (e, newValue) => {
        if (typeof newValue === 'string') {
            setCategoryValue(newValue);
        } else if (newValue && newValue.inputValue) {
            setCategoryValue(newValue.inputValue);
        } else { setCategoryValue(newValue);}
    };

    console.log(categoryValue)


    return (
        <Autocomplete
            value={categoryValue}
            onChange={handleCategoryChange}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option);
                if (inputValue !== '' && !isExisting) {
                    filtered.push(
                        inputValue
                    );
                }
                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={categories}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option;
            }}
            renderOption={(props, option) => <li {...props}>{option}</li>}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label="Category" />
            )}
        />
    );
};


export default CategoryCost;