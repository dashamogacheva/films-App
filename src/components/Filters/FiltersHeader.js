import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
    changeCurrentPage,
    changeSearchingQuery,
    changeSelectedGenres,
    changeSelectedYears,
    changeSortType
} from "../../actions";
import {useDispatch} from "react-redux";

export default function FiltersHeader() {
    const dispatch = useDispatch();
    function handleClearClick() {
        dispatch(changeSortType('popular'));
        dispatch(changeSearchingQuery(''));
        dispatch(changeSelectedYears([1900, 2023]));
        dispatch(changeSelectedGenres([]));
        dispatch(changeCurrentPage(1));
    }

    return (
        <div className='filters-header'>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Фильтры
            </Typography>
            <Button onClick={handleClearClick}>
                <CloseIcon/>
            </Button>
        </div>
    );
}