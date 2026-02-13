import './App.css';
import Signup from './components/Signup/Signup';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import ProductDetails from './components/PostDetails/PostDetails';
import Footer from './components/Footer/Footer'
import { UserContextProvider } from './stores/userStore';
import AdminAllPosts from './components/Login-User-All-Posts/LoginUserAllPosts';
import UploadPosts from './components/Upload-Posts/UploadPosts';
import { PostContextProvider } from './stores/postStore';
import ChangePassword from './components/ChangePassword/ChangePassword';
import UserAllPosts from './components/Specific-User-posts/UserAllPosts';
import UpdatePost from './components/UpdatePost/UpdatePost';
import HomeCart from './components/Home/HomeCart';

function App(){
  return(
    <div className="body">
      
      <BrowserRouter>
      <PostContextProvider>
      <UserContextProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<HomeCart/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/post-details/:id' element={<ProductDetails/>}/>
        <Route path='/admin/all-posts' element={<AdminAllPosts/>}/>
        <Route path='/upload-posts' element={<UploadPosts/>}/>
        <Route path='/change-password' element={<ChangePassword/>}/>
        <Route path='/user/all-post' element={<UserAllPosts/>}/>
        <Route path='/update-post/:id' element={<UpdatePost/>}/>
      </Routes>
      <Footer/>
      </UserContextProvider>
      </PostContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;

// https://dev.to/jucheng925/react-persisting-data-on-page-refresh-1jhk

//https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f