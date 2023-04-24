import { useState } from "react";
import { connect } from "react-redux";
import "./EditPassword.css";
import { changePassword } from "../../store/actions/authActions";

const EditPassword = props => {
    const [ currentPassword, setCurrentPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmNewPassword, setConfirmNewPassword ] = useState('');
    const [ validationError, setValidationError ] = useState(null);

    const updatePasswordHandler = e => {
        e.preventDefault();
        const updatePassword = { currentPassword, newPassword };
        if (newPassword !== confirmNewPassword) {
            setValidationError('New password doest not match!');
        } else if (currentPassword === newPassword) {
            setValidationError('New password should not match old password!')
        } else if (newPassword.length < 6) {
            setValidationError('password must be atleast 6 charachters!');
        } else {
            setValidationError(null);
            props.onEditPassword(updatePassword);
        };
    };

    return (
        <div>
            <h3>Edit Password</h3>
            <p>{ props.error }</p>
            <p>{ validationError }</p>
            <form className="Form" onSubmit={updatePasswordHandler}>
                <input 
                    type="password" 
                    name="current-password" 
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                />
                <input 
                    type="password" 
                    name="new-password" 
                    placeholder="New Password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />
                <input 
                    type="password" 
                    name="confirm-new-password" 
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                />
                <button>Confirm</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
    onEditPassword: passwords => dispatch(changePassword(passwords))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);