import cookie from "./utils/cookies";
import {
    CHANGE_USER_DATA,
    CHANGE_SORT_TYPE,
    CHANGE_SELECTED_YEARS,
    CHANGE_SELECTED_GENRES,
    CHANGE_CURRENT_PAGE,
    CHANGE_SEARCHING_QUERY,
    CHANGE_FAVORITE_MOVIES,
} from './actions';

const initialSelectedYears = [1900, 2023];
const initialSortType = 'popular';
const initialCurrentPage = 1;
let initialUserData;

try {
    initialUserData = JSON.parse(cookie.read('userData')) ?? {};
} catch (err) {
    initialUserData = {};
}

const initialState = {
    userData: initialUserData,
    sortType: initialSortType,
    selectedYears: initialSelectedYears,
    selectedGenres: [],
    currentPage: initialCurrentPage,
    searchingQuery: '',
    favoriteMovies: [],
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_USER_DATA: {
            return {...state, userData: action.userData};
        }
        case CHANGE_SORT_TYPE: {
            return {...state, sortType: action.sortType};
        }
        case CHANGE_SELECTED_YEARS: {
            return {...state, selectedYears: action.selectedYears};
        }
        case CHANGE_SELECTED_GENRES: {
            return {...state, selectedGenres: action.selectedGenres};
        }
        case CHANGE_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage};
        }
        case CHANGE_SEARCHING_QUERY: {
            return {...state, searchingQuery: action.searchingQuery};
        }
        case CHANGE_FAVORITE_MOVIES: {
            return {...state, favoriteMovies: action.favoriteMovies};
        }
        default: {
            return state;
        }
    }
}