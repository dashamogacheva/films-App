import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function GetToken({isOpenGetToken, setIsOpenPostToken, setIsOpenGetToken}) {

    const [email, setEmail] = useState('');
    function handlePostToken() {
        setIsOpenGetToken(false);
        setIsOpenPostToken(true);
    }
    return (
        <Dialog  maxWidth="xs" fullWidth open={isOpenGetToken} onClose={() => { setIsOpenGetToken(false); }}>
            <DialogTitle>Запросить токен</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    id="name"
                    label="почта"
                    type="email"
                    value={email}
                    onChange={(event) => { setEmail(event.target.value); }}
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setIsOpenGetToken(false); }}>ОТМЕНА</Button>
                <Button onClick={handlePostToken}>ЗАПРОСИТЬ</Button>
            </DialogActions>
        </Dialog>
    );
}