import React, { useEffect, useState }  from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getBreedImages } from '../redux/slices/dogBreedListSlice'
import { useNavigate, useLocation } from 'react-router-dom';
import ImageCard from '../components/ImageCard'

const dogBreedDetails = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate()
  const selectedBreed = location.state.selectedBreed
  
  useEffect(() => {
    dispatch(getBreedImages(selectedBreed));
}, [dispatch])

const dogBreedGallerydata = useSelector(
  state =>  state.dogBreedData.dogBreedThumbnail
);

const goBackToHomePage = () => {
  navigate('/doggoHome')
}

const gotoFavoritesPage = () => {
  navigate('/doggoFavorites')
}

return (
  <div className="flex w-full dark:bg-gray-700">
    <div className='w-full flex items-center justify-center'>
    <div className='flex flex-col h-full bg-sky-50 rounded-md xxs:w-3/5 md:w-1/2 items-center justify-center'>
      <div className='flex flex-col'>
        <h1 className='text-3xl font-bold md:px-10 md:pt-10 pb-5'>Photos about the {selectedBreed}...</h1>
      </div>
      <div className='flex flex-row pb-5'>
        <button onClick={() => goBackToHomePage()} className="mr-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          back to Doggo Home Page
        </button>
        <button onClick={() => gotoFavoritesPage()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Go to Favorite Doggo Pics
        </button>
          </div>
      <div className="grid grid-cols-3 gap-4">
      {dogBreedGallerydata?.map((image, index) => (
        <ImageCard key={index} image={image} />
      ))}
      </div>
    </div>
    </div>
  </div>
  )
}

export default dogBreedDetails