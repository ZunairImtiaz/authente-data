import { connect } from "react-redux";
import Toolbar from "../../components/Toolbar/Toolbar";
import Model from "../../components/Model/Model";
import EditProfile from "../../components/EditProfile/EditProfile";
import EditPassword from "../../components/EditPassword/EditPassword";

const Layout = props => {
    let editForm = <EditProfile/>;
    if (!props.editProfile) {
        editForm = <EditPassword/>
    };

    return (
        <div>
            <Toolbar/>
            { props.showModel && <Model>{ editForm }</Model> }
            <main>{ props.children }</main>
        </div>
    );
};

const mapStateToProps = state => ({
    showModel: state.auth.showModel,
    editProfile: state.auth.editProfile
});

export default connect(mapStateToProps)(Layout);