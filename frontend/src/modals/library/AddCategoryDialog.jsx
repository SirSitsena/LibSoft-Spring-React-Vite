import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {useToast} from "../../components/ToastContextProvider.tsx";
import {object, string} from "yup";

export default function AddACategoryDialog({addRow, open, handleClose}) {
    const {toastError} = useToast();

    let userSchema = object({
        categoryName: string().required(),
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        let object = {};
        data.forEach((value, key) => object[key] = value);

        await userSchema.validate(object)
            .catch(e => toastError(e))

        if (userSchema.isValidSync(object)) {
            await axios.post('/api/category/add/' + object.categoryName)
                .then(response => response.data)
                .then(data => {
                    addRow(data)
                    // console.log(data)
                }).catch((e) => toastError(e))
                .finally(() => handleClose())
        }
    }

    const refForm = React.useRef();
    let [categoryName, setCategoryName] = React.useState("");

    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={'xs'}
                open={open}
            >
                <form onSubmit={handleSubmit} ref={refForm}>
                    <DialogTitle>New Category</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid container spacing={3} sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Grid item sm={8}>
                                    <TextField
                                        required
                                        id="categoryName"
                                        name="categoryName"
                                        label="Category Name"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        type="string"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box
                            noValidate
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: 'fit-content',
                            }}
                        >
                        </Box>
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





