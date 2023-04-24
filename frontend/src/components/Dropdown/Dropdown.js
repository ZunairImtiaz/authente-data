import { connect } from 'react-redux';
import './Dropdown.css';
import { showModel, editProfile, editPassword } from '../../store/actions/authActions';

const Dropdown = props => (
    <div className="Dropdown">
        <button className="Dropbtn">Setting</button>
        <div className="Dropdown-content">
            <p onClick={props.onEditProfile}>Edit Profile</p>
            <p onClick={props.onEditPassword}>Edit Password</p>
        </div>
    </div>
);

const mapDispatchToProps = dispatch => ({
    onEditProfile() {
        dispatch(showModel());
        dispatch(editProfile());
    },
    onEditPassword() {
        dispatch(showModel());
        dispatch(editPassword());
    }
});

export default connect(null, mapDispatchToProps)(Dropdown);