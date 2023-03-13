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
import axios from "axios";
import {date, number, object, string} from "yup";

export default function AddEmployeeDialog({open, addRow, listManager, handleClose}) {
    const {toastError} = useToast();

    // const [salary, setSalary] = useState(0);
    let [managerId, setManagerId] = React.useState(0);

    // const handleSalaryChange = (event) => {
    //     const value = event.target.value;
    //     if (value >= 1 && value <= 10) {
    //         setSalary(value);
    //     }
    // };

    let userSchema = object({
        firstName: string().required(),
        lastName: string().required(),
        salary: number().required().positive().integer().min(1).max(10),
        managerId: number().required(),
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let object = {};
        data.forEach((value, key) => object[key] = value);

        object.isManager = false
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
                    <DialogTitle>New mortal warrior</DialogTitle>
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
                                    // value={salary}
                                    // onChange={handleSalaryChange}
                                    // inputProps={{ min: 1, max: 10 }}
                                />
                            </Grid>

                            <Grid item sm={6}>
                                <InputLabel id="managerId-label">ManagerId</InputLabel>
                                <Select
                                    required
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

        // <React.Fragment>
        //     <Dialog
        //         fullWidth={true}
        //         maxWidth={'sm'}
        //         open={open}
        //     >
        //         <form onSubmit={handleSubmit}>
        //             <DialogTitle>New mortal employee</DialogTitle>
        //             <DialogContent>
        //                 <DialogContentText>
        //                     <FormControl variant="standard">
        //                         <InputLabel htmlFor="first_name">First Name</InputLabel>
        //                         <Input id="first_name" name="first_name" defaultValue="" />
        //                     </FormControl>
        //                     <FormControl variant="standard">
        //                         <InputLabel htmlFor="component-simple">Second Name</InputLabel>
        //                         <Input id="component-simple" defaultValue="" />
        //                     </FormControl>
        //                     <FormControl variant="standard">
        //                         <InputLabel htmlFor="component-helper">Salary</InputLabel>
        //                         <Input
        //                             id="component-helper"
        //                             defaultValue="1"
        //                             aria-describedby="component-helper-text"
        //                         />
        //                         <FormHelperText id="component-helper-text">
        //                             1 - 10
        //                         </FormHelperText>
        //                     </FormControl>
        //                     <FormControl variant="standard">
        //                         <InputLabel htmlFor="component-helper">ManagerId</InputLabel>
        //                         <Input
        //                             id="component-helper"
        //                             defaultValue=""
        //                             aria-describedby="component-helper-text"
        //                         />
        //                         <FormHelperText id="component-helper-text">
        //                             Pick a feudal lord
        //                         </FormHelperText>
        //                     </FormControl>
        //                     <FormControl disabled variant="standard">
        //                         <InputLabel htmlFor="component-disabled">IsManager</InputLabel>
        //                         <Input id="component-disabled" defaultValue="false" />
        //                         <FormHelperText>Disabled</FormHelperText>
        //                     </FormControl>
        //                     <FormControl disabled variant="standard">
        //                         <InputLabel htmlFor="component-disabled">IsCEO</InputLabel>
        //                         <Input id="component-disabled" defaultValue="false" />
        //                         <FormHelperText>Disabled</FormHelperText>
        //                     </FormControl>
        //                 </DialogContentText>
        //                 <Box
        //                     noValidate
        //                     component="form"
        //                     sx={{
        //                         display: 'flex',
        //                         flexDirection: 'column',
        //                         m: 'auto',
        //                         width: 'fit-content',
        //                     }}
        //                 >
        //                 </Box>
        //             </DialogContent>
        //             <DialogActions>
        //                 <Button type="submit">Submit</Button>
        //                 <Button autoFocus onClick={handleClose}>Cancel</Button>
        //             </DialogActions>
        //         </form>
        //     </Dialog>
        // </React.Fragment>
    );
}