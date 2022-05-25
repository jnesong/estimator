//libraries
import { useState } from 'react';

//components
import NewItem from './NewItem';
//css
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';


const NewIssue = () => {

    const [issueName, setIssueName] = useState("")
    const [infoRadio, setInfoRadio] = useState("");
    const [radioStatus, setRadioStatus] = useState("usable");

    const handleIssueNameChange = (e) => {
        setIssueName(e.target.value);
    };

    const handleRadioChange = (e) => {
        setRadioStatus(e.target.value);
    };


    console.log(radioStatus)
    console.log(issueName)


    return (
        <>
            <form>

                <div className="issue-name">
                    <TextField
                        required
                        id="outlined-required"
                        label="Issue Name"
                        variant="outlined"
                        style={{width:"400px"}}
                        onChange={handleIssueNameChange}
                    />

                    <div className="issue-status">

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

                </div>

                <br />

                <NewItem />
                <NewItem />


            </form>
        </>
    )
};

export default NewIssue;