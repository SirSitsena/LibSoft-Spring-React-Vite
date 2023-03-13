import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {useToast} from "../../components/ToastContextProvider.tsx";
import {object, string, date} from "yup";

export default function AddCheckoutDialog({updateRow, row, open, handleClose}) {
    const {toastError} = useToast();

    let userSchema = object({
        borrower: string().required(),
        borrowDate: date().required(),
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        let object = {};
        data.forEach((value, key) => object[key] = value);

        await userSchema.validate(object)
            .catch(e => toast({message: e.toLocaleString(), type: 'error'}))

        if (userSchema.isValidSync(object)) {
            object = {...row, ...object}
            object.isBorrowable = false

            await axios.post('/api/lib-item/update', object)
                .then(response => response.data)
                .then(data => {
                    updateRow(data)
                }).catch((e) => toastError(e))
                .finally(() => handleClose())
        }
    }
    const dateNow = new Date();
    const year = dateNow.getFullYear();

    const monthWithOffset = dateNow.getUTCMonth() + 1;

    const month = monthWithOffset.toString().length < 2
        ? `0${monthWithOffset}`
        : monthWithOffset;

    const day = dateNow.getUTCDate().toString().length < 2
        ? `0${dateNow.getUTCDate()}`
        : dateNow.getUTCDate();

    const materialDateInput = `${year}-${month}-${day}`;

    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={'xs'}
                open={open}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Check-out</DialogTitle>
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
                            <Grid item sm={8}>
                                <TextField
                                    required
                                    id="borrower"
                                    name="borrower"
                                    label="Borrower"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    type="string"
                                />
                            </Grid>
                            <Grid item sm={8}>
                                <TextField
                                    required
                                    id="borrowDate"
                                    name="borrowDate"
                                    helperText="Borrow Date"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    type="datetime-local"
                                    defaultValue={materialDateInput}
                                />
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