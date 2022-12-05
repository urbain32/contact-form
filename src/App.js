import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { fontWeight, styled } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Contact } from './components/Contact';

const MyTable = styled(TableContainer)({
  width: '50%',
  margin: 'auto',
  marginTop: 10,
  padding: 2,
  borderRadius: 4,
});

function App() {
  const url = 'http://localhost:8005/contact';
  const [rows, setRows] = useState([]);
  const loadData = () => {
    axios
      .get(url)
      .then((res) => {
        setRows(res.data);
        console.log('data', res.data);
      })
      .catch((err) => {
        console.log('error message', err.message);
      });
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className='App'>
      <Contact url={url} />
      <br />
      <MyTable component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label='simple table'>
          <TableHead>
            <TableRow
              sx={{
                '& th': {
                  color: 'rgba(255, 255, 255)',
                  backgroundColor: 'black',
                },
              }}
            >
              <TableCell>Full name</TableCell>
              <TableCell align='right'>Email</TableCell>
              <TableCell align='right'>Phone Number</TableCell>
              <TableCell align='right'>Address</TableCell>
              <TableCell align='right'>PIN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 || rows.length === undefined ? (
              <TableCell colSpan={8}>Aucune donne</TableCell>
            ) : (
              rows.map((row, index) => (
                <TableRow
                  tabIndex={-1}
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='right'>{row.email}</TableCell>
                  <TableCell align='right'>{row.phone}</TableCell>
                  <TableCell align='right'>{row.address}</TableCell>
                  <TableCell align='right'>{row.pin}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </MyTable>
    </div>
  );
}

export default App;
