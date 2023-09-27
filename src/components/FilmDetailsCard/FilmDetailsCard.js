import {Link} from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box, IconButton, Paper, Typography} from '@mui/material';
import {DetailsItem} from './DetailsItem';
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import GradeIcon from '@mui/icons-material/Grade';
import {changeMovieFavoriteStatus} from "../../fetchLogic";
import {fetchFavoriteMovies} from "../../fetchActions";

export default function FilmDetailsCard({
                                            film: {
                                                id,
                                                poster_path,
                                                backdrop_path,
                                                release_date,
                                                genres,
                                                runtime,
                                                title,
                                                overview,
                                                production_countries,
                                                vote_average,
                                                vote_count,
                                            },
                                        }) {

    const imgURL = `https://image.tmdb.org/t/p/w500${poster_path || backdrop_path}`;
    const filmRealeaseYear = release_date?.slice(0, 4);
    const filmGenres = genres?.reduce((currentString, genre) => (`${currentString} ${genre.name}`), '').trim();
    const filmRuntime = `${runtime} мин. / ${Math.floor(runtime / 60)}:${runtime % 60}`;
    const productionCountries = production_countries?.reduce((currentString, country) => (`${currentString}, ${country.name}`), '').slice(2);

    const { token, accountId } = useSelector((state) => state.userData);
    const favoriteMovies = useSelector((state) => state.favoriteMovies);
    const dispatch = useDispatch();

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(favoriteMovies.some((movie) => movie.id === id));
    }, [favoriteMovies, id]);

    async function handleChangeFavoriteStatus (isMovieFavorite) {
        setIsFavorite(isMovieFavorite);
        const isSucceed = await changeMovieFavoriteStatus(id, isMovieFavorite, token, accountId);
        if (isSucceed) {
            dispatch(fetchFavoriteMovies());
        } else {
            alert('Произошла ошибка при добавлении в избранное');
            setIsFavorite(!isMovieFavorite);
        }
    }

    return (
            <Box className="film_details_main_block"
            >
                <Paper sx={{width: '300px'}}>
                    <img src={imgURL} alt="film poster" style={{width: '300px'}}/>
                </Paper>
                <Box className="details_info_wrapper">
                    <Box className="details_title">
                        <Typography variant="h3">
                            {title}
                        </Typography>
                        {isFavorite
                            ? (
                                <IconButton onClick={() => { handleChangeFavoriteStatus(false); }}>
                                    <GradeIcon sx={{ color: 'inherit' }} />
                                </IconButton>
                            )
                            : (
                        <IconButton onClick={() => { handleChangeFavoriteStatus(true); }}>
                            <StarBorderIcon />
                        </IconButton>
                        )}
                    </Box>
                    <Link to="/">
                        <IconButton>
                            <ArrowBackIcon/>
                        </IconButton>
                    </Link>
                    <Typography variant="body1">
                        {overview}
                    </Typography>
                    <Box className="details_info">
                        <Typography variant="h4" sx={{mb: '24px'}}>
                            Детали
                        </Typography>
                        <DetailsItem title="Страна" answer={productionCountries}/>
                        <DetailsItem title="Год" answer={filmRealeaseYear}/>
                        <DetailsItem title="Жанр" answer={filmGenres}/>
                        <DetailsItem title="Рейтинг" answer={vote_average}/>
                        <DetailsItem title="Количество голосов" answer={vote_count}/>
                        <DetailsItem title="Время просмотра" answer={filmRuntime}/>
                    </Box>
                </Box>
            </Box>
    );
}