//components
import NewItem from './NewItem';
//css
import TextField from '@mui/material/TextField';


const NewIssue = () => {


    return (
        <>
            <form>

                <TextField
                    required
                    id="outlined-required"
                    label="Issue Name"
                    variant="outlined"
                />

                <br />

                    <NewItem/>
                    <NewItem/>


            </form>
        </>
    )
};

export default NewIssue;