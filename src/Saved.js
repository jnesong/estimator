//libraries
import { useState, useEffect } from 'react';
//components
import DeleteButton from './buttons/DeleteButton';
//css
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';

const Saved = ({ savedProject }) => {

    const serverURL = "http://localhost:3000/projects"; // array of displayed projects

    const cardStyle = {
        width: "900px",
        margin: "auto",
        backgroundColor: "#f2f8ff",
        opacity: "80%",
        padding: "25px"
    }; // custom styling for card

    console.log(savedProject);//will change, currently keep so useEffect knows when to fire
    const [savedList, setSavedList] = useState([]); // projects 
    const [undoStack, setUndoStack] = useState([]) // deleted projects

    useEffect(() => {
        fetch(serverURL)
            .then(r => r.json())
            .then(data => setSavedList(data))
    }, [savedProject]); // GET fetch projects from projects db.json

    const deleteProject = (id) => {
        let byeProject = savedList.find(project => project.id === id); // find project being deleted, necessary to add to undo stack in db.json
        setUndoStack([...undoStack, byeProject])
        //^ adds deleted project to undo stack
        fetch(serverURL + `/${id}`, {
            method: "DELETE"
        }); // deletes project from projects db.json
        let newSavedCards = savedList.filter(project => project.id !== id);
        setSavedList(newSavedCards); // removes project from visible projects array, without page refresh
    };

    const handleUndoClick = () => {
        if (undoStack[0]) {
            let lastDeleted = undoStack[undoStack.length - 1]
            setSavedList([...savedList, lastDeleted])
            fetch(serverURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(lastDeleted)
            })
                .then(r => r.json())
                .then(data => console.log(data))
            undoStack.pop()
        } else { console.log("undo stack empty! ") }
    };

    //below, creates cards from savedList array
    let savedCardsList = savedList.map(project => (
        <div className="each-saved-div" key={project.id}>
            <Card style={cardStyle}>
                <CardActionArea>
                    <CardContent>
                        <p className="saved-text-left"> {project.status} </p>
                        <p className="saved-text-left"> {project.name} </p>
                        <p className="saved-text-right"> Item Count: {project.items.length} </p>
                        <p className="saved-text-right"> $ {project.cost} </p>
                    </CardContent>
                </CardActionArea>
            </Card>
            <DeleteButton count={project.id} deleteItem={deleteProject} />
        </div>
    ));

    return (
        <div className="saved">
            <p className="projects-total-text"> Projects Total: $200 </p>
            <div className="saved-nav">
                <div /><div /><div />
                <Button variant="outlined" startIcon={<UndoIcon />} onClick={handleUndoClick}>
                    Undo
                </Button>
            </div>
            <Stack>
                {savedCardsList}
            </Stack>
        </div>
    )

};

export default Saved;


// <div className="each-saved-div">
// <Card style={cardStyle}>
//     <CardActionArea>
//         <CardContent>
//             <p className="saved-text"> Plumbing </p>
//         </CardContent>
//     </CardActionArea>
// </Card>
// <DeleteButton />
// </div>