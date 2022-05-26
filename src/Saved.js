//libraries
import { useEffect } from 'react';
//components
import DeleteButton from './buttons/DeleteButton';
//css
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { blue } from '@mui/material/colors';

const Saved = ({ savedProject }) => {

    const cardStyle = {
        width: "950px",
        margin: "auto",
        backgroundColor: "#d4e9ff"
    }

    console.log(savedProject)

    let savedList = []

    useEffect (() => {
        savedList.push(savedProject)
        return () => {console.log("cleanup!")}
    }, [savedProject])

    console.log(savedList)

    // let savedCards = savedProject.map(project => {
    //     <Card style={cardStyle} key={project.id}>
    //         <CardActionArea>
    //             <CardContent>
    //                 <p className="saved-text"> item.name </p>
    //             </CardContent>
    //         </CardActionArea>
    //     </Card>
    // })

    return (
        <div className="saved">
            <p className="projects-total-text"> Projects Total: $200 </p>
            <Stack>
                <div className="each-saved-div">
                    <Card style={cardStyle}>
                        <CardActionArea>
                            <CardContent>
                                <p className="saved-text"> Plumbing </p>
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