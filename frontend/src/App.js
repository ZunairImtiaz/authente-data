import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Signup from './containers/Signup/Signup';
import Signin from './containers/Signin/Signin';
import Home from './containers/Home/Home';
import AddItem from './containers/AddItem/AddItem';
import EditItem from './containers/EditItem/EditItem';
import Logout from './containers/Signin/Logout';
import NotFound from './components/NotFound/NotFound';
import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/authActions';

function App(props) {
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === false) {
      props.onReload();
      return () => {
        effectRan.current = true;
      };
    };
  },[props]);

  let routes = (
    <Routes>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/' element={<Home/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
  );

  if (props.isAuth) {
    routes = (
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/create' element={<AddItem/>} />
        <Route path='/edit/:id' element={<EditItem/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/*' element={<NotFound/>} />
      </Routes>
    )
  }

  return (
    <BrowserRouter>
      <Layout>
        { routes }
      </Layout>
    </BrowserRouter>
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onReload: () => dispatch(authCheckState())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
