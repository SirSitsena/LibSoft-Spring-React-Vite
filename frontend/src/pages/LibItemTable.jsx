
// React
import * as React from 'react';
import {useEffect, useState} from "react";

// MUI components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ListItemIcon from "@mui/material/ListItemIcon";
import AutoStoriesIcon from "@mui/icons-material/AutoStories.js";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

// MUI DataGrid
import {DataGrid, GridLogicOperator, GridToolbar, GridToolbarQuickFilter, useGridApiRef} from '@mui/x-data-grid';

// Axios
import axios from "axios";

// Custom components
import AddBookDialog from "../modals/library/AddBookDialog.jsx";
import AddDvdDialog from "../modals/library/AddDvdDialog.jsx";
import AddAudioBookDialog from "../modals/library/AddAudioBookDialog.jsx";
import {TabPanel, a11yProps} from "../components/TabPanel.jsx";
import AddReferenceBookDialog from "../modals/library/AddReferenceBookDialog.jsx";
// import EditCategoriesDialog from "../modals/edit_dialogs/EditCategoriesDialog.jsx";
import AddCheckoutDialog from "../modals/library/AddCheckoutDialog.jsx";
import AddCheckinDialog from "../modals/library/AddCheckinDialog.jsx";
import Link from "../components/StyledLink.jsx";

// Context
import {useToast} from "../components/ToastContextProvider";


// const {useQuery, ...data} = createFakeServer({}, SERVER_OPTIONS);

function acronym(title) {
    return title.toString().split(' ').map((word) => word[0]).join('').toUpperCase()
}

function removeAcronym(title) {
    let split = title.split('(');
    if (split.length > 0) {
        return split[0]
    }
    return title;
}

const columns = [
    {field: 'id', headerName: 'ID', width: 75},
    {
        field: 'title',
        headerName: 'Title',
        width: 290,
        editable: true,
        valueGetter: ({value}) => value && value + ' (' + acronym(value) + ')',
    },
    {
        field: 'author',
        headerName: 'Author',
        width: 120,
        editable: true,
    },
    {
        field: 'category',
        headerName: 'Category',
        width: 100,
        editable: true,
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 110,
        editable: false,
    },
    {
        field: 'pages',
        headerName: 'Pages',
        width: 60,
        editable: true,
    },
    {
        field: 'runTimeMinutes',
        headerName: 'RunTimeMinutes',
        width: 150,
        editable: true,
    },
    {
        field: 'isBorrowable',
        headerName: 'IsBorrowable',
        type: "boolean",
        width: 100,
        editable: false,
    },
    {
        field: 'borrower',
        headerName: 'Borrower',
        width: 140,
        editable: false,
    },
    {
        field: 'borrowDate',
        headerName: 'BorrowDate',
        type: 'dateTime',
        valueGetter: ({value}) => value && new Date(value),
        width: 160,
        editable: false,
    },
    {
        field: 'actions',
        headerName: '',
        width: 50,
        renderCell: (params) => (
            <>
                <IconButton color={"error"} aria-label="delete" onClick={() => handleDelete(params)}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </>
        ),
    },

    // {
    //     field: 'isManager',
    //     headerName: 'IsManager',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: true,
    //     editable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },

];

function handleDelete({api, row}) {
    axios.delete("api/lib-item/" + row.id)
        .then(response => response.data)
        .then(data => {
            if (data) {
                console.log("remove: " + row.id)
                api.updateRows([{id: row.id, _action: 'delete'}]);
            }
        }).catch((e) => console.log(e))
}

