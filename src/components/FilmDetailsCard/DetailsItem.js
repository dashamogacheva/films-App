import { Box, Typography } from '@mui/material';

export function DetailsItem({ title, answer }) {
    return (
        <Box sx={{ gap: '10px' }}>
            <Typography variant="subtitle1" sx={{ width: '250px', display: 'inline-block', textAlign: 'left' }}>
                {title}
            </Typography>
            <Typography variant="subtitle1" sx={{ display: 'inline-block' }}>
                {answer}
            </Typography>
        </Box>
    );
}