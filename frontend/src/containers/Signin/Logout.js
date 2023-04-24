import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom"
import { serverLogout } from "../../store/actions/authActions";

const Logout = props => {
    const effectRan = useRef(false);
    useEffect(() => {
        if (!effectRan.current) {
            props.logout();
            return () => {
                effectRan.current = true;
            };
        };
    },[props]);
    return (
        <Navigate to="/signin"/>
    );
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(serverLogout())
});

export default connect(null, mapDispatchToProps)(Logout);