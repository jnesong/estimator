//libraries
import { useState, useEffect } from 'react';
//components
// import CategoryCost from './CategoryCost'
import DeleteButton from './buttons/DeleteButton';
// import Quantity from './Quantity';
//css
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const EditItem = ({ id, item, projectId, deleteItem, createItemLine }) => {
    const serverURL = "http://localhost:3000/projects"; // array of displayed projects
    const [itemName, setItemName] = useState("")
    const [itemCost, setItemCost] = useState(0)
    const [currentProject, setCurrentProject] = useState({})
    console.log(item)

    // console.log(currentProject)

    // useEffect(() => {
    //     fetch(serverURL + `/${projectId}`)
    //         .then(r => r.json())
    //         .then(project => setCurrentProject(project))
    // }, [projectId]);



    //variables for category and quantity
    const filter = createFilterOptions();
    const [category, setCategory] = useState("");
    const categories = ['All Inclusive', 'Labor', 'Materials'];
    const [quantity, setQuantity] = useState('1');
    const quantities = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    const handleCategoryChange = (e, newValue) => {
        if (typeof newValue === 'string') {
            setCategory(newValue);
        } else if (newValue && newValue.inputValue) {
            setCategory(newValue.inputValue);
        } else { setCategory(newValue); }
    };

    const handleQuantityChange = (e, newQuantity) => {
        if (typeof newQuantity === 'string') {
            setQuantity(newQuantity);
        } else if (newQuantity && newQuantity.inputValue) {
            setQuantity(newQuantity.inputValue);
        } else { setQuantity(newQuantity); }
    };

    const handleItemNameChange = (e) => {
        setItemName(e.target.value);
    } // updates item name with user typing

    const handleCostChange = (e) => {
        setItemCost(e.target.value);
    } // updates item cost with user typing 

    useEffect(() => {
        let currentItem = {
            id: id,
            name: itemName,
            cost: itemCost,
            category: category,
            quantity: quantity
        }
        createItemLine(currentItem) //send item line object up to Edit Modal component
    }, [id, createItemLine, itemName, itemCost, category, quantity])
    // updates itemLineObj with change in any item inputs

    return (
        <>
            <TextField
                required
                id="outlined-required"
                label="Item"
                variant="outlined"
                defaultValue={item.name}
                onChange={handleItemNameChange}
            />

            <OutlinedInput
                onKeyPress={(event) => {
                    if (!/[0-9]|\./.test(event.key) || //the key pressed is not the key for 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, or “.” OR
                        (/\./.test(event.key) && itemCost.includes("."))) //it is a “.” AND the input value already includes a “.”
                    { event.preventDefault(); }
                }}
                id="outlined-adornment-amount"
                defaultValue={item.cost}
                onChange={handleCostChange}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}

            />

            <Autocomplete
                defaultValue={item.category}
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

            <Autocomplete
                onKeyPress={(event) => {
                    if (!/[0-9]|\./.test(event.key) || //the key pressed is not the key for 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, or “.” OR
                        (/\./.test(event.key) && quantity.includes("."))) //it is a “.” AND the input value already includes a “.”
                    { event.preventDefault(); }
                }}
                defaultValue={item.quantity}
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

            <DeleteButton id={id} deleteItem={deleteItem} />


        </>

    )

};

export default EditItem;