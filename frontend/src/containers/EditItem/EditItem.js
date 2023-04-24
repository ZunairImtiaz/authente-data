import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import './EditItem.css';
import ItemForm from "../../components/ItemForm/ItemForm";
import { updateItemReq } from "../../store/actions/ItemsActions";

const EditItem = props => {
    const params = useParams();
    const itemId = params.id;
    const item = props.items.find(item => item._id === itemId);

    return (
        <div className="EditItem">
            <h1>Edit Item</h1>
            <ItemForm 
                item={item} 
                onSubmit={(item, navigate) => props.onEditItem(itemId, item, navigate)}
            />
        </div>
    );
};

const mapStateToProps = state => ({
    items: state.items
});

const mapDispatchToProps = dispatch => ({
    onEditItem: (id,item, navigate) => dispatch(updateItemReq(id, item, navigate))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);