//libraries
import { useState, useEffect } from 'react';
//components
import CategoryCost from './CategoryCost'
import DeleteButton from './buttons/DeleteButton';
import Quantity from './Quantity';
//css
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

const NewItem = ({ count, deleteItem, createItemLine, saveClicked }) => {

    const [itemName, setItemName] = useState("")
    const [itemCost, setItemCost] = useState(0)
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [itemLineObj, setItemLineObj] = useState({})

    createItemLine(itemLineObj) //send item line object up to New Project component

    const handleItemNameChange = (e) => {
        setItemName(e.target.value);
    } // updates item name with user typing

    const handleCostChange = (e) => {
        setItemCost(e.target.value);
    } // updates item cost with user typing 

    useEffect(() => {
        setItemLineObj({
            id: count,
            name: itemName,
            cost: itemCost,
            category: category,
            quantity: quantity
        })
    }, [count, itemName, itemCost, category, quantity])
    // updates itemLineObj with change in any item inputs

    function holdCategory(category) {
        setCategory(category)
    } // updates category with user selection
    function holdQuantity(quantity) {
        setQuantity(quantity)
    } //updates quantity with user selection 

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
                            (/\./.test(event.key) && itemCost.includes("."))) //it is a “.” AND the input value already includes a “.”
                        { event.preventDefault(); }
                    }}
                    id="outlined-adornment-amount"
                    value={itemCost}
                    onChange={handleCostChange}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}

                />

                <CategoryCost holdCategory={holdCategory} />
                <Quantity holdQuantity={holdQuantity} />
                <DeleteButton count={count} deleteItem={deleteItem} />

            </div>
        </>

    )

};

export default NewItem;