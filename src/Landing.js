//libraries
import { useState } from 'react';
import uuid from 'react-uuid'
//components
import NewItem from './NewItem';
import Saved from './Saved';
//css
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';

let items = {};

const Landing = () => {
    const serverURL = "http://localhost:3000/projects"; // array of displayed projects
    const [saveClicked, setSavedClicked] = useState(false); //this is used to let other components know when save has been clicked
    const [buttonSubmitToggle, setButtonSubmitToggle] = useState(true); // controls display on save button
    const [projectName, setProjectName] = useState(""); // holds user entered project name, updates onChange
    const [infoRadio, setInfoRadio] = useState(""); // holds user selected status, string to display to user, updates onChange
    const [status, setStatus] = useState("🟡"); //holds user selected status value, updated onChange
    let [totalProjectCost, setTotalProjectCost] = useState(0); // holds total of all items' costs to display at the top right
    const [newItemComponents, setNewItemComponents] = useState([<NewItem key={1} id={1} deleteItem={deleteItem} createItemLine={createItems} />])
    let date = new Date() //current date and time


    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value);
    }; // updates projectName state with user typing

    const handleRadioChange = (e) => {
        setStatus(e.target.value);
    }; // updates status value with user selection

    const handleAddItem = () => {
        setNewItemComponents([...newItemComponents, <NewItem key={uuid()} id={uuid()} deleteItem={deleteItem} createItemLine={createItems} />])
    };

    function deleteItem(itemId) {
        let updatedItemComponents = newItemComponents.filter(item => item.props.id !== itemId);
        setNewItemComponents(updatedItemComponents);
        delete items[itemId];
        calculateCost();
    }; // this is NOT for project deletion, a project HAS MANY items and items BELONG TO a project

    function createItems(item) {
        items[item.id] = item;
    }; // making items object 

    function handleSubmit(e) {
        e.preventDefault();
        setSavedClicked(!saveClicked);
        const savedProject = {
            name: projectName,
            status: status,
            cost: totalProjectCost,
            items: items,
            recorded: date
        } // creates object to send to server
        console.log(savedProject)
        setButtonSubmitToggle(!buttonSubmitToggle);
        setTimeout(fetch(serverURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(savedProject) // project object sent to server in JSON string
        })
            .then(r => r.json())
            .then(data => console.log(data)), 300); // 1/3 second timeout placed on this
        setTimeout(() => {
            setButtonSubmitToggle(true)
            // setProjectName("")
            // setInfoRadio("")
            // setNewItems([<NewItem key={1} count={1} deleteItem={deleteItem} createItemLine={createItems} />])
            // items = {}
            // setTotalProjectCost(0)
            //^ not sure why these are not resetting the project form
        }, 900); // this setTimeout toggles the save button display from a check back to save
    };

    // calculateCost() runs with every click out of an item line field 
    function calculateCost() {
        let totalCost = 0;
        Object.values(items).forEach(item => {
            if (item.cost !== '') {
                totalCost += parseFloat(item.cost) * parseInt(item.quantity)
            }
        })
        setTotalProjectCost(totalCost)
    };

    let newItemComponentsList = newItemComponents.map(component => (
        component
    )); // allows first item line component to be deleted

    return (
        <>
            <form onSubmit={handleSubmit}>

                <div className="project-name">
                    <TextField
                        required
                        id="outlined-required"
                        label="Project Name"
                        variant="outlined"
                        style={{ width: "400px" }}
                        onChange={handleProjectNameChange}
                    />

                    <div className="project-status">

                        <RadioGroup row name="row-radio-buttons-group" >

                            <Radio
                                color="success"
                                onClick={() => setInfoRadio("Proactive")}
                                onChange={handleRadioChange}
                                value="🟢"
                            />
                            <Radio
                                color="warning"
                                onClick={() => setInfoRadio("Serviceable")}
                                onChange={handleRadioChange}
                                value="🟡"
                            />
                            <Radio
                                color="error"
                                onClick={() => setInfoRadio("Critical")}
                                onChange={handleRadioChange}
                                value="🔴"
                            />


                        </RadioGroup>

                    </div>

                    <p className="info-radio"> {infoRadio} </p>
                    <p className="project-name-display"> {projectName} total:  $ {totalProjectCost ? totalProjectCost : 0} </p>

                </div>

                <br />

                <div onBlur={calculateCost}>
                    {newItemComponentsList}
                </div>

                <div className="add-button">
                    <Button variant="outlined" color="success" onClick={handleAddItem}>
                        Add New Line Item
                    </Button>
                </div>

                <div className="save-button">
                    <Button variant="outlined" color="success" type="submit">
                        {buttonSubmitToggle ? "submit" : "✔ scroll down"}
                    </Button>
                </div>

            </form>

            <Saved
                savedProject={saveClicked}
            />
        </>
    )
};

export default Landing;