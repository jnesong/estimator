//libraries
import { useState } from 'react';
//css
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const Quantity = ({ holdQuantity }) => {
    const filter = createFilterOptions();
    const [quantity, setQuantity] = useState('1');
    const quantities = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

    const handleQuantityChange = (e, newQuantity) => {
        if (typeof newQuantity === 'string') {
            setQuantity(newQuantity);
        } else if (newQuantity && newQuantity.inputValue) {
            setQuantity(newQuantity.inputValue);
        } else { setQuantity(newQuantity); }
    };

    holdQuantity(quantity)


    return (
        <Autocomplete
            onKeyPress={(event) => {
                if (!/[0-9]|\./.test(event.key) || //the key pressed is not the key for 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, or “.” OR
                    (/\./.test(event.key) && quantity.includes("."))) //it is a “.” AND the input value already includes a “.”
                { event.preventDefault(); }
            }}
            value={quantity}
            onChange={handleQuantityChange}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option);
                if (inputValue !== 0 && !isExisting) {
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
            options={quantities}
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
                <TextField {...params} label="Quantity" />
            )}
        />
    );
};


export default Quantity;