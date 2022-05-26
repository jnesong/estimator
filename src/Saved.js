//css
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions } from '@mui/material';

const Saved = ({ savedIssue }) => {

    const cardStyle = {
        width: "950px",
        margin: "auto",
        marginLeft: "200px",
    }

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
                <Card style={cardStyle}>
                    <CardActionArea>
                        <CardContent>
                            <p className="saved-text"> issue </p>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Stack>
        </div>
    )

};

export default Saved;