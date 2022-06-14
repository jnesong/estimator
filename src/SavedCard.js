//libraries
import { useState } from 'react';
//components
import DeleteButton from './buttons/DeleteButton';
import EditModal from './EditModal';
import EstimateCSV from './EstimateCSV';
//css
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const SavedCard = ({ project, deleteProject, holdEdit }) => {

    const cardStyle = {
        width: "300px",
        // height:"200px",
        margin: "auto",
        paddingTop: "10px",
        // backgroundColor: "#f2f8ff",
        // backgroundColor: "#f0f3f7",
        // opacity: "80%",
    }; // custom styling for card

    //state for edit/view items modal
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    //state to open card tools
    const [openTools, setOpenTools] = useState(false)
    const cardTools = <>
        <EstimateCSV project={project} />
        <IconButton color="info" aria-label="add to shopping cart" onClick={handleOpenModal} style={{ marginRight: "10px" }}>
            <EditIcon />
        </IconButton>
        <DeleteButton id={project.id} deleteItem={deleteProject} />
        </>

    return (
        <>
            <Card style={cardStyle}
                onMouseEnter={() => setOpenTools(true)}
                onMouseLeave={() => setOpenTools(false)}
            >
                <CardContent >
                    <p className="saved-text-status"> {project.status} </p>
                    <p className="saved-text-date"> {project.recorded.slice(0, 10)} </p>
                    <p className="saved-text-name"> {project.name} </p>
                    <p className="saved-text-items" onClick={handleOpenModal}> View Items ({Object.values(project.items).length}) </p>
                    <p className="saved-text-cost"> Project total: $ {project.cost} </p>
                </CardContent>
                <div className="tool-icons-on-card-div">
                    {openTools &&cardTools}
                </div>
            </Card>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal">
                    <EditModal project={project} holdEdit={holdEdit} />
                </Box>
            </Modal>
        </>
    )
};

export default SavedCard;