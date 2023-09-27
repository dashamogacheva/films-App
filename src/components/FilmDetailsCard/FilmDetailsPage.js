import FilmDetailsCard from "./FilmDetailsCard";
import {useEffect, useState} from "react";
import {getFilmDetails} from "../../fetchLogic";
import {useParams} from "react-router-dom";
import {Box} from '@mui/material';
import spinner from '../../spinner.gif';
import AppBarFilms from "../AppBarFilms/AppBarFilms";

import {useSelector} from "react-redux";

export default function FilmDetailsPage() {
    const [film, setFilm] = useState({});
    const {filmId} = useParams();

    const { token } = useSelector((state) => state.userData);

    useEffect(() => {
        async function startFetching() {
            const fetchedListDetails = await getFilmDetails(filmId, token);
            setFilm(fetchedListDetails);
        }

        startFetching();
    }, [filmId, token]);

    const isFilmDetailsDownloaded = film !== {};
    return (
        <>
            <AppBarFilms filmTitle={film.title}/>
            {!isFilmDetailsDownloaded ? (
                <Box sx={{height: '90vh', display: 'flex', alignItems: 'center'}}>
                    <img alt="spinner" src={spinner} style={{width: '50px', margin: 'auto'}}/>
                </Box>
            ) : (
                <FilmDetailsCard
                    film={film}
                />
            )
            }
        </>
    );
}