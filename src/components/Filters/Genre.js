import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {getGenresArray} from '../../fetchLogic';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeSelectedGenres} from "../../actions";

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

export default function Genre() {

    const selectedGenres = useSelector((state) => state.selectedGenres);
    const dispatch = useDispatch();

    const [genresArray, setGenresArray] = useState([]);

    useEffect(() => {
        async function startFetching() {
            const fetchedList = await getGenresArray();
            setGenresArray(fetchedList);
        }

        startFetching();
    }, []);

    return (
        <div className='filter-sort'>
            <Autocomplete
                sx={{width: 268}}
                multiple
                id="checkboxes-tags-demo"
                size="small"
                limitTags={2}
                options={genresArray}
                value={selectedGenres}
                onChange={(event, newValue) => {
                    dispatch(changeSelectedGenres(newValue));
                }}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, {selected}) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{marginRight: 8}}
                            checked={selected}
                        />
                        {option.name}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Жанры"
                    />
                )}
            />
        </div>
    );
}