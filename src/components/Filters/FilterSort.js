import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentPage, changeSortType} from "../../actions";

export default function FilterSort() {

    const sortType = useSelector((state) => state.sortType);
    const dispatch = useDispatch();

    function handleSortBySelectChange(event) {
        dispatch(changeSortType(event.target.value));
        dispatch(changeCurrentPage(1));
    }

    return (
        <div className='filter-sort'>
            <FormControl variant="standard" sx={{m: 1, minWidth: 268}}>
                <InputLabel id="demo-simple-select-standard-label">Сортировать по:</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={sortType}
                    onChange={handleSortBySelectChange}
                    label="Age"
                >
                    <MenuItem value='favorite'>Избранное</MenuItem>
                    <MenuItem value='popular'>Популярности</MenuItem>
                    <MenuItem value='top_rated'>Рейтингу</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}