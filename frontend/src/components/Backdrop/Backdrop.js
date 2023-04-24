import { connect } from 'react-redux';
import './Backdrop.css';
import { closeModel } from '../../store/actions/authActions';

const Backdrop = props => (
    props.showBackdrop && <div className='Backdrop' onClick={props.onCloseBackdrop}></div>
);

const mapStateToProps = state => ({
    showBackdrop: state.auth.showModel
});
const mapDispatchToProps = dispatch => ({
    onCloseBackdrop: () => dispatch(closeModel())
});

export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);