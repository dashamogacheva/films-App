import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import RealizeYear from "./RealizeYear";
import FilterSort from "./FilterSort";
import FiltersHeader from "./FiltersHeader";
import Genre from "./Genre";
import Pagination from '@mui/material/Pagination';
import {useSelector, useDispatch} from "react-redux";
import {changeCurrentPage, changeSearchingQuery, changeSortType} from "../../actions";

export default function Filters() {

    const currentPage = useSelector((state) => state.currentPage);
    const searchingQuery = useSelector((state) => state.searchingQuery);
    const dispatch = useDispatch();

    function handleSearchingChange(event) {
        const spaceBar = ' ';
        if (event.target.value !== spaceBar) {
            dispatch(changeSearchingQuery(event.target.value));
            dispatch(changeSortType('popular'));
            dispatch(changeCurrentPage(1));
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 5,
                    width: 300,
                    height: 723,
                },
            }}
        >
            <Paper>
                <FiltersHeader/>
                <p className='title-release-year'>Название фильма:</p>
                <TextField
                    value={searchingQuery}
                    label="Название фильма"
                    variant="standard"
                    onChange={handleSearchingChange}
                    sx={{ width: '268px', ml: '16px', mb: '16px' }}
                />
                <FilterSort/>
                <p className='title-release-year'>Год релиза:</p>
                <RealizeYear/>
                <Genre/>
                <div className='filter-sort pagination-style'>
                    <Pagination
                        count={50}
                        page={currentPage}
                        onChange={(event, value) => { dispatch(changeCurrentPage(value)); }}
                        color="primary"
                        size="small"
                        sx={{
                            margin: 'auto auto 10px auto',
                        }}
                    />
                </div>
            </Paper>
        </Box>
    );
}