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



const NewIssue = () => {

    const [issueName, setIssueName] = useState("");
    const [infoRadio, setInfoRadio] = useState("");
    const [radioStatus, setRadioStatus] = useState("usable");
    const [newItems, setNewItems] = useState([<NewItem key={1} count={1} deleteItem={deleteItem} createItemsArray={createItemsArray} />]);
    const [itemsArray, setItemsArray] = useState([]);
    const savedIssue = {};
    //cost
    let [totalIssueCost, setTotalIssueCost] = useState(0);

    const handleIssueNameChange = (e) => {
        setIssueName(e.target.value);
    };

    const handleRadioChange = (e) => {
        setRadioStatus(e.target.value);
    };

    const holdItemCount = (count) => {
        setNewItems([...newItems, <NewItem key={count} count={count} deleteItem={deleteItem} createItemsArray={createItemsArray} />]);
        setTotalIssueCost(0);
        itemsArray.forEach(item => {
            setTotalIssueCost(totalIssueCost => totalIssueCost + parseInt(item.cost));
            console.log(totalIssueCost);
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
    console.log(issueName)
    console.log(itemsArray)

    function handleSubmit(e) {
        e.preventDefault();
        console.log("save clicked!");
        savedIssue[issueName] = radioStatus;
    }



    return (
        <>
            <form onSubmit={handleSubmit}>

                <div className="issue-name">
                    <TextField
                        required
                        id="outlined-required"
                        label="Issue Name"
                        variant="outlined"
                        style={{ width: "400px" }}
                        onChange={handleIssueNameChange}
                    />

                    <div className="issue-status">

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
                    <p className="issue-name-display"> {issueName} total:  $ {totalIssueCost ? totalIssueCost : 0} </p>

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
                        Save Issue
                    </Button>
                </div>

            </form>

            <Saved
                savedIssue={savedIssue}
            />
        </>
    )
};

export default NewIssue;