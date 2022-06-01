//libraries
import { useState } from 'react';
import uuid from 'react-uuid'
//components
import EditItem from './EditItem';
import EstimateCSV from './EstimateCSV';
//css
import './edit-modal.css'
import EditIcon from '@mui/icons-material/Edit';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const EditModal = ({ project, holdEdit }) => {
// compare to Landing.js
    const serverURL = "http://localhost:3000/projects"; // array of displayed projects
    const [projectData, setProjectData] = useState({
        name: project.name,
        status: project.status,
        cost: project.cost,
        items: project.items,
        recorded: project.recorded,
        id: project.id
    });
    const [editItemComponents, setEditItemComponents] = useState(Object.values(project.items).map(item => (
        <EditItem key={item.id} id={item.id} item={item} deleteItem={deleteItem} createItemLine={createItems} />
    )));

    function deleteItem(itemId) {
        let updatedItemComponents = editItemComponents.filter(item => item.props.id !== itemId);
        setEditItemComponents(updatedItemComponents);
        delete projectData.items[itemId];
        calculateCost(); // when item deleted, recalculate cost
    }; // this is NOT for project deletion, a project HAS MANY items and items BELONG TO a project

    function createItems(item) {
        projectData.items[item.id] = item;
    }; // making items object 

    const emptyItem = {
        id: "",
        name: "",
        cost: "",
        category: "",
        quantity: ""
    }; //to pass into EditItem component as item prop for new/blank item

    const handleAddItemLine = () => {
        setEditItemComponents([...editItemComponents, <EditItem key={uuid()} id={uuid()} item={emptyItem} deleteItem={deleteItem} createItemLine={createItems} />])
    };//adding item line component when Add New Item Line clicked in Edit Modal

    const handleEdit = (e) => {
        setProjectData({
            ...projectData,
            [e.target.name]: e.target.value,
        });
    };

    //creates patch request to project db.json when Save clicked in Edit Modal
    const handleSave = (e) => {
        e.preventDefault();
        console.log(projectData)
        fetch(serverURL + `/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectData)
        })
            .then(r => r.json())
            .then(editedProject => holdEdit(editedProject)) // updates display/client side, in Saved component
    };

    // calculateCost() runs with every click out of an item line field and when item line deleted
    function calculateCost() {
        let totalCost = 0;
        Object.values(projectData.items).forEach(item => {
            if (!!item.cost) {
                totalCost += parseFloat(item.cost) * parseInt(item.quantity)
            }
        })
        if (totalCost !== isNaN) {
            setProjectData({
                ...projectData,
                cost: totalCost,
            })
        };
    };

    return (
        <>
            <p> <EditIcon color="info" /> <AutoAwesomeIcon color="info" /> </p>
            <form onSubmit={handleSave} className="edit-form" >
                <TextField
                    required
                    id="outlined-required"
                    name="name"
                    defaultValue={projectData.name}
                    label="Project Name"
                    variant="outlined"
                    style={{ width: "400px" }}
                    onChange={handleEdit}
                />

                <p className="project-name-display"> {projectData.name} total:  $ {!!projectData.cost ? projectData.cost : 'Quantity?'} </p>

                <div className="edit-status">
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label"> Status </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="status"
                            defaultValue={projectData.status}
                            label="status"
                            onChange={handleEdit}
                        >
                            <MenuItem value={"🟢"}>🟢</MenuItem>
                            <MenuItem value={"🟡"}>🟡</MenuItem>
                            <MenuItem value={"🔴"}>🔴</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="edit-item-container" onBlur={calculateCost}>
                    {editItemComponents}
                </div>

                <div className="edit-button">
                    <Button variant="outlined" color="success" onClick={handleAddItemLine} startIcon={<AddIcon />}>
                        New Line Item
                    </Button>
                </div>

                <div className="edit-button">
                    <Button variant="outlined" color="success" type="submit" startIcon={<SaveIcon />}>
                        Save Changes
                    </Button>
                </div>

                <div className="csv-summary-div">
                    <EstimateCSV project={projectData} />
                </div>
            </form>
        </>

    );
};

export default EditModal;