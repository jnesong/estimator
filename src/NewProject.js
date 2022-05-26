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



const NewProject = () => {

    const [projectName, setProjectName] = useState(""); // holds user entered project name, updates onChange
    const [infoRadio, setInfoRadio] = useState(""); // holds user selected status, string to display to user, updates onChange
    const [status, setStatus] = useState("usable"); //holds user selected status value, updated onChange
    const [newItems, setNewItems] = useState([<NewItem key={1} count={1} deleteItem={deleteItem} createItemsArray={createItemsArray} />]); 
    // ^ holds array of item-line form to add new item-line, default starts with 1, each item line is passed a key, a matching count/id
    // modifications to this requires to change to holdItemCount <NewItem /> component
    const [itemsArray, setItemsArray] = useState([]); //holds array of user created item-lines
    const savedProject = {};
    //^ object to keep each project's data together.... this may need to be changed but goal is to send this to server
    let [totalProjectCost, setTotalProjectCost] = useState(0); // this is super buggy cost holder, needs critical work on accurate calculating

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value);
    }; // updates projectName state with user typing

    const handleRadioChange = (e) => {
        setStatus(e.target.value);
    }; // updates status value with user selection

    const holdItemCount = (count) => {
        setNewItems([...newItems, <NewItem key={count} count={count} deleteItem={deleteItem} createItemsArray={createItemsArray} />]);
        //^ with every "add new item" click, a <NewItem /> component is added to the newItems array and the count becomes the identifier. 
        // this is going to be a problem when the count resets but my projectdb.json does not... may need to clear server with each page refresh.
        // or save the count somewhere on my server 
        itemsArray.forEach(item => {
            setTotalProjectCost(totalProjectCost => totalProjectCost + parseInt(item.cost));
            console.log(totalProjectCost);
        }); // this is supposed to calculate the cost per project but it is really buggy. FIX THIS ***** 
    };

    function deleteItem(count) {
        let deleteFiltered = newItems.filter(item => item.props.count !== count); 
        setNewItems(deleteFiltered); // deletes display of <NewItem /> form component 
        let deletedItem = itemsArray.filter(item => item.id !== count); 
        setItemsArray(deletedItem); // deletes display of <NewItem /> form component 
    }; // this is NOT for project deletion, a project HAS MANY items and items BELONG TO a project

    function createItemsArray(item) {
        setItemsArray([...itemsArray, item]);
    }; // 

    console.log(status)
    console.log(projectName)
    console.log(itemsArray)

    function handleSubmit(e) {
        e.preventDefault();
        console.log("save clicked!");
        savedProject[projectName] = status;
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
                                value="proactive"
                            />
                            <Radio
                                color="warning"
                                onClick={() => setInfoRadio("Usable")}
                                onChange={handleRadioChange}
                                value="usable"
                            />
                            <Radio
                                color="error"
                                onClick={() => setInfoRadio("Unusable")}
                                onChange={handleRadioChange}
                                value="unusable"
                            />


                        </RadioGroup>

                    </div>

                    <p className="info-radio"> {infoRadio} </p>
                    <p className="project-name-display"> {projectName} total:  $ {totalProjectCost ? totalProjectCost : 0} </p>

                </div>

                <br />

                {newItems}

                <div className="add-button">
                    <AddItem
                        holdItemCount={holdItemCount}
                    />
                </div>

                <div className="save-button">
                    <Button variant="outlined" color="success" type="submit">
                        Save Project
                    </Button>
                </div>

            </form>

            <Saved
                savedProject={savedProject}
            />
        </>
    )
};

export default NewProject;