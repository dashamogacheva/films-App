import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useContext } from 'react';
import {StatesContext} from '../../statesContext';
import {getAccountId} from "../../fetchLogic";
import cookies from "../../utils/cookies";

export default function PostToken({setIsOpenPostToken, isOpenPostToken}) {
    const [token, setToken] = useState('');
    const { setUserData } = useContext(StatesContext);
    function handleClose() {
        setIsOpenPostToken(false);
    }

    async function handleOkButton() {
        const newUserData = {};
        newUserData.token = token;
        newUserData.accountId = await getAccountId(token);
        try {
            cookies.create('userData', JSON.stringify(newUserData), { 'max-age': 1e8, samesite: 'strict' });
        } catch (err) {
            console.log(`Ошибка при записи данных в куки с помощью JSON: ${err.message}`);
        }
        setUserData(newUserData);
        handleClose();
    }

    return (
        <Dialog  maxWidth="xs" fullWidth open={isOpenPostToken} onClose={handleClose}>
            <DialogTitle>Введите токен</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    id="name"
                    label="токен"
                    value={token}
                    onChange={(event) => { setToken(event.target.value); }}
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>ОТМЕНА</Button>
                <Button onClick={handleOkButton}>ОК</Button>
            </DialogActions>
        </Dialog>
    );
}