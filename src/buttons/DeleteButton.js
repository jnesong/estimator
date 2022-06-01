//css
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteButton = ( {id, deleteItem} ) => {

    const handleDeleteClick = () => {
        deleteItem(id);
    };

    return (
        <IconButton aria-label="delete" size="small" color="error" onClick={handleDeleteClick}>
            <DeleteIcon fontSize="small" />
        </IconButton>
    )

};

export default DeleteButton;