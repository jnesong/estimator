//libraries
import { useState } from 'react';

//components
import NewItem from './NewItem';
//css
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';


const NewIssue = () => {

    const [infoRadio, setInfoRadio] = useState("");
    const [radioStatus, setRadioStatus] = useState("proactive");

    const handleRadioChange = (e) => {
        setRadioStatus(e.target.value);
    };

    console.log(radioStatus)


    return (
        <>
            <form>

                <TextField
                    required
                    id="outlined-required"
                    label="Issue Name"
                    variant="outlined"
                />

                <div className="item-status">

                    <RadioGroup row name="row-radio-buttons-group" >

                        <Radio
                            color="success"
                            onClick={() => setInfoRadio("Proactive")}
                            onChange={handleRadioChange}
                            value="proactive"
                        />
                        <Radio
                            color="warning"
                            onClick={() => setInfoRadio("Usable")}
                            onChange={handleRadioChange}
                            value="usable"
                        />
                        <Radio
                            color="error"
                            onClick={() => setInfoRadio("Unusable")}
                            onChange={handleRadioChange}
                            value="unusable"
                        />


                    </RadioGroup>

                </div>

                <p className="info-radio"> {infoRadio} </p>

                <br />

                <NewItem />
                <NewItem />


            </form>
        </>
    )
};

export default NewIssue;