export default function LibItemTable() {
    const [useOnce, setUse] = useState(true)
    const [rows, setRows] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [totalRowCount, setTotalRowCount] = useState(0)

    const [isOpenAddBook, setOpenAddBook] = React.useState(false);
    const [isOpenAddDvd, setOpenAddDvd] = React.useState(false);
    const [isOpenAddAudioBook, setOpenAddAudioBook] = React.useState(false);
    const [isOpenAddReferenceBook, setOpenAddReferenceBook] = React.useState(false);
    const [isOpenCheckout, setOpenCheckout] = React.useState(false);
    const [isOpenCheckin, setOpenCheckin] = React.useState(false);

    const [tabPage, setTabPage] = React.useState(0);
    const [selectRow, setSelectRow] = React.useState({});

    const handleChange = (event, newValue) => {
        setTabPage(newValue);
    };

    const {toastError} = useToast();
    const apiRef = useGridApiRef();

    const fetchData = () => {
        setLoading(true)
        // axios.get("/api/lib-items?limit=" + pageSize + "&page=" + page)
        axios.get("/api/lib-items")
            .then(response => {
                return response.data
            })
            .then(data => {
                setTotalRowCount(data.size)
                setRows(data["lib-items"] || [])
            })
            .catch((e) => toastError(e))
            .finally(() => setLoading(false))
    }

    // React.useEffect(() => {
    //     fetchData()
    // }, [useOnce]);

    React.useEffect(() => {
        fetchData()
        const interval = setInterval(() => fetchData(), 60 * 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    React.useEffect(() => {//TODO remove
        console.log("Update row")
    }, [rows]);

    const addRow = (row) => {
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

    const [filterModel, setFilterModel] = React.useState({items: []});
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

    let filterModels = [
        {items: [{id: 100, field: 'type', operator: 'equals', value: 'book'}]},
        {items: [{id: 100, field: 'type', operator: 'equals', value: 'dvd'}]},
        {items: [{id: 100, field: 'type', operator: 'equals', value: 'audio_book'}]},
        {items: [{id: 100, field: 'type', operator: 'equals', value: 'reference_book'}]},
    ]
    let columnVisibilityModels = [
        {type: false, runTimeMinutes: false},
        {type: false, author: false, pages: false},
        {type: false, author: false, pages: false},
        {type: false, runTimeMinutes: false, isBorrowable: false, borrower: false, borrowDate: false},
    ]

    useEffect(() => {
        setFilterModel(filterModels[tabPage])
        setColumnVisibilityModel(columnVisibilityModels[tabPage])
        let pages = ['book','dvd','audio_book','reference_book']
        setTotalRowCount(rows.filter(row => row.type == pages[tabPage]).length)
    }, [tabPage])

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
    const handlerCellClick = (data) => {
        if (data.field == "isBorrowable") {
            setSelectRow(data.row)
            if (data.row[data.field]) {
                setOpenCheckout(true)
            } else {
                setOpenCheckin(true)
            }
        }
    }

    const processRowUpdate = React.useCallback(
        async (newRow, oldRow) => {
            newRow.title = removeAcronym(newRow.title).trimEnd()
            let res = await axios.post("/api/lib-item/update", newRow)
                .catch(e => toastError(e))
            // if(e.preventDefault) e.preventDefault()
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
                'justify-content': 'space-between'
            }}>
                <Tabs centered value={tabPage} onChange={handleChange}>
                    <Tab label="Book"/>
                    <Tab label="DVD"/>
                    <Tab label="Audio Book"/>
                    <Tab label="Reference Book"/>
                    {/*<ListItemButton>*/}

                    {/*<ListItemText primary="Library"/>*/}
                    {/*</ListItemButton>*/}
                </Tabs>
                <ListItemIcon onClick={fetchData}>
                    <RestartAltIcon/>
                </ListItemIcon>
            </Grid>

            {/*<TabPanel value={value} index={0}>*/}
            <Box sx={{height: 685, width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowCount={totalRowCount}
                    apiRef={apiRef}
                    processRowUpdate={processRowUpdate}
                    onCellClick={handlerCellClick}

                    editMode="row"
                    paginationModel={paginationModel}
                    //paginationMode="server"
                    onPaginationModelChange={handlerPaginationModel}
                    pageSizeOptions={[5, 10, 20, 30]}
                    loading={isLoading}
                    slots={{toolbar: GridToolbarQuickFilter,}}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) => {
                        setFilterModel(newFilterModel)
                    }}
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
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
                'justify-content': 'space-between'
            }}>
                <Grid>
                    <Button color="primary" href="#" onClick={() => {
                        setOpenAddBook(true)
                        setTabPage(0)
                    }} sx={{mt: 3}}>
                        Add book
                    </Button>
                    <Button color="primary" href="#" onClick={() => {
                        setOpenAddDvd(true)
                        setTabPage(1)
                    }} sx={{mt: 3}}>
                        Add DvD
                    </Button>
                    <Button color="primary" href="#" onClick={() => {
                        setOpenAddAudioBook(true)
                        setTabPage(2)
                    }} sx={{mt: 3}}>
                        Add Audio Book
                    </Button>
                    <Button color="primary" href="#" onClick={() => {
                        setOpenAddReferenceBook(true)
                        setTabPage(3)
                    }} sx={{mt: 3}}>
                        Add Reference Book
                    </Button>
                </Grid>
                <Link to="/categories">
                    <Button color="primary" sx={{mt: 3}}>
                        Manage Categories
                    </Button>
                </Link>
            </Grid>

            <AddBookDialog addRow={addRow} open={isOpenAddBook} handleClose={() => setOpenAddBook(false)}/>
            <AddCheckoutDialog updateRow={addRow} row={selectRow} open={isOpenCheckout}
                               handleClose={() => setOpenCheckout(false)}/>
            <AddCheckinDialog updateRow={addRow} row={selectRow} open={isOpenCheckin}
                              handleClose={() => setOpenCheckin(false)}/>
            <AddDvdDialog addRow={addRow} open={isOpenAddDvd} handleClose={() => setOpenAddDvd(false)}/>
            <AddAudioBookDialog addRow={addRow} open={isOpenAddAudioBook}
                                handleClose={() => setOpenAddAudioBook(false)}/>
            <AddReferenceBookDialog addRow={addRow} open={isOpenAddReferenceBook}
                                    handleClose={() => setOpenAddReferenceBook(false)}/>
            {/*<EditCategoriesDialog open={isOpenAddReferenceBook} handleClose={() => setOpenAddReferenceBook(false)}/>*/}
        </React.Fragment>
    );
}

