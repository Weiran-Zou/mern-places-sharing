import React, {Suspense} from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
// import NewPlace from './places/pages/NewPlace.js';
// import Users from "./user/pages/Users.js"
// import UserPlaces from './places/pages/UserPlaces.js';
// import UpdatePlace from './places/pages/UpdatePlace.js';
// import Auth from './user/pages/Auth.js';
import MainNavigation from './shared/components/Navigation/MainNavigation.js';
import {AuthContext} from './shared/context/context.js'
import useAuth from './shared/hooks/auth-hook.js';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner.js';

const Users = React.lazy(() => import('./user/pages/Users.js'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace.js'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces.js'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace.js'));
const Auth = React.lazy(() => import('./user/pages/Auth.js'));

function App() {
  const { token, userId, login, logout } = useAuth();
  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout}}>
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Suspense 
            fallback={
              <div className='center'>
                <LoadingSpinner />
                </div>
              }
          >
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path='/:userId/places' element={<UserPlaces />} />
              <Route path="/places/new" element={<NewPlace />} />'
              <Route path="/places/:placeId" element={<UpdatePlace/>} />     
              <Route path='/auth' element={!!token? <Navigate to="/"/> : <Auth/>} />  
            </Routes>
          </Suspense>
          
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
