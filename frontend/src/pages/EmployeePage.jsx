// React
import * as React from 'react';
import {useEffect, useState} from "react";

// MUI components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete.js";
import Grid from "@mui/material/Grid";
import ListItemIcon from "@mui/material/ListItemIcon";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// MUI DataGrid
import {DataGrid, GridToolbarQuickFilter, useGridApiRef} from '@mui/x-data-grid';

// Axios
import axios from "axios";

// Custom components
import AddEmployeeDialog from "../modals/employee/AddEmployeeDialog.jsx";
import {a11yProps} from "../components/TabPanel.jsx";
import AddManagerDialog from "../modals/employee/AddManagerDIalog";
import AddCeoDialog from "../modals/employee/AddCeoDialog";
// import EditEmployeeDialog   from "../modals/edit_dialogs/EditEmployeeDialog";

// Context
import {useToast} from "../components/ToastContextProvider";

// const {useQuery, ...data} = createFakeServer({}, SERVER_OPTIONS);

const columns = [
    {field: 'id', headerName: 'ID', width: 90},
    {
        field: 'firstName',
        headerName: 'First name',
        type: "string",
        editable: true,
        width: 150,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        type: "string",
        editable: true,
        width: 150
    },
    {
        field: 'salary',
        headerName: 'Salary',
        type: 'number',
        width: 90,
    },
    {
        field: 'managerId',
        headerName: 'ManagerId',
        type: "number",
        editable: true,
        width: 120,
    },
    {
        field: 'isCeo',
        headerName: 'IsCEO',
        description: 'Only 1 CEO at a time.',
        type: 'boolean',
        sortable: true,
        width: 120,
    },
    {
        field: 'isManager',
        headerName: 'IsManager',
        description: 'Feudal lord',
        type: 'boolean',
        sortable: true,
        width: 120,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 140,
        renderCell: (params) => (
            <>
                <IconButton color={"error"} disabled={(params.row.subordinatesNum > 0)} aria-label="delete"
                            onClick={() => handleDelete(params)}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </>
        ),
    },

];

function handleDelete({api, row}) {
    axios.delete("api/employee/" + row.id)
        .then(response => response.data)
        .then(data => {
            if (data) {
                console.log("remove: " + row.id)
                api.updateRows([{id: row.id, _action: 'delete'}]);
            }
        }).catch((e) => console.log(e))
}

export default function EmployeePage() {
    const [rows, setRows] = useState([])
    const [rowsFilter, setRowsFilter] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [totalRowCount, setTotalRowCount] = useState(0)
    const [isOpenAddEmployee, setOpenAddEmployee] = useState(false);

    const [isShowCeoButton, setShowCeoButton] = useState(true)
    const [isOpenAddManager, setOpenAddManager] = useState(false);
    const [isOpenAddCeo, setOpenAddCeo] = useState(false);

    const [tabPage, setTabPage] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabPage(newValue);
    };

    const {toastError} = useToast();
    const apiRef = useGridApiRef();

    const fetchData = () => {
        setLoading(true)
        // axios.get("/api/employees?limit=" + pageSize + "&page=" + page)
        axios.get("/api/employees")
            .then(response => {
                return response.data
            })
            .then(data => {
                setTotalRowCount(data.size)
                setRows(data?.employees || [])
            })
            .catch((e) => toastError(e))
            .finally(() => setLoading(false))
    }

    // const { isLoading, rows, pageInfo } = useQuery(paginationModel); //Fake data

    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });

    // React.useEffect(() => {
    //     fetchData(paginationModel)
    // }, [useOnce]);

    React.useEffect(()=>{
        setShowCeoButton(rows.findIndex(row => row.isCeo) >= 0)
    },[rows])

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

    const handlerPaginationModel = ({pageSize, page}) => {
        // fetchData({page, pageSize})
        setPaginationModel({page, pageSize})
    }

    const [filterModel, setFilterModel] = React.useState({items: []});
    // const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

    // Because I do not want to pay for Premium MUI, I had to blow my head to come with a solution to having
    // multiple filtering arguments for the tabs. Alternative to filterModels.
    let filters = [
        (row) => !row.isManager && !row.isCeo,
        (row) => row.isManager,
        (row) => row.isCeo,
    ]

    useEffect(() => {
        console.log('row update')
        let filtered = rows.filter(filters[tabPage]); //Not nice, but I had no choice/time.
        setColumnVisibilityModel(columnVisibilityModels[tabPage])
        setRowsFilter(filtered)
        setTotalRowCount(filtered.length)
    }, [rows, tabPage])

    const processRowUpdate = React.useCallback(
        async (newRow, oldRow) => {

            if(!newRow.isCeo && !newRow.isManager && newRow.managerId == null){
                // apiRef.current.stopRowEditMode({id: oldRow.id, ignoreModifications: true})
                return oldRow;
            }

            let res = await axios.post("/api/employee/update", newRow)
                .catch(reason => toastError(reason))
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

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

    let columnVisibilityModels = [
        {isManager: false, isCeo: false},
        {isManager: false, isCeo: false},
        {isManager: false, managerId: false, isCeo: false},
    ]

    const handlerCellClick = (data) => {
        if (data.field == "actions") {
            fetchData()
        }
    }


    return (
        <React.Fragment>
            <Grid sx={{
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'space-between'
            }}>
                <Tabs centered value={tabPage} onChange={handleChange}>
                    <Tab label="Mortal Employees"/>
                    <Tab label="Managers"/>
                    <Tab label="CEO the Imperor"/>
                </Tabs>
                <ListItemIcon onClick={fetchData}>
                    <RestartAltIcon/>
                </ListItemIcon>
            </Grid>
            {/*<TabPanel value={value} index={0}>*/}
            <Box sx={{height: 680, width: '100'}}>
                <DataGrid
                    rows={rowsFilter}
                    columns={columns}
                    rowCount={totalRowCount}
                    apiRef={apiRef}
                    processRowUpdate={processRowUpdate}
                    onCellClick={handlerCellClick}

                    paginationModel={paginationModel}
                    //paginationMode="server"
                    onPaginationModelChange={handlerPaginationModel}
                    pageSizeOptions={[5, 10]}
                    loading={isLoading}
                    slots={{toolbar: GridToolbarQuickFilter,}}
                    filterModel={filterModel}
                    disableMultipleColumnsFiltering={false}
                    onFilterModelChange={(newFilterModel) => {
                        setFilterModel(newFilterModel)
                    }}
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                    // onChangePage={fetchData}

                    // checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>

            <Grid sx={{
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center'
            }}>
                <Button color="primary" href="#" onClick={() => setOpenAddEmployee(true)}>
                    Add employee
                </Button>
                <Button color="primary" href="#" onClick={() => setOpenAddManager(true)}>
                    Add manager
                </Button>
                <Button disabled={isShowCeoButton} color="primary" href="#" onClick={() => setOpenAddCeo(true)}>
                    Add CEO
                </Button>
            </Grid>

            <AddEmployeeDialog open={isOpenAddEmployee} addRow={addRow}
                               listManager={rows.filter((row) => row.isManager && !row.isCeo)}
                               handleClose={() => setOpenAddEmployee(false)}/>
            <AddManagerDialog open={isOpenAddManager} addRow={addRow}
                              listManager={rows.filter((row) => row.isManager || row.isCeo)}
                              handleClose={() => setOpenAddManager(false)}/>
            <AddCeoDialog open={isOpenAddCeo} addRow={addRow}
                          handleClose={() => setOpenAddCeo(false)}/>
        </React.Fragment>
    );
}
