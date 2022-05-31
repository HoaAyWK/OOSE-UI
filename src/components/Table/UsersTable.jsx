import React, { useState, useEffect } from 'react';
import { 
    Avatar,
    Box,
    Table, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography,
    Paper,  
    TableBody,
    TablePagination,
    
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { startSetAllUser } from '../../slices/users/userCreator';
  
const headers = [
    'Name', 'Email', 'Phone', 'Status'
];

const UsersTable = () => {
    const [order, setOrder] = useState('arc');
    const [orderBy, setOrderBy] = useState('firstName');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { users } = useSelector((state) => state.users);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startSetAllUser());
    }, [dispatch])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectedClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = users.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
    
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
          );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', borderRadius: 5 }}>
                <TableContainer sx={{ borderRadius: 5 }}>
                    <Table
                        sx={{ minWidth: 750}}
                    >
                        <TableHead sx={{ bgcolor: 'primary.dark'}} >
                            <TableRow>
                                {headers.map((header) => (
                                    <TableCell key={header}>
                                        <Typography variant='h6'>
                                            {header}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow
                                        key={index}
                                    >
                                        <TableCell sx={{ display: 'flex', alignItems: 'center' }} size='medium'>
                                            <Avatar sx={{ marginRight: 2 }}>
                                                <AccountCircleIcon />
                                            </Avatar>
                                            <Typography variant='body1'>
                                                {row.firstName + ' ' + row.lastName}
                                            </Typography>
                                        </TableCell>
                                       
                                        <TableCell size='medium'>
                                            <Typography variant='body1'>
                                                {row.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell size='medium'>
                                            <Typography variant='body1'>
                                                {row.phone}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} size='medium' height={74} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={users?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer> 
            </Paper>
        </Box>
    )
}

export default UsersTable;