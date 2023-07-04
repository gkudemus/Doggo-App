import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  dogBreedsList: [],
  dogBreedThumbnail: [],
  favorites: [],
};

export const getDogBreedList = () => async (dispatch) => {
  dispatch(setLoading(true));
  axios.get("https://dog.ceo/api/breeds/list/all").then((res) => {
    const breedsListData = Object.keys(res.data.message);
    dispatch(setBreedList(breedsListData));
    dispatch(setLoading(false));
  });
};

export const getBreedImages = (breed) => async (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(`https://dog.ceo/api/breed/${breed}/images/random/30`)
    .then((res) => {
      const breedsImagesData = res.data.message;
      dispatch(setBreedImages(breedsImagesData));
      dispatch(setLoading(false));
    });
};

export const dogBreedListSlice = createSlice({
  name: "dogBreeds",
  initialState,
  reducers: {
    setBreedList: (state, action) => {
      state.dogBreedsList = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBreedImages: (state, action) => {
      state.dogBreedThumbnail = action.payload;
    },
    addFavoriteImages: (state, action) => {
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    },
    removeFavoriteImages: (state, action) => {
      return {
        ...state,
        favorites: state.favorites.filter((img) => img !== action.payload),
      };
    },
  },
});

export const {
  setLoading,
  setBreedList,
  setBreedImages,
  addFavoriteImages,
  removeFavoriteImages,
} = dogBreedListSlice.actions;

export default dogBreedListSlice.reducer;
