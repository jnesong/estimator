//css
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const SaveModal = () => {

    const styleModal = {
        position: 'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%, -50%)',
        width: 600,
        border: '1px solid #000',
    };


    return (
        <Box style={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
        </Box>

    );
};

export default SaveModal;