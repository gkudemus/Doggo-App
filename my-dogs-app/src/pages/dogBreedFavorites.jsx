import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import FavoritesCard from '../components/FavoritesCard'

const dogBreedFavorites = () => {
  const navigate = useNavigate()
  const [dropDownItems, setDropDownItems] = useState([])
  const [selected, setSelected] = useState('');
  
  const favoritesData = useSelector(
    state =>  state.dogBreedData.favorites
  );

  useEffect(() => {
    setDropDownItems([])
    populateDropDown(favoritesData)
  }, [favoritesData])

  const [filteredList, setFilteredList] = useState(favoritesData)
  let newArr = []

  useEffect(() => {
    setFilteredList(favoritesData)
  },[favoritesData])

  const populateDropDown = (data) => {
    if(newArr.length === 0) newArr.push('Select Breed')

    for(let x=0; x < data.length; x++) {
      let deleteRootUrl = data[x].replace('https://images.dog.ceo/breeds/', '')
      let breedName = deleteRootUrl.substring(0, deleteRootUrl.indexOf("/"))
      newArr.push(breedName)
    }

    let removeDuplicates = [...new Set(newArr)]
    setDropDownItems(removeDuplicates)
  }

  const goBackToHomePage = () => {
    navigate('/doggoHome')
  }

  const dropDownHandler = (e) => {
    let selected = e.target.value
    let encodedStrArr = []
    let finalFilteredArr = []

    setSelected(selected)

    for(let x = 0; x < favoritesData.length; x++) {
      let encodedURL = encodeURIComponent(favoritesData[x])
      encodedStrArr.push(encodedURL)
    }

    // ps: I resorted to this approach instead of using arr.filter(item => item.includes(selected)),
    // because apparently .includes method has a limitation
    // in working with strings with special characters such as url strings
    // this logic/solution is working so far.
  
    const subArr = encodedStrArr.filter(str => str.includes(encodeURIComponent(selected)))

    for(let x = 0; x < subArr.length; x++) {
      const convertToSlashes = subArr[x].replaceAll('%2F', '/')
      const convertToColons = convertToSlashes.replaceAll('%3A', ':')
      finalFilteredArr.push(convertToColons)
    }

    setFilteredList(finalFilteredArr)
  }

  const resetFilter = () => {
    setFilteredList(favoritesData)
    setSelected(filteredList[0])
  }

  console.log(filteredList)
  return (
    <div className="flex w-full dark:bg-gray-700">
      <div className='w-full flex items-center justify-center'>
      <div className='flex flex-col h-full bg-sky-50 rounded-md w-full md:w-3/4 items-center justify-center'>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold px-5 py-5 md:px-10 md:pt-10 pb-5'>Favorite Doggo Pics...</h1>
        </div>
        <div className='flex flex-col'>
          <p><b>Filter by breed:</b></p>
          <select className='border-2 border-black rounded w-56' value={selected} onChange={(e) => dropDownHandler(e)}>
            {dropDownItems.map((item, index) => {
              return <option key={index}>{item}</option>
            })
            }
          </select>
        </div>
        <div className='flex flex-row py-5'>
          <button onClick={() => goBackToHomePage()} className="mr-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            back to Doggo Home Page
          </button>
          <button onClick={() => resetFilter()} className="mr-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Reset Filter
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filteredList?.map((image, index) => (
          <FavoritesCard key={index} image={image}/>
        ))}
        </div>
      </div>
    </div>
  </div>
  )
}

export default dogBreedFavorites