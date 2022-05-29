//components
import DeleteButton from './buttons/DeleteButton';
//css

const SavedCardAlt = ({ project, deleteProject }) => {

    return (
        <div className="saved-card-div">
            <p className="saved-text-status"> {project.status} </p>
            <p className="saved-text-date"> {project.recorded.slice(0, 10)} </p>
            <p className="saved-text-main"> {project.name} </p>
            <p className="saved-text-main"> View Items ({Object.values(project.items).length}) </p>
            <p className="saved-text-main"> Project total: $ {project.cost} </p>
            <div className="trashcan-on-card-div">
                <DeleteButton id={project.id} deleteItem={deleteProject} />
            </div>
        </div>
    )

};

export default SavedCardAlt;