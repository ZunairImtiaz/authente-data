import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Item.css';
import { deleteItemReq, updateItemReq } from '../../../store/actions/ItemsActions';

const Item = props => {
    const navigate = useNavigate();
    
    return(
        <div className='Item'>
            <strong>Product Name: {props.item.name}</strong>
            <p><strong>Price:</strong> {props.item.price}</p>
            <p><strong>Quantity:</strong> {props.item.quantity}</p>
            {props.item.description ? <p><strong>Description:</strong> {props.item.description}</p> : null}
            <p><strong>Date: {props.item.createdAt}</strong></p>
            <button className='Item-Btn Item-Edit' onClick={() => navigate(`/edit/${props.item._id}`) }>Edit</button>
            <button className='Item-Btn Item-Delete' onClick={() => props.onDeleteHandler(props.item._id)}>Delete</button>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    onDeleteHandler: id => dispatch(deleteItemReq(id)),
    onEditHandler: () => dispatch(updateItemReq())
});

export default connect(null, mapDispatchToProps)(Item);