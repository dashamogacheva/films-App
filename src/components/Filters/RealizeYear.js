import Slider from '@mui/material/Slider';
import {useDispatch, useSelector} from "react-redux";
import {changeSelectedYears} from "../../actions";

export default function RealizeYear() {

    const selectedYears = useSelector((state) => state.selectedYears);
    const dispatch = useDispatch();
    function handleSliderChange(event) {
        dispatch(changeSelectedYears(event.target.value));
    }

    return (
        <div className='filter-sort'>
            <Slider
                sx={{width: '268px'}}
                value={selectedYears}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={1900}
                max={2023}
            />
        </div>
    );
}