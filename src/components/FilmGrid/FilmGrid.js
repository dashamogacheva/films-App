import FilmCard from "./FilmCard";
import {useEffect, useState} from 'react';
import {getFavoriteMovies, getFilmsArray, getFilteredByNameFilmsArray} from '../../fetchLogic';
import {useDispatch, useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import {fetchFavoriteMovies} from "../../fetchActions";

export default function FilmGrid() {

    const [filmsArray, setFilmsArray] = useState([]);

    const { token, accountId } = useSelector((state) => state.userData);
    const sortType = useSelector((state) => state.sortType);
    const currentPage = useSelector((state) => state.currentPage);
    const searchingQuery = useSelector((state) => state.searchingQuery);

    const dispatch = useDispatch();

    useEffect(() => {
        async function startFetching() {
            if (searchingQuery !== '') {
                const {results} = await getFilteredByNameFilmsArray(searchingQuery, currentPage, token);
                setFilmsArray(results);
            } else {
                const fetchedList = await getFilmsArray(sortType, currentPage, token);
                setFilmsArray(fetchedList);
            }
            if (sortType === 'favorite') {
                const fetchedFavoriteMoviesArray = await getFavoriteMovies(token, accountId);
                setFilmsArray(fetchedFavoriteMoviesArray);
            }
            dispatch(fetchFavoriteMovies());
        }

        startFetching();
    }, [sortType, currentPage, token, accountId, searchingQuery, dispatch]);

    if (!filmsArray?.length) {
        return (
            <Typography variant="h6">
                Ничего не найдено
            </Typography>
        );
    }

    return (
        <div className='film-grid'>
            {filmsArray.map((film) => (<FilmCard film={film} key={film.id}/>))}
        </div>
    );
}