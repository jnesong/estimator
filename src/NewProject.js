//libraries
import { useState } from 'react';
//components
import NewItem from './NewItem';
import AddItem from './buttons/AddItem';
import Saved from './Saved';
//css
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';

let items = {};

const NewProject = () => {
    const serverURL = "http://localhost:3000/projects"; // array of displayed projects
    const [saveClicked, setSavedClicked] = useState(false); //this change tells the NewItem component to send up its data
    const [buttonSubmitToggle, setButtonSubmitToggle] = useState(true);
    const [projectName, setProjectName] = useState(""); // holds user entered project name, updates onChange
    const [infoRadio, setInfoRadio] = useState(""); // holds user selected status, string to display to user, updates onChange
    const [status, setStatus] = useState("usable"); //holds user selected status value, updated onChange
    const [newItems, setNewItems] = useState([<NewItem key={1} count={1} deleteItem={deleteItem} createItemLine={createItems} />]);
    // ^ holds array of item-line form to add new item-line, default starts with 1, each item line is passed a key, a matching count/id
    // modifications to this requires to change to holdItemCount <NewItem /> component
    let [totalProjectCost, setTotalProjectCost] = useState(0); // this is super buggy cost holder, needs critical work on accurate calculating

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value);
    }; // updates projectName state with user typing

    const handleRadioChange = (e) => {
        setStatus(e.target.value);
    }; // updates status value with user selection

    const holdItemCount = (count) => {
        setNewItems([...newItems, <NewItem key={count} count={count} deleteItem={deleteItem} createItemLine={createItems}/>]);
        //^ with every "add new item" click, a <NewItem /> component is added to the newItems array and the count becomes the identifier. 
        // this is going to be a problem when the count resets but my project db.json does not... may need to clear server with each page refresh.
    };

    function deleteItem(count) {
        let deleteFiltered = newItems.filter(item => item.props.count !== count);
        setNewItems(deleteFiltered); // deletes display of <NewItem /> form component 
        let updatedArray = items.filter(item => item.id !== count);
        items = updatedArray; // deletes display of <NewItem /> form component 
    }; // this is NOT for project deletion, a project HAS MANY items and items BELONG TO a project

    function createItems(item) {
        console.log(item)
        items[item.id] = item;
    }; // making items array per issue

    function handleSubmit(e) {
        e.preventDefault();
        setSavedClicked(!saveClicked); // this change tells the NewItem component to send up its data
        const savedProject = {
            name: projectName,
            status: status,
            cost: totalProjectCost,
            items: items
        }
        setButtonSubmitToggle(!buttonSubmitToggle);
        setTimeout(fetch(serverURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(savedProject)
        })
            .then(r => r.json())
            .then(data => console.log(data)), 300);
        setTimeout(() => { 
            setButtonSubmitToggle(true) 
            // setProjectName("")
            // setInfoRadio("")
            // setNewItems([<NewItem key={1} count={1} deleteItem={deleteItem} createItemLine={createItems} />])
            // items = {}
            // setTotalProjectCost(0)
            //^ not sure why these are not resetting the project form
        }, 900);
    };

    function calculateCost () {
        console.log("mouse moving!")
        let totalCost = 0;
        Object.values(items).forEach(item =>{
            totalCost += parseFloat(item.cost) * parseInt(item.quantity)
        })
        console.log(totalCost)
        setTotalProjectCost(totalCost)
    }

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
                {newItems}
                </div>

                <div className="add-button">
                    <AddItem
                        holdItemCount={holdItemCount}
                    />
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

export default NewProject;