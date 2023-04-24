import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Item from './Item/Item';
import { getItemsReq } from '../../store/actions/ItemsActions';

const Items = props => {
    const effectRan = useRef(false);
    
    useEffect(() => {
        if (effectRan.current === false) {
            props.onGetItems(props.filters);
            return () => {
                effectRan.current = true;
            };
        };
    },[props]);

    let renderItems = props.items.map(item => (<Item key={item._id} item={item} />));

    return (
        <div>
            <h4>Total Items: {props.items.length}</h4>
            { renderItems }
        </div>
    );
};

const mapStateToProps = state => ({
    items: state.items,
    filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
    onGetItems: filters => dispatch(getItemsReq(filters))
})

export default connect(mapStateToProps,mapDispatchToProps)(Items);