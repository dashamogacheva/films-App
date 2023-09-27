export const CHANGE_USER_DATA = 'CHANGE_USER_DATA';
export const CHANGE_SORT_TYPE = 'CHANGE_SORT_TYPE';
export const CHANGE_SELECTED_YEARS = 'CHANGE_SELECTED_YEARS';
export const CHANGE_SELECTED_GENRES = 'CHANGE_SELECTED_GENRES';
export const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE';
export const CHANGE_SEARCHING_QUERY = 'CHANGE_SEARCHING_QUERY';
export const CHANGE_FAVORITE_MOVIES = 'CHANGE_FAVORITE_MOVIES';

export function changeUserData(userData) {
    return { type: CHANGE_USER_DATA, userData };
}
export function changeSortType(sortType) {
    return { type: CHANGE_SORT_TYPE, sortType };
}
export function changeSelectedYears(selectedYears) {
    return { type: CHANGE_SELECTED_YEARS, selectedYears };
}
export function changeSelectedGenres(selectedGenres) {
    return { type: CHANGE_SELECTED_GENRES, selectedGenres };
}
export function changeCurrentPage(currentPage) {
    return { type: CHANGE_CURRENT_PAGE, currentPage };
}
export function changeSearchingQuery(searchingQuery) {
    return { type: CHANGE_SEARCHING_QUERY, searchingQuery };
}
export function changeFavoriteMovies(favoriteMovies) {
    return { type: CHANGE_FAVORITE_MOVIES, favoriteMovies };
}