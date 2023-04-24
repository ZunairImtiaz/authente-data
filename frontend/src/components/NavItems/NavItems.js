import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavItems.css';

const NavItems = props => (
    <div>
        {props.isAuth? <ul className='NavItems'>
            <li className="NavItem"><NavLink to='/'>Home</NavLink></li>
            <li className="NavItem"><NavLink to='/create'>Add New</NavLink></li>
            <li className="NavItem"><NavLink to='/logout'>LogOut</NavLink></li>
        </ul> : <ul className='NavItems'>
            <li className="NavItem"><NavLink to='/signup'>Signup</NavLink></li>
            <li className="NavItem"><NavLink to='/signin'>Login</NavLink></li>
        </ul>
        }
    </div>
);

const mapStateToProps = state => ({
    isAuth: state.auth.token != null
});

export default connect(mapStateToProps)(NavItems);