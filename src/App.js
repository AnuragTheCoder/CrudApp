
import './App.css';
import Category from './component/Category';
import AddCategory from './component/AddCategory';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './component/RootLayout';
import Detail from './component/Detail';
import Update from './component/Update';
import SignUp from './component/SignUp';
import Login from './component/Login';
import { isLogin } from './Util/isLogin';


const router=createBrowserRouter([
  {path:'signup',element:<SignUp/>},
  {path:'login',element:<Login/>},
  {path:'dashboard',loader:isLogin,element:<RootLayout/>,
children:[
  {path:'',element:<Category/>},
  {
    path:'category',element:<Category/>
  },
  {path:'add-category',element:<AddCategory/>},
  {path:'detail/:id',element:<Detail/>},
  {path:'edit/:id',element:<Update/>}
]}
])

function App() {
  return (
<>

<RouterProvider router={router}>
  <RootLayout/>
</RouterProvider>

</>
  );
}

export default App;
