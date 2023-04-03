import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";


const List = () => {
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState(null);
    const url = window.location.href;
    const id = url.split("/").pop();

    function handleSearchTextChange(event) {
        const newSearchText = event.target.value;
        setSearchText(newSearchText);
    }

    
    useEffect(() => {
        fetch(`https://disfraces-production.up.railway.app/costumes/${id}/history`)
            .then((response) => response.json())
            .then((data) => setData(data));
    }, [id]);
    

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <TextField
                label="Search"
                value={searchText}
                onChange={handleSearchTextChange}
            />
            <TableContainer component={Paper} className="table">
                <Table sx={{ minWidth: 250 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
            <TableCell sx={{ width: 5 }}>ID</TableCell>
            <TableCell sx={{ width: 20 }}>Nombre del Disfraz</TableCell>
            <TableCell sx={{ width: 30 }}>Detalle</TableCell>
            <TableCell sx={{ width: 10 }}>Cliente</TableCell>
            <TableCell sx={{ width: 15 }}>Fecha de Retiro</TableCell>
            <TableCell sx={{ width: 15 }}>Fecha de Entrega</TableCell>
            <TableCell sx={{ width: 10 }}>Estatus</TableCell>
        </TableRow>

                    </TableHead>
                    <TableBody>
                        {data && (
                            <TableRow>
                                <TableCell>{data.id}</TableCell>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.detail}</TableCell>
                                <TableCell>{data.clients && data.clients[0] && data.clients[0].name}</TableCell>
                                <TableCell>{data.transactions && data.transactions[0] && data.transactions[0].reservationDate}</TableCell>
                                <TableCell>{data.transactions && data.transactions[0] && data.transactions[0].deadline}</TableCell>
                                <TableCell>
                                    <span className={`status ${data.transactions && data.transactions[0] && data.transactions[0].checkIn}`}>
                                        {data.transactions && data.transactions[0] && data.transactions[0].checkIn}
                                    </span>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
};

export default List;
