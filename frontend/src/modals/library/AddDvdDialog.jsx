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
import {object, string, date} from "yup";
import {InputLabel, MenuItem, Select} from "@mui/material";

export default function AddAudioBookDialog({addRow, open, handleClose}) {
    const {toastError} = useToast();

    let userSchema = object({
        title: string().required(),
        category: string().required(),
        borrower: string().notRequired(),
        borrowDate: date().notRequired(),
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        let object = {type: 'dvd'};
        data.forEach((value, key) => object[key] = value);

        await userSchema.validate(object)
            .catch(e => toast({message: e.toLocaleString(), type: 'error'}))

        if (userSchema.isValidSync(object)) {
            await axios.post('/api/lib-item/add', object)
                .then(response => response.data)
                .then(data => {
                    addRow(data)
                    // console.log(data);
                }).catch((e) => toastError(e))
                .finally(() => handleClose())
        }
    }

    const refForm = React.useRef();
    let [isBorrowable, setBorrowable] = React.useState(true);
    let [categoryName, setCategoryName] = React.useState("");
    let [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        axios.get('/api/categories')
            .then(response => response.data)
            .then(data => {
                setCategories(data.categories)
            })
            .catch((e) => console.log(e))
    }, [])

    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={open}
            >
                <form onSubmit={handleSubmit} ref={refForm}>
                    <DialogTitle>New DVD</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>

                            <Grid item sm={6}>
                                <TextField
                                    required
                                    id="title"
                                    name="title"
                                    label="Title"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    type="string"
                                />
                            </Grid>

                            <Grid item sm={6}>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    required
                                    fullWidth
                                    labelId="category-label"
                                    id="category"
                                    name="category"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {
                                        categories.map(value => (
                                            <MenuItem value={value.categoryName}
                                                      key={value.id}>{value.categoryName}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Grid>

                            <Grid item sm={6}>
                                <TextField
                                    required
                                    id="runTimeMinutes"
                                    name="runTimeMinutes"
                                    label="RunTimeMinutes"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    placeholder={"90"}
                                    type="number"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <FormControlLabel
                                    control={<Checkbox color="secondary" name="is-borrowable"
                                                       checked={isBorrowable}
                                                       onChange={e => setBorrowable(e.target.checked)}/>}
                                    label="IsBorrowable"
                                />
                            </Grid>

                            {!isBorrowable ? <>
                                    <Grid item sm={6}>
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
                                    <Grid item sm={6}>
                                        <TextField
                                            required
                                            id="borrowDate"
                                            name="borrowDate"
                                            helperText="Borrow Date"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="standard"
                                            type="date"
                                        />
                                    </Grid>
                                </>
                                :
                                <></>
                            }
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