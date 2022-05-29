//components
import DeleteButton from './buttons/DeleteButton';
//css
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

const SavedCard = ({ project, deleteProject }) => {

    const cardStyle = {
        width: "300px",
        margin: "auto",
        paddingTop: "10px",
        // backgroundColor: "#f2f8ff",
        // backgroundColor: "#f0f3f7",
        // opacity: "80%",
    }; // custom styling for card

    return (
        <Card style={cardStyle}>
                <CardContent >
                    <p className="saved-text-status"> {project.status} </p>
                    <p className="saved-text-date"> {project.recorded.slice(0, 10)} </p>
                    <p className="saved-text-name"> {project.name} </p>
                    <p className="saved-text-items"> View Items ({Object.values(project.items).length}) </p>
                    <p className="saved-text-cost"> Project total: $ {project.cost} </p>
                </CardContent>
            <div className="trashcan-on-card-div">
                <DeleteButton id={project.id} deleteItem={deleteProject} />
            </div>
        </Card>
    )

};

export default SavedCard;