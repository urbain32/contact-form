import { Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import "./App.css";
import { Contact } from "./components/Contact";

const MyTable = styled(TableContainer)({
  width: "50%",
  margin: "auto",
  marginTop: 10,
  padding: 2,
  borderRadius: 4,
});

function App() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Ajouter");
  const [currentBank, setCurrentBank] = useState({
    name: "",
    email: "",
    code: "",
    address: "",
    number: "",
    pin: "",
  });
  const setCurrent = (event, row) => {
    setCurrentBank({
      id: row.id,
      name: row.name,
      email: row.email,
      address: row.address,
      number: row.number,
      code: row.code,
      pin: row.pin,
    });
    setTitle("Modifier");
  };
  const url = "http://localhost:8005/contact";
  const loadData = () => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setRows(res.data);
        // console.log('data', res.data);
      })
      .catch((err) => {
        console.log("error message", err.message);
        setLoading(false);
      });
    setCurrentBank({
      name: "",
      email: "",
      number: "",
      code: "",
      address: "",
      pin: "",
    });
    setTitle("Ajouter");
  };
  useEffect(() => {
    loadData();
  }, []);
  // deleting function
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8005/contact/${id}`)
      .then(() => loadData())
      .catch((err) => {
        console.log("errorr message", err.message);
      });
  };
  return (
    <div className="App">
      <Contact
        row={rows}
        handleDelete={handleDelete}
        title={title}
        setTitle={setTitle}
        currentBank={currentBank}
        loadData={loadData}
      />
      <br />
      <MyTable component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  color: "rgba(255, 255, 255)",
                  backgroundColor: "black",
                },
              }}
            >
              <TableCell>Full name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">PIN</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 || rows.length === undefined ? (
              <TableCell colSpan={8} align="center">
                <Marquee speed={20} delay={10}>
                  <h1 style={{ color: "rebeccapurple" }}>NO DATA FOUND</h1>
                </Marquee>
              </TableCell>
            ) : (
              rows.map((row, index) => (
                <TableRow
                  hover
                  onClick={(event) => setCurrent(event, row)}
                  tabIndex={-1}
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">
                    {row.code} {row.number}
                  </TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{row.pin}</TableCell>
                  <TableCell align="right">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      onClick={() => handleDelete(row.id)}
                    >
                      <Delete sx={{ ":hover": { color: "red" } }} />
                    </motion.div>
                  </TableCell>
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
