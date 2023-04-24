import { connect } from 'react-redux';
import './AddItem.css';
import ItemForm from '../../components/ItemForm/ItemForm';
import { addItemReq } from '../../store/actions/ItemsActions';

const AddItem = props => {

    return (
        <div className="AddItem">
            <h3>Add New Item</h3>
            <ItemForm onSubmit={props.onAddItem} />
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    onAddItem: (item, navigate) => dispatch(addItemReq(item, navigate))
});

export default connect(null, mapDispatchToProps)(AddItem);