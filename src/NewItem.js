//libraries
import { useState } from 'react';
//css
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const NewItem = () => {

    const [itemName, setItemName] = useState("")
    const [category, setCategory] = useState("Other")

    const handleItemNameChange = (e) => {
        setItemName(e.target.value);
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    console.log(itemName)
    console.log(category)

    return (
        <>
            <div className="new-item">
                <div className="item-name">
                    <TextField
                        required
                        id="outlined-required"
                        label="Item"
                        variant="outlined"
                        onChange={handleItemNameChange}
                    />
                </div>

                <div className="category">
                    <Select id="demo-select-small" value={category} label="Category" onChange={handleCategoryChange}>
                        <MenuItem value="">
                            <em>Other</em>
                        </MenuItem>
                        <MenuItem value={"material"}> Material Cost </MenuItem>
                        <MenuItem value={"labor"}> Labor Cost </MenuItem>
                        <MenuItem value={"all"}> All Inclusive </MenuItem>
                    </Select>
                </div>

            </div>
        </>

    )

};

export default NewItem;