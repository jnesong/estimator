//libraries
import { useState } from 'react';

//css
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const NewItem = () => {

    const [infoRadio, setInfoRadio] = useState("")



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

                <div className="item-status">

                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >

                        <Radio color="success" onClick={() => setInfoRadio("Critical")}/>
                        
                        <Radio color="warning" />
                        <Radio color="error" />


                    </RadioGroup>

                </div>

                <p className="info-radio"> {infoRadio} </p>


            </div>
        </>

    )

};

export default NewItem;