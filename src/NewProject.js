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

    const [projectName, setProjectName] = useState("");
    const [infoRadio, setInfoRadio] = useState("");
    const [radioStatus, setRadioStatus] = useState("usable");
    const [newItems, setNewItems] = useState([<NewItem key={1} count={1} deleteItem={deleteItem} createItemsArray={createItemsArray} />]);
    const [itemsArray, setItemsArray] = useState([]);
    const savedProject = {};
    //cost
    let [totalProjectCost, setTotalProjectCost] = useState(0);

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value);
    };

    const handleRadioChange = (e) => {
        setRadioStatus(e.target.value);
    };

    const holdItemCount = (count) => {
        setNewItems([...newItems, <NewItem key={count} count={count} deleteItem={deleteItem} createItemsArray={createItemsArray} />]);
        setTotalProjectCost(0);
        itemsArray.forEach(item => {
            setTotalProjectCost(totalprojectCost => totalProjectCost + parseInt(item.cost));
            console.log(totalProjectCost);
        });
    };

    function deleteItem(count) {
        let deleteFiltered = newItems.filter(item => item.props.count !== count);
        let deletedItem = itemsArray.filter(item => item.id !== count);
        setNewItems(deleteFiltered);
        setItemsArray(deletedItem);
    };

    function createItemsArray(item) {
        setItemsArray([...itemsArray, item]);
    };

    console.log(radioStatus)
    console.log(projectName)
    console.log(itemsArray)

    function handleSubmit(e) {
        e.preventDefault();
        console.log("save clicked!");
        savedProject[projectName] = radioStatus;
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
                        Save project
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