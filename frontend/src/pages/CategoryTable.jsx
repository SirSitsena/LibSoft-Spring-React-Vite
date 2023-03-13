
import * as React from 'react';
import {DataGrid, GridLogicOperator, GridToolbar, GridToolbarQuickFilter, useGridApiRef} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import AddBookDialog from "../modals/library/AddBookDialog.jsx";
import AddDvdDialog from "../modals/library/AddDvdDialog.jsx";
import AddAudioBookDialog from "../modals/library/AddAudioBookDialog.jsx";
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddReferenceBookDialog from "../modals/library/AddReferenceBookDialog.jsx";
// import EditCategoriesDialog from "../modals/edit_dialogs/EditCategoriesDialog.jsx";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCheckoutDialog from "../modals/library/AddCheckoutDialog.jsx";
import AddCheckinDialog from "../modals/library/AddCheckinDialog.jsx";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ListItemIcon from "@mui/material/ListItemIcon";
import AutoStoriesIcon from "@mui/icons-material/AutoStories.js";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import AddCategoryDialog from "../modals/library/AddCategoryDialog.jsx";
import Link from "../components/StyledLink.jsx";
import {useToast} from "../components/ToastContextProvider";

// const {useQuery, ...data} = createFakeServer({}, SERVER_OPTIONS);


const columns = [
    {field: 'id', headerName: 'ID', width: 120},
    {
        field: 'categoryName',
        headerName: 'CategoryName',
        width: 180,
        editable:true,
        // valueGetter: ({ value }) => value && value,
    },
    {
        field: 'timesUsed',
        headerName: 'Uses',
        width: 50,
        editable:true,
        alligh: "left",
        // valueGetter: ({ value }) => value && value,
    },
    {
        field: 'actions',
        headerName: '',
        width: 50,
        renderCell: (params) => (
            <>
                <IconButton color={"error"} disabled={(params.row.timesUsed > 0)} aria-label="delete" onClick={() => handleDelete(params)}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </>
        ),
    },

];

function handleDelete({api,row}) {
    axios.delete("api/category/"+row.id)
        .then(response => response.data)
        .then(data => {
            if (data){
                console.log("remove: "+row.id)
                api.updateRows([{ id: row.id, _action: 'delete' }]);
            } else {
            }
        }).catch((e) => console.log(e))
}

export default function CategoryTable() {
    const [useOnce, setUse] = useState(true)
    const [rows, setRows] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [totalRowCount, setTotalRowCount] = useState(0)

    const [isOpenAddCategory, setOpenAddCategory] = React.useState(false);

    const [value, setValue] = React.useState(0);
    const [selectRow, setSelectRow] = React.useState({});

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { toastError } = useToast();

    const fetchData = () => {
        setLoading(true)
        // axios.get("/api/lib-items?limit=" + pageSize + "&page=" + page)
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

    // React.useEffect(() => {
    //     fetchData()
    // }, [useOnce]);

    React.useEffect(() => {
        fetchData()
        const interval = setInterval(() => fetchData(), 60*1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    React.useEffect(() => {//TODO remove
        console.log("Update row")
    }, [rows]);

    const addRow = (row)=>{
        // setRows([...rows,row])
        apiRef.current.updateRows([row]);
    }
    // const { isLoading, rows, pageInfo } = useQuery(paginationModel); //Fake data

    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });

    const handlerPaginationModel = ({pageSize, page}) => {
        setPaginationModel({page, pageSize})
    }


    // useEffect(()=>{
    // },[value])

    const apiRef = useGridApiRef();
    // const handlerChangeRow = async (data,e) => {
        // console.log(data)
        // console.log(e)
        //
        // if(data.reason == 'enterKeyDown') {
        //     let res = await axios.post("/api/lib-item/update", data.row)
        //         .catch(reason => console.log(reason.response.data))
        //     // if(e.preventDefault) e.preventDefault()
        //     if (!res) {
        //         console.log("revert")
        //         e.defaultMuiPrevented = true
        //         // apiRef.current.stopRowEditMode({id:data.id,ignoreModifications:true})
        //     } else {
        //         console.log(res.status + " update ")
        //         console.log(res)
        //     }
        // } else {
        //     e.defaultMuiPrevented = true
        //     apiRef.current.stopRowEditMode({id:data.id,ignoreModifications:true})
        // }
    // }
    // const handlerCellClick = (data) => {
    //     console.log(data.row[data.field])
    //     if(data.field == "isBorrowable"){
    //         setSelectRow(data.row)
    //         if(data.row[data.field]) {
    //             setOpenCheckout(true)
    //         } else {
    //             setOpenCheckin(true)
    //         }
    //     }
    // }

    const processRowUpdate = React.useCallback(
        async (newRow,oldRow) => {
            let res = await axios.post("/api/category/update", newRow)
                    .catch(reason => toastError(reason.response.data))
            // if(e.preventDefault) e.preventDefault()
            if (!res) {
                apiRef.current.stopRowEditMode({id:oldRow.id,ignoreModifications:true})
                return oldRow;
            } else {
                console.log("update "+res.status)
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

            {/*<TabPanel value={value} index={0}>*/}
            <Box sx={{display:'flex',justifyContent: 'center',height: 685, width: '100%','padding': '0 40%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowCount={totalRowCount}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'categoryName', sort: 'asc' }],
                        },
                    }}
                    apiRef={apiRef}
                    processRowUpdate={processRowUpdate}
                    // onCellClick={handlerCellClick}

                    editMode="row"
                    paginationModel={paginationModel}
                    //paginationMode="server"
                    onPaginationModelChange={handlerPaginationModel}
                    pageSizeOptions={[5,10,20,30]}
                    loading={isLoading}
                    slots={{toolbar: GridToolbarQuickFilter,}}
                    // onRowEditStop={handlerChangeRow}
                    // processRowUpdate={processRowUpdate}

                    // checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
            {/*</TabPanel>*/}
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
            {/*<EditCategoriesDialog open={isOpenAddReferenceBook} handleClose={() => setOpenAddReferenceBook(false)}/>*/}
        </React.Fragment>
    );
}

