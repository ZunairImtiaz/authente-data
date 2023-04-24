import './Model.css';
import Backdrop from '../Backdrop/Backdrop';

const Model = props => {
    return (
        <div>
            <Backdrop />
            <div className="Model">
                {props.children}
            </div>
        </div>
    );
};

export default Model;