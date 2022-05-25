//libraries
import { useState } from 'react';

//css
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const NewItem = () => {

    const [infoRadio, setInfoRadio] = useState("");
    const [radioStatus, setRadioStatus] = useState("proactive");

    const handleChange = (e) => {
        setRadioStatus(e.target.value);
    };



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
                        name="row-radio-buttons-group"
                    >

                        <Radio 
                        color="success" 
                        onClick={() => setInfoRadio("Proactive")}
                        onChange={handleChange}
                        value="proactive"
                        />
                        <Radio 
                        color="warning"
                        onClick={() => setInfoRadio("Usable")}
                        onChange={handleChange}
                        value="usable"
                        />
                        <Radio
                        color="error" 
                        onClick={() => setInfoRadio("Unusable")}
                        onChange={handleChange}
                        value="unusable"
                        />


                    </RadioGroup>

                </div>

                <p className="info-radio"> {infoRadio} </p>


            </div>
        </>

    )

};

export default NewItem;