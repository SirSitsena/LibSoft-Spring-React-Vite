import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {useToast} from "../../components/ToastContextProvider.tsx";
import {number, object, string} from "yup";
import axios from "axios";

export default function AddCeoDialog({open, addRow, handleClose}) {
    const {toastError} = useToast();

    let userSchema = object({
        firstName: string().required(),
        lastName: string().required(),
        salary: number().required().positive().integer().min(1).max(10),
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let object = {};
        data.forEach((value, key) => object[key] = value);

        object.isManager = false
        object.isCeo = true

        await userSchema.validate(object)
            .catch(e => toastError(e))

        if (userSchema.isValidSync(object)) {
            await axios.post('/api/employee/add', object)
                .then(response => response.data)
                .then(data => {
                    addRow(data)
                }).catch((e) => toastError(e))
                .finally(() => handleClose())
        }
    }

    return (

        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={open}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>New Imperor (CEO)</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>

                            <Grid item sm={6}>
                                <TextField
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    type="string"
                                />
                            </Grid>

                            <Grid item sm={6}>
                                <TextField
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    type="string"
                                />
                            </Grid>

                            <Grid item sm={6}>
                                <TextField
                                    required
                                    id="salary"
                                    name="salary"
                                    label="Salary Rank"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    defaultValue={"1"}
                                />
                            </Grid>

                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">Submit</Button>
                        <Button autoFocus onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}