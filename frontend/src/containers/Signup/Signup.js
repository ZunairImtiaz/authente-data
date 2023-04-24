import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import './Signup.css';
import Spinner from '../../components/Spinner/Spinner';
import { signup } from '../../store/actions/authActions';

const Signup = props => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ age, setAge ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ validationError, setValidationError ] = useState(null);

    const signupHandler = e => {
        e.preventDefault();
        const authData = { name, email, age, password };
        const pattren = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (name.length < 3) {
            setValidationError('name must be atleast 3 charachters!');
        } else if (!pattren.test(email)) {
            setValidationError('enter valid email!');
        } else if (age < 0 || age > 100) {
            setValidationError('enter valid age!');
        } else if (password !== confirmPassword) {
            setValidationError('incorrect password!');
        } else if (password.length < 6) {
            setValidationError('password must be atleast 6 charachters!');
        } else {
            setValidationError(null);
            props.onAuth(authData);
        }
    };

    let form = (
        <form className='Form' onSubmit={signupHandler}>
            <input 
                type="text" 
                name="name" 
                placeholder="Your name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
            />
            <input 
                type="email" 
                name="email" 
                placeholder="Your email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
            />
            <input 
                type="number" 
                name="age" 
                placeholder="Your age" 
                value={age} 
                onChange={e => setAge(e.target.value)} 
            />
            <input 
                type="password" 
                name="password" 
                placeholder="Your password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
            />
            <input 
                type="password" 
                name="confirm-password" 
                placeholder="Confirm passord" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
            />
            <button>Signup</button>
        </form>
    );

    if (props.loading) {
        form = <Spinner/>
    };
    let errorMessage = null;
    if (props.error) {
        errorMessage = <p>{ props.error }</p>;
    };
    let authNavigate = null;
    if (props.isAuth) {
        authNavigate = <Navigate to="/" />
    };

    return (
        <div className='Signup'>
            { authNavigate }
            <h3>Sign Up</h3>
            { errorMessage }
            <p>{ validationError }</p>
            { form }
            <p>already have account? <Link to="/signin">Login</Link></p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuth: state.auth.token != null,
    loading: state.auth.loading,
    error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
    onAuth: (authData) => dispatch(signup(authData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);