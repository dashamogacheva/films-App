import {changeFavoriteMovies} from "./actions";

function getMethodGetOptions(token) {
    return {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
}
async function getFavoriteMovies(token, accountId, page = 1) {
    const favoriteMoviesURL = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?page=${page}`;
    try {
        const response = await fetch(favoriteMoviesURL, getMethodGetOptions(token));
        if (response.ok) {
            const responseJSON = await response.json();
            const result = [...responseJSON.results];
            if (responseJSON.page < responseJSON.total_pages) {
                result.push(...(await getFavoriteMovies(token, accountId, (page + 1))));
            }
            return result;
        }
        throw new Error(`Error in fetch while loading favorite movies: ${response.statusText}`);
    } catch (err) {
        console.error(err);
        return [];
    }
}
export function fetchFavoriteMovies() {
    return (dispatch, getState) => {
        const { userData: { token, accountId } } = getState();
        getFavoriteMovies(token, accountId)
            .then((favoriteMovies) => dispatch(changeFavoriteMovies(favoriteMovies)));
    };
}