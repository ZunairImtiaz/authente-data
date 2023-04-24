import { connect } from 'react-redux';
import './Filters.css';
import { getItemsReq } from '../../store/actions/ItemsActions';
import { setSortField, setSortType, setSearchValue } from '../../store/actions/filtersActions';

const Filters = props => {
    return (
        <form className='FilterForm'>
            <div>
                <label><strong>Sort By: </strong></label>
                <select 
                    className='Dropdown-Select'
                    value={props.sortField} 
                    onChange={e => props.onSetSortField(e.target.value)}
                    >
                    <option value='createdAt' className='Dropdown-Option'>Date</option>
                    <option value='name' className='Dropdown-Option'>Name</option>
                    <option value='description' className='Dropdown-Option'>Description</option>
                    <option value='price' className='Dropdown-Option'>Price</option>
                    <option value='quantity' className='Dropdown-Option'>Quantity</option>
                </select>

                <strong>Assending: </strong>
                <label className="Switch">
                    <input type="checkbox" value={props.sortType} onChange={
                            e => {
                                let value;
                                value = e.target.checked ? 'asc' : 'desc';
                                props.onSetSortType(value)
                            }
                        }/>
                    <span className="Slider Round"></span>
                </label>
            </div>
            <div>
                <input 
                    type="text" 
                    placeholder="Search. . ." 
                    value={props.searchValue} 
                    onChange={e => props.onSetSearchValue(e.target.value)}
                />
                <button className='Btn' onClick={e => {
                        e.preventDefault();
                        const filters = {
                            sortField: props.sortField,
                            sortType: props.sortType,
                            searchValue: props.searchValue
                        };
                        props.onGetItems(filters);
                    }}>Search</button>
            </div>
        </form>
    );
};

const mapStateToProps = state => ({
    sortField: state.filters.sortField,
    sortType: state.filters.sortType,
    searchValue: state.filters.searchValue
});

const mapDispatchToProps = dispatch => ({
    onSetSortField: value => dispatch(setSortField(value)),
    onSetSortType: value => dispatch(setSortType(value)),
    onSetSearchValue: value => dispatch(setSearchValue(value)),
    onGetItems: filters => dispatch(getItemsReq(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);