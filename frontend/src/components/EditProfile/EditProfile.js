import { useState } from "react";
import { connect } from "react-redux";
import './EditProfile.css';
import { updateUser } from "../../store/actions/authActions";

const EditProfile = props => {
    const [ name, setName ] = useState(props.name);
    const [ email, setEmail ] = useState(props.email);
    const [ age, setAge ] = useState(props.age);
    const [ validationError, setValidationError ] = useState(null);

    const updateProfileHandler = e => {
        e.preventDefault();
        const updateData = { name, email, age };
        const pattren = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (name.length < 3) {
            setValidationError('name must be atleast 3 charachters!');
        } else if (!pattren.test(email)) {
            setValidationError('enter valid email!');
        } else if (age < 0 || age > 100) {
            setValidationError('enter valid age!');
        } else {
            props.onEditUser(updateData);
        };
    };

    return (
        <div>
            <h3>Edit Profile</h3>
            <p>{ validationError }</p>
            <form className="Form" onSubmit={updateProfileHandler}>
                <input 
                    type="text" 
                    name="name" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input 
                    type="email" 
                    name="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="number" 
                    name="age" 
                    value={age}
                    onChange={e => setAge(e.target.value)}
                />
                <button>Confirm</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    name: state.auth.user?.name,
    email: state.auth.user?.email,
    age: state.auth.user?.age
});

const mapDispatchToProps = dispatch => ({
    onEditUser: userData => dispatch(updateUser(userData))
});

export default connect(mapStateToProps,mapDispatchToProps)(EditProfile);