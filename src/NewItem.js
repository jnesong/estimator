//css
import TextField from '@mui/material/TextField';


const NewItem = () => {

    return (
        <>
            <div className="new-item">
                <div className="item-name">
                    <TextField
                        required
                        id="outlined-required"
                        label="Item"
                        variant="outlined"
                    />
                </div>


            </div>
        </>

    )

};

export default NewItem;