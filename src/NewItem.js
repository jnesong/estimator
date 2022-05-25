//libraries
import { useState } from 'react';
//css
import TextField from '@mui/material/TextField';


const NewItem = () => {

    const [itemName, setItemName] = useState("")

    const handleItemNameChange = (e) => {
        setItemName(e.target.value);
    }

    console.log(itemName)

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


            </div>
        </>

    )

};

export default NewItem;