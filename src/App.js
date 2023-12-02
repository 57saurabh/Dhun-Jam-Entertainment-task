import logo from './logo.svg';


import Login from './components/Auth/Login';
import AdminDetails from './components/dashboard/Admindetail';
import UserContextProvider from './Context/UserContextProvider';
import MainRouting from './components/Route/MainRouting';


function App() {
  return (
   <UserContextProvider>
   {/* <Login/> */}
   <MainRouting/>
   </UserContextProvider>
  );
}

export default App;
