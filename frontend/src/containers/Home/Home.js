import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import './Home.css';
import Filters from "../../components/Filters/Filters";
import Items from "../../components/Items/Items";

const Home = props =>{
    let Home = (
        <div className="Home">
            <Filters/>
            <Items />
        </div>
    );
    return props.isAuth? Home : <Navigate to="/signin" />;
};

const mapStateToProps = state => ({
    isAuth: state.auth.token != null,
});

export default connect(mapStateToProps)(Home);