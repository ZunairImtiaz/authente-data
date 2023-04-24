import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const ItemForm = props => {
    const [ name, setName ] = useState(props.item ? props.item.name : '');
    const [ description, setDescription ] = useState(
        props.item ? props.item.description : ''
    );
    const [ price, setPrice ] = useState(props.item ? props.item.price : '');
    const [ quantity, setQuantity ] = useState(props.item ? props.item.quantity : '');
    const [ validationError , setValidationError ] = useState(null);
    
    const navigate = useNavigate();

    const addItem = e => {
        e.preventDefault();
        const item = { name, description, price, quantity };
        if (description?.length > 66) {
            setValidationError('description length must be less than 66 charachters');
        } else {
            props.onSubmit(item, navigate);
            setValidationError(null);
        };
    };


    return (
        <div className='ItemForm'>
            { props.errorMessage }
            { validationError }
            <form className='Form' onSubmit={addItem}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input 
                    type="text" 
                    name="description" 
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input 
                    type="text" 
                    name="price" 
                    placeholder="Price"
                    value={price}
                    onChange={e => {
                        const priceInput = e.target.value;
                        if (priceInput.match(/^\d*(\.\d{0,2})?$/)) {
                            setPrice(priceInput)
                        }
                    }}
                />
                <input 
                    type="text" 
                    name="quantity" 
                    placeholder="Quantity"
                    value={quantity}
                    onChange={e => {
                        const quantityInput = e.target.value;
                        if (quantityInput.match(/^\d*?$/)) {
                            setQuantity(quantityInput)
                        }
                    }}
                />
                <button>Submit</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    errorMessage: state.auth.error
});

export default connect(mapStateToProps)(ItemForm);