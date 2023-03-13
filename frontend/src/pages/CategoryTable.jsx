import * as React from 'react';
import {DataGrid, GridToolbarQuickFilter, useGridApiRef} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import {useState} from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ListItemIcon from "@mui/material/ListItemIcon";
import AddCategoryDialog from "../modals/library/AddCategoryDialog.jsx";
import Link from "../components/StyledLink.jsx";
import {useToast} from "../components/ToastContextProvider";


const columns = [
    {field: 'id', headerName: 'ID', width: 120},
    {
        field: 'categoryName',
        headerName: 'CategoryName',
        width: 180,
        editable: true,
    },
    {
        field: 'timesUsed',
        headerName: 'Uses',
        width: 50,
        editable: true,
        // alligh: "left",
    },
    {
        field: 'actions',
        headerName: '',
        width: 50,
        renderCell: (params) => (
            <>
                <IconButton color={"error"} disabled={(params.row.timesUsed > 0)} aria-label="delete"
                            onClick={() => handleDelete(params)}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </>
        ),
    },

];

function handleDelete({api, row}) {
    axios.delete("api/category/" + row.id)
        .then(response => response.data)
        .then(data => {
            if (data) {
                // console.log("remove: " + row.id)
                api.updateRows([{id: row.id, _action: 'delete'}]);
            } else {
            }
        }).catch((e) => console.log(e))
}

export default function CategoryTable() {
    const [rows, setRows] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [totalRowCount, setTotalRowCount] = useState(0)

    const [isOpenAddCategory, setOpenAddCategory] = React.useState(false);

    const [_, setValue] = React.useState(0);

    const {toastError} = useToast();

    const fetchData = () => {
        setLoading(true)
        axios.get("/api/categories")
            .then(response => {
                return response.data
            })
            .then(data => {
                setTotalRowCount(data.size)
                setRows(data["categories"] || [])
            })
            .catch((e) => toastError(e))
            .finally(() => setLoading(false))
    }

    React.useEffect(() => {
        fetchData()
        const interval = setInterval(() => fetchData(), 60 * 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const addRow = (row) => {
        apiRef.current.updateRows([row]);
    }

    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });

    const handlerPaginationModel = ({pageSize, page}) => {
        setPaginationModel({page, pageSize})
    }

    const apiRef = useGridApiRef();

    const processRowUpdate = React.useCallback(
        async (newRow, oldRow) => {
            let res = await axios.post("/api/category/update", newRow)
                .catch(reason => toastError(reason.response.data))
            if (!res) {
                apiRef.current.stopRowEditMode({id: oldRow.id, ignoreModifications: true})
                return oldRow;
            } else {
                console.log("update " + res.status)
                return newRow;
            }
        },
        [],
    );

    return (
        <React.Fragment>
            <Grid sx={{
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'end',
                'margin-bottom': '0.5rem'
            }}>

                <ListItemIcon onClick={fetchData}>
                    <RestartAltIcon/>
                </ListItemIcon>
            </Grid>

            <Box sx={{display: 'flex', justifyContent: 'center', height: 685, width: '100%', 'padding': '0 40%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowCount={totalRowCount}
                    initialState={{
                        sorting: {
                            sortModel: [{field: 'categoryName', sort: 'asc'}],
                        },
                    }}
                    apiRef={apiRef}
                    processRowUpdate={processRowUpdate}

                    editMode="row"
                    paginationModel={paginationModel}
                    onPaginationModelChange={handlerPaginationModel}
                    pageSizeOptions={[5, 10, 20, 30]}
                    loading={isLoading}
                    slots={{toolbar: GridToolbarQuickFilter,}}

                    disableRowSelectionOnClick
                />
            </Box>

            <Grid sx={{
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'space-around'
            }}>
                <Link to="/library">
                    <Button color="primary" href="#">
                        Return to Library Table
                    </Button>
                </Link>
                <Button color="primary" href="#" onClick={() => {
                    setOpenAddCategory(true)
                    setValue(3)
                }}>
                    Add Category
                </Button>
            </Grid>

            <AddCategoryDialog addRow={addRow} open={isOpenAddCategory} handleClose={() => setOpenAddCategory(false)}/>
        </React.Fragment>
    );
}

