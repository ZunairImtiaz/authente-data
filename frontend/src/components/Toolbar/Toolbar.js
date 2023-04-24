import { connect } from 'react-redux';
import './Toolbar.css';
import NavItems from '../NavItems/NavItems';
import Dropdown from '../Dropdown/Dropdown';

const Toolbar = props => (
    <header className='Toolbar'>
        <div className='User'>
        <p>{props.isAuth? props.name : 'Authenticate' }</p>
        </div>
        <nav>
            <NavItems/>
        </nav>
        { props.isAuth && <Dropdown/> }
    </header>
);

const mapStateToProps = state => ({
    name: state.auth.user?.name,
    isAuth: state.auth.token !== null
});

export default connect(mapStateToProps)(Toolbar);