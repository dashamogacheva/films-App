import AppBarFilms from "../AppBarFilms/AppBarFilms";
import Filters from "../Filters/Filters";
import FilmGrid from "../FilmGrid/FilmGrid";
import { useSelector } from 'react-redux';
import { Box, Paper, Typography } from '@mui/material';

export default function MainPage() {
    const userData = useSelector((state) => state.userData);
    return (
        <>
            <AppBarFilms/>
            {userData.token ? (
                <div className='main'>
                    <Filters/>
                    <FilmGrid/>
                </div>
            ) : (
                <Box sx={{ height: '90vh', display: 'flex', alignItems: 'center' }}>
                    <Paper sx={{
                        margin: 'auto', backgroundColor: '#d6a95a', color: '#403118', width: '250px', height: '40px',
                    }}
                    >
                        <Typography variant="subtitle1" sx={{ paddingTop: '7px' }}>
                             Необходима авторизация
                        </Typography>
                    </Paper>
                </Box>
            )}
        </>
    );
}