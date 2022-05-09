import React, { useState } from 'react';
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
  
const rows = [
        { lastName: 'Snow', firstName: 'Jon', email: 'a@gmail.com', phone: '0987654321', role: 'Customer' },
        { lastName: 'Lannister', firstName: 'Cersei', email: 'a@gmail.com', phone: '0987654321', role: 'Customer' },
        { lastName: 'Lannister', firstName: 'Jaime',  email: 'a@gmail.com', phone: '0987654321', role: 'Customer' },
        { lastName: 'Stark', firstName: 'Arya', email: 'a@gmail.com', phone: '0987654321', role: 'Customer' },
        { lastName: 'Targaryen', firstName: 'Daenerys', email: 'a@gmail.com', phone: '0987654321', role: 'Customer' },
        { lastName: 'Melisandre', firstName: null, email: 'a@gmail.com', phone: '0987654321', role: 'Customer' },
        { lastName: 'Clifford', firstName: 'Ferrara', email: 'a@gmail.com', phone: '0987654321', role: 'Customer'  },
        { lastName: 'Frances', firstName: 'Rossini', email: 'a@gmail.com', phone: '0987654321', role: 'Customer' },
        { lastName: 'Roxie', firstName: 'Harvey', email: 'a@gmail.com', phone: '0987654321', role: 'Customer'  },
];

const headers = [
    'Name', 'Email', 'Phone', 'Role'
];


// const UsersTable = () => {
//     const [page, setPage] = React.useState(2);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };
//     return (
//         <TableContainer
//             component={Paper}
//         >
//             <Table sx={{ minWidth: 650 }}>
//                 <TableHead sx={{ bgcolor: 'primary.dark' }} >
//                     <TableRow>
//                         {headers.map((header) => (
//                             <TableCell key={header}>
//                                 <Typography variant='h6'>
//                                     {header}
//                                 </Typography>
//                             </TableCell>
//                         ))}
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {rows.map((row, index) => (
//                         <TableRow
//                             key={index}
//                             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                         >
//                             <TableCell component='th' scope='row'>
//                                 <Typography variant='body1'>
//                                     {row.firstName}
//                                 </Typography>                               
//                             </TableCell>
//                             <TableCell>
//                                 <Typography variant='body1'>
//                                     {row.lastName}
//                                 </Typography>
//                             </TableCell>
//                             <TableCell>
//                                 <Typography variant='body1'>
//                                     {row.email}
//                                 </Typography>                                
//                             </TableCell>
//                             <TableCell>
//                                 <Typography variant='body1'>
//                                     {row.phone}
//                                 </Typography>
//                             </TableCell>
//                             <TableCell>
//                                 <Typography variant='body1'>
//                                     {row.role}
//                                 </Typography>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//             <TablePagination
//                     component='div'
//                     count={100}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//         </TableContainer>
//     );
// };

const UsersTable = () => {
    const [order, setOrder] = useState('arc');
    const [orderBy, setOrderBy] = useState('firstName');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectedClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
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
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                        <TableCell size='medium'>
                                            <Typography variant='body1'>
                                                {row.role}
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
                        count={rows.length}
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