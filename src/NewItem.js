//libraries
import { useState } from 'react';
//components
import CategoryCost from './CategoryCost'
import DeleteButton from './DeleteButton';
import Quantity from './Quantity';
//css
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';



const NewItem = () => {

    const [itemName, setItemName] = useState("")
    const [costChange, setCostChange] = useState(0)

    const handleItemNameChange = (e) => {
        setItemName(e.target.value);
    }

    const handleCostChange = (e) => {
        setCostChange(e.target.value);
    }

    console.log(itemName)
    console.log(costChange)

    return (
        <>
            <div className="new-item-container">

                <TextField
                    required
                    id="outlined-required"
                    label="Item"
                    variant="outlined"
                    onChange={handleItemNameChange}
                />

                <OutlinedInput
                    onKeyPress={(event) => {
                        if (!/[0-9]|\./.test(event.key) || //the key pressed is not the key for 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, or “.” OR
                            (/\./.test(event.key) && costChange.includes("."))) //it is a “.” AND the input value already includes a “.”
                        { event.preventDefault(); }
                    }}
                    id="outlined-adornment-amount"
                    value={costChange}
                    onChange={handleCostChange}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}

                />

                <CategoryCost />
                <Quantity />
                <DeleteButton />
                
            </div>
        </>

    )

};

export default NewItem;