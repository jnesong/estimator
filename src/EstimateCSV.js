//css
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

const EstimatePDF = ({ project }) => {

    let downloadDate = new Date();
    let itemStrings = Object.values(project.items).map(( item ) => (
        `\n${item.name}, ${item.cost}, ${item.category}, ${item.quantity}`
    ));

    itemStrings = itemStrings.toString()

    let dataString = `Project Name, ${project.name} 
    Status, ${project.status} 
    Total Cost, ${project.cost}
    Date Recorded, ${project.recorded.slice(0, 10)}
    \n
    Item Report:
    Name, Cost, Category, Quantity
    ${itemStrings}
    `


    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([dataString], { type: 'text/csv' });
        element.href = URL.createObjectURL(file);
        element.download = `Project ${project.name}_${downloadDate}.csv`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    return (
        <>
            <footer>
                <Button variant="outlined" color="info" type="submit" onClick={handleDownload} startIcon={<DownloadIcon />}>
                    CSV summary
                </Button>
            </footer>
        </>
    );
};

export default EstimatePDF;