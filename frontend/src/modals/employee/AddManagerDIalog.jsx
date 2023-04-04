import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {useState} from "react";
import {useToast} from "../../components/ToastContextProvider.tsx";
import {InputLabel, MenuItem, Select} from "@mui/material";
import {number, object, string} from "yup";
import axios from "axios";

export default function AddManagerDialog({open, addRow, listManager, handleClose}) {
    const {toastError} = useToast();

    let [managerId, setManagerId] = React.useState(null);

    let userSchema = object({
        firstName: string().required(),
        lastName: string().required(),
        salary: number().required().positive().integer().min(1).max(10),
        // managerId: notRequired(),
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let object = {};
        data.forEach((value, key) => object[key] = value);

        object.isManager = true
        object.isCeo = false

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
                    <DialogTitle>New feudal lord (Manager)</DialogTitle>
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

                            <Grid item sm={6}>
                                <InputLabel id="managerId-label">ManagerId</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="managerId-label"
                                    id="managerId"
                                    name="managerId"
                                    value={managerId}
                                    onChange={(e) => setManagerId(e.target.value)}
                                >
                                    <MenuItem value={0}><em>None</em></MenuItem>
                                    {
                                        listManager.map(value => (
                                            <MenuItem value={value.id}
                                                      key={value.id}>{value.firstName} {value.lastName}</MenuItem>
                                        ))
                                    }
                                </Select>
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