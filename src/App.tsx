import './App.css';
import { Routes, Route, } from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Start from './components/Start/Start';
import About from './components/About/About';
import Category from './components/Category/Category';
import Contact from './components/Contact/Contact';
import Cart from './components/Cart/Cart';
import MainHomePage from './components/Main-home-page/Main-home-page';
import SugCtegory from './components/SugCtegory/SugCtegory';
import NotFound from './components/Not-found/Not-found';
import { Provider, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './redux/slices/categorySlice';
import UsersSlice from './redux/slices/UsersSlice';
import massegeSlice from './redux/slices/massegeSlice';

function App() {
  
const myStore=configureStore({
  // מחלקה ראשית שמאגדת רשימת מחלקות
  reducer:{
    categorySlice ,
    UsersSlice ,
    massegeSlice 
  }
})

  // מערך הקטגוריות מהסטייט
  const categories=myStore.getState().categorySlice.items;
  //  const c=myStore.getState.
  return (
    <Provider store={myStore}>    
      <Routes>
        <Route path='' element={<Start></Start>}></Route>
        <Route path='/Login' element={<Login></Login>}></Route>
        <Route path='/Home' element={<Home></Home>}>
          <Route path='' element={<MainHomePage></MainHomePage>}> </Route>
          <Route path='NotFound' element={<NotFound></NotFound>}></Route>
          <Route path='About' element={<About></About>}></Route>
          <Route path='Category' element={<Category></Category>}>
            {categories.map((categoryI, index) => (
              <Route key={index} path={":categoryI"}  element={<SugCtegory></SugCtegory>}>
              </Route>
            ))}
          </Route>
          <Route path='Contact' element={<Contact></Contact>}></Route>
          <Route path='Cart' element={<Cart></Cart>}></Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
