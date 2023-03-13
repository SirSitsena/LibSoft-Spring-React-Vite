import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import {useToast} from "../../components/ToastContextProvider.tsx";
import {InputLabel, MenuItem, Select} from "@mui/material";
import {object, string, number, date} from "yup";

export default function AddCheckoutDialog({updateRow, row, open, handleClose}) {
    const { toastError } = useToast();

    const handleSubmit = async (event) => {
        event.preventDefault()

            await axios.delete('/api/borrow/'+row.id)
                .then(response => response.data)
                .then(data => {
                    updateRow(data)
                }).catch((e) => toastError(e))
                .finally(() => handleClose())
    }

    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={'xs'}
                open={open}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Check-in</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3} sx={{
                                display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Grid item sm={12}>
                                <p>Book: {row.title}</p>
                                <p>Author: {row.author}</p>
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button disabled={false} type="submit">Submit</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}