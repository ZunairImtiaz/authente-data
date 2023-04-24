import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { signin } from "../../store/actions/authActions";
import Spinner from "../../components/Spinner/Spinner";

const Signin = props => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const signinHandler = e => {
        e.preventDefault();
        props.onSignin(email,password);
    };

    let form = (
        <form className='Form' onSubmit={signinHandler}>
            <input 
                type="email" 
                name="email" 
                placeholder="Your email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                name="password" 
                placeholder="Your password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
            />
            <button>Login</button>
        </form>
    );
    if (props.loading) {
        form = <Spinner/>;
    };
    let errorMessage = null;
    if (props.error) {
        errorMessage = <p>{props.error}</p>;
    };
    let authNavigate = null;
    if (props.isAuth) {
        authNavigate = <Navigate to="/" />;
    };

    return (
        <div className='Signup'>
            { authNavigate }
            <h3>Login</h3>
            { errorMessage }
            { form }
            <p>don't have account? <Link to="/signup">Signup</Link></p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuth: state.auth.token != null,
    loading: state.auth.loading,
    error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
    onSignin: (email, password) => dispatch(signin(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);