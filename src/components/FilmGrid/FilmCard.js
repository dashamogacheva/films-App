import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import GradeIcon from '@mui/icons-material/Grade';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {Link} from "react-router-dom";
import { useEffect, useState} from "react";
import {changeMovieFavoriteStatus} from "../../fetchLogic";
import {useDispatch, useSelector} from "react-redux";
import {fetchFavoriteMovies} from "../../fetchActions";

export default function FilmCard({
                                     film: {
                                         id, poster_path, backdrop_path, title, vote_average,
                                     },
                                 }) {

    const imgURL = `https://image.tmdb.org/t/p/w500${poster_path || backdrop_path}`;

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
        <>
            {
                <Card className='film-card' sx={{width: 296, height: 324}}>
                    <CardActionArea>
                        <Link to={`films/${id}`}>
                            <CardMedia
                                component="img"
                                height="240"
                                image={imgURL}
                                alt="card img"
                                key={id}
                            />
                        </Link>
                        <div className='film-card-style'>
                            <div className='film-card-title'>
                                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                    {title}
                                </Typography>
                                <Typography variant="body2" component="div" sx={{flexGrow: 1}}>
                                    Рейтинг{' '}
                                    {vote_average}
                                </Typography>
                            </div>
                            {
                                isFavorite ? (
                                    <IconButton onClick={() => { handleChangeFavoriteStatus(false); }}>
                                        <GradeIcon sx={{ color: 'inherit' }} />
                                    </IconButton>
                                ) : (
                                    <IconButton>
                                        <StarBorderIcon onClick={() => { handleChangeFavoriteStatus(true); }}/>
                                    </IconButton>
                                )
                            }
                        </div>
                    </CardActionArea>
                </Card>
            }
        </>
    );
}