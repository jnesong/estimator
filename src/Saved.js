//libraries
import { useState, useEffect } from 'react';
//components
import SavedCard from './SavedCard';
//css
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';

const Saved = ({ savedProject }) => {

    const serverURL = "http://localhost:3000/projects"; // array of displayed projects

    const [savedList, setSavedList] = useState([]); // projects 
    const [undoStack, setUndoStack] = useState([]); // deleted projects
    const [totalSavedCost, setTotalSavedCost] = useState(0);

    function calculateSavedCost() {
        let totalSavedCost = 0;
        Object.values(savedList).forEach(project => {
            totalSavedCost += project.cost
        });
        setTotalSavedCost(totalSavedCost);
    }; // calculateCost() runs with every click out of an item line field 

    useEffect(() => {
        fetch(serverURL)
            .then(r => r.json())
            .then(data => setSavedList(data))
    }, [savedProject]); // GET fetch projects from projects db.json

    const deleteProject = (id) => {
        let byeProject = savedList.find(project => project.id === id); // find project being deleted, necessary to add to undo stack in db.json
        setUndoStack([...undoStack, byeProject]);
        //^ adds deleted project to undo stack
        fetch(serverURL + `/${id}`, {
            method: "DELETE"
        }); // deletes project from projects db.json
        let newSavedCards = savedList.filter(project => project.id !== id);
        setSavedList(newSavedCards); // removes project from visible projects array, without page refresh
    };

    const handleUndoClick = () => {
        if (undoStack[0]) { //if the undo stack has anything in it
            let lastDeleted = undoStack[undoStack.length - 1]; // set last item in the stack equal to lastDeleted
            setSavedList([...savedList, lastDeleted]); // add that to the displayed savedList, then post it to the backend projects db.json
            fetch(serverURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(lastDeleted)
            })
                .then(r => r.json())
                .then(data => console.log(data))
            undoStack.pop(); // remove it from the end of the stack
        } else { console.log("undo stack empty! ") };
    };

    //sorting functions
    const costSortHandle = () => {
        const updatedSavedList = [...savedList];
        updatedSavedList.sort((a, b) => a.cost - b.cost);
        setSavedList(updatedSavedList);
    };
    const alphabeticalSortHandle = () => {
        const updatedSavedList = [...savedList];
        updatedSavedList.sort((a, b) => {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        setSavedList(updatedSavedList);
    };
    const statusSortHandle = () => {
        const proactiveList = [];
        const serviceableList = [];
        const criticalList = [];
        savedList.forEach(project => {
            if (project.status === "🟢") { proactiveList.push(project) }
            else if (project.status === "🔴") { criticalList.push(project) }
            else { serviceableList.push(project) }
        });
        const updatedSavedList = [...criticalList, ...serviceableList, ...proactiveList];
        setSavedList(updatedSavedList);
    };

    //below, creates cards from savedList array
    let savedCardsList = savedList.map(project => (
        <SavedCard key={project.id} project={project} deleteProject={deleteProject} holdEdit={holdEdit}/>
    ));

    function holdEdit ( editedProject ) {
        const updatedSavedList = savedList.map( project => {
            if (project.id === editedProject.id) {
                return editedProject
            } else { return project}
        });
        setSavedList(updatedSavedList); 
    }; // connected with Edit Modal component to update client side when project edited

    return (
        <>
            <div className="saved">
                <p className="projects-total-text"> Projects Total: $ {totalSavedCost} </p>
                <div className="saved-nav">
                    <div className="sort-bar">
                        <p style={{ display: "inline", fontSize: "16px" }}> SORT BY:</p>
                        <Button variant="outlined" style={{ marginLeft: "16px" }} onClick={alphabeticalSortHandle}>Alphabet: A - Z</Button>
                        <Button variant="outlined" style={{ marginLeft: "16px" }} onClick={costSortHandle}> Cost: $ MIN - MAX </Button>
                        <Button variant="outlined" style={{ marginLeft: "16px" }} onClick={statusSortHandle}> Status: 🔴  🟡  🟢</Button>
                    </div>
                    <Button variant="outlined" startIcon={<UndoIcon />} onClick={handleUndoClick} style={{ width: "180px" }}>
                        Undo Delete
                    </Button>
                </div>
                <div className="saved-cards-grid" onMouseEnter={calculateSavedCost} onMouseLeave={calculateSavedCost} >
                    {savedCardsList}
                </div>
            </div>
        </>
    )

};

export default Saved;