import React from 'react'
import { useDispatch } from "react-redux";
import { removeFavoriteImages } from '../redux/slices/dogBreedListSlice'

const FavoritesCard = ({image}) => {
  const dispatch = useDispatch()

  let deleteRootUrl = image.replace('https://images.dog.ceo/breeds/', '')
  let breedName = deleteRootUrl.substring(0, deleteRootUrl.indexOf("/"))

  const removeFormLikePage = (img) => {
    dispatch(removeFavoriteImages(img))
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-3 md:p-0">
      <div className='flex flex-col'>
        <img src={image} className='md:w-56 md:h-56' onClick={() => removeFormLikePage(image)}/>
        <p><b>Breed: </b>{breedName}</p>
      </div>
      <div className='flex flex-col'>
        <button onClick={() => removeFormLikePage(image)} className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Unlike
        </button>
      </div>
    </div>
  )
}

export default FavoritesCard