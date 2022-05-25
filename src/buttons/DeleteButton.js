//css
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteButton = ( {count, deleteItem} ) => {

    const handleDeleteClick = () => {
        deleteItem(count)
    }

    return (
        <IconButton aria-label="delete" size="small" color="error" onClick={handleDeleteClick}>
            <DeleteIcon fontSize="small" />
        </IconButton>
    )

};

export default DeleteButton;