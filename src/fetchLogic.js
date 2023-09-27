export const USER_DATA = {
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmVjOTM5ODdkZmFiZTNkZDJiNTE0ZTY0ZTdhYjE4MiIsInN1YiI6IjY0YmFiYmMyNGQyM2RkMDBjODE0YjAyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WYxPqoQqA_qKS3Mg3kjLkIs7MGi7CDhve8PCrM0vg64',
}

function getMethodGetOptions(token) {
    return {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
}

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${USER_DATA.token}`,
    },
};

export async function getFilmsArray(sortType, page, token) {
    const fetchURL = `https://api.themoviedb.org/3/movie/${sortType}?language=ru&page=${page}`;
    try {
        const response = await fetch(fetchURL, getMethodGetOptions(token));
        if (response.ok) {
            const responseJSON = await response.json();
            return responseJSON.results;
        }
        throw new Error('Error in fetch while loading array of films');
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function getAccountId(token) {
    const accountIdURL = 'https://api.themoviedb.org/3/account/account_id';
    try {
        const response = await fetch(accountIdURL, getMethodGetOptions(token));
        if (response.ok) {
            const responseJSON = await response.json();
            return responseJSON.id;
        }
        throw new Error('Error in fetch while loading account id');
    } catch (err) {
        console.error(err);
        return 'Error';
    }
}

export async function getGenresArray() {
    const genresArrayURL = 'https://api.themoviedb.org/3/genre/movie/list?language=ru';
    try {
        const response = await fetch(genresArrayURL, options);
        if (response.ok) {
            const responseJSON = await response.json();
            return responseJSON.genres;
        }
        throw new Error('Error in fetch while loading array of genres');
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function getFilmDetails(filmId, token) {
    const detailsURL = `https://api.themoviedb.org/3/movie/${filmId}?language=ru`;
    try {
        const response = await fetch(detailsURL, getMethodGetOptions(token));
        if (response.ok) {
            const responseJSON = await response.json();
            return responseJSON;
        }
        throw new Error('Error in fetch while loading array of details');
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export async function changeMovieFavoriteStatus(movieId, isFavorite, token, accountId) {
    const postOptions = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ media_type: 'movie', media_id: movieId, favorite: isFavorite }),
    };
    const favoriteMoviesURL = `https://api.themoviedb.org/3/account/${accountId}/favorite`;

    try {
        const response = await fetch(favoriteMoviesURL, postOptions);
        if (!response.ok) {
            throw new Error('Error in fetch while post favorite movies');
        }
    } catch (err) {
        console.error(err);
    }
}

export async function getFavoriteMovies(token, accountId) {
    const favoriteMoviesURL = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies`;
    try {
        const response = await fetch(favoriteMoviesURL, getMethodGetOptions(token));
        if (response.ok) {
            const responseJSON = await response.json();
            return responseJSON.results;
        }
        throw new Error('Error in fetch while loading favorite movies');
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function getFilteredByNameFilmsArray(query, page, token) {
    const encodedQuery = encodeURIComponent(query);
    const fetchURL = `https://api.themoviedb.org/3/search/movie?query=${encodedQuery}&language=ru&page=${page}`;
    try {
        const response = await fetch(fetchURL, getMethodGetOptions(token));
        if (response.ok) {
            const responseJSON = await response.json();
            return { results: responseJSON.results, totalPgs: responseJSON.total_pages };
        }
        throw new Error('Error in fetch while loading array of filtered by name films');
    } catch (err) {
        console.error(err);
        return { results: [], totalPgs: 1 };
    }
}