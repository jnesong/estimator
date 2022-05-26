//components
import DeleteButton from './buttons/DeleteButton';
//css
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea } from '@mui/material';

const Saved = ({ savedIssue }) => {

    const cardStyle = {
        width: "950px",
        margin: "auto",
    }

    console.log(savedIssue)

    // let savedCards = savedIssue.map(issue => {
    //     <Card style={cardStyle} key={issue.id}>
    //         <CardActionArea>
    //             <CardContent>
    //                 <p className="saved-text"> item.name </p>
    //             </CardContent>
    //         </CardActionArea>
    //     </Card>
    // })

    return (
        <div className="saved">
            <Stack>
                <div className="each-saved-div">
                    <Card style={cardStyle}>
                        <CardActionArea>
                            <CardContent>
                                <p className="saved-text"> issue </p>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <DeleteButton />
                </div>
            </Stack>
        </div>
    )

};

export default Saved;