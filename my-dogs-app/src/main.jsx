import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/login.jsx'
import DogList from './pages/dogBreedsHome.jsx'
import DogGallery from './pages/dogBreedDetails.jsx'
import DogFavorites from './pages/dogBreedFavorites.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/doggoHome' element={<DogList />}/>
        <Route path='/doggoGallery' element={<DogGallery />}/>
        <Route path='/doggoFavorites' element={<DogFavorites/>}/>
      </Routes>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
