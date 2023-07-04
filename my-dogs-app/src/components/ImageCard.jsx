import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addFavoriteImages, removeFavoriteImages } from '../redux/slices/dogBreedListSlice'

const ImageCard = ({ image }) => {
  const dispatch = useDispatch()
  const [liked, setLiked] = useState(false)

  const addToLikePage = (img) => {
    setLiked(!liked)
    if(!liked) dispatch(addFavoriteImages(img))
    else dispatch(removeFavoriteImages(img))
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className='flex flex-col'>
        <img src={image} className='w-48 h-48' onClick={() => addToLikePage(image)}/>
      </div>
      <div className='flex flex-col'>
        <button onClick={() => addToLikePage(image)} className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {!liked ? 'Like' : 'Unlike'}
        </button>
      </div>
    </div>
  )
}

export default ImageCard;