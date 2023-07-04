import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getDogBreedList } from '../redux/slices/dogBreedListSlice'
import { useNavigate } from 'react-router-dom';

const dogBreedsHome = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
      dispatch(getDogBreedList());
  }, [dispatch])

  const dogBreedListdata = useSelector(
    state =>  state.dogBreedData.dogBreedsList
  );

  const loading = useSelector(
    state =>  state.dogBreedData.loading
  );

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 20
  const lastIndex = currentPage * recordsPerPage
  const firsIndex = lastIndex - recordsPerPage
  const records = dogBreedListdata.slice(firsIndex, lastIndex)
  const npage = Math.ceil(dogBreedListdata.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

  const prevPage = () => {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    if(currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const changeCurrentPage = (currentPage) => {
    setCurrentPage(currentPage)
  }

  const gotoDetailsPage = (breed) => {
    navigate('/doggoGallery', {
      state: {
        selectedBreed: breed
      }
    })
  }

  const gotoFavoritesPage = () => {
    navigate('/doggoFavorites')
  }

  const logout = () => {
    navigate('/')
  }

  return (
    <div className="flex w-full h-auto dark:bg-gray-700 sm:w-full">
      <div className='w-full h-auto flex items-center justify-center'>
        <div className='flex flex-col bg-sky-50 py-10 h-screen rounded-md sm:w-full md:w-1/2 items-center justify-center'>
          <div className='flex flex-col'>
            <h1 className='text-3xl font-bold md:px-10 md:pt-10 pb-5'>ALL DOG BREEDS LIST</h1>
          </div>
          <div className='flex flex-row pb-5'>
            <button onClick={() => gotoFavoritesPage()} className="mr-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Go to favorite doggo Images
            </button>
            <button onClick={() => logout()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Logout
            </button>
          </div>
          {!loading && (
          <div className='flex flex-col px-10 pb-5 w-full'>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs h-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Breed Name</th>
                </tr>
              </thead>
              <tbody>
                {records.map((dogBreed, index) => {
                  return (
                    <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white items-center">
                      <td onClick={() => gotoDetailsPage(dogBreed)} className='px-6 md:h-12 lg:h-10 xxs:w-10 lg:w-4/12 xxl:w-7/12'>{dogBreed}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <nav>
              <ul className='inline-flex items-center -space-x-px pt-2 xxs:w-full'>
                <li className='page-item'>
                  <a 
                    href='#' 
                    className='block px-2 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' 
                    onClick={prevPage}
                  > Prev
                  </a>
                </li>
                {numbers.map((number, index) => {
                  return (
                    <li onClick={() => changeCurrentPage(number)} className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' key={index}>
                    <a 
                      href="#"
                      className='page-link'
                      onClick={() => changeCurrentPage(number)}
                    >
                      {number}
                    </a>
                  </li>
                )})}
                <li className='page-item'>
                  <a 
                    href='#' 
                    className='block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' 
                    onClick={nextPage}
                  > Next
                  </a>
                </li>
              </ul>
            </nav>
            </div>
          )}          
        </div>
      </div>
    </div>
  )
}

export default dogBreedsHome