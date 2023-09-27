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
  const [data, setData] = useState([]);

  function handleSearchTextChange(event) {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
  }

  useEffect(() => {
    fetch("https://disfracesrosario.up.railway.app/costumes")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const today = new Date(); // Obtener la fecha actual

  const alertTitle = "Mi Título Personalizado"; // Personaliza el título de las alertas

  useEffect(() => {
    data.forEach((row) => {
      if (row.costumeStatus === "ALQUILADO" && today > new Date(row.deadlineDate)) {
        alert(`${alertTitle}: ¡Cuidado! El disfraz ${row.name} alquilado aún no ha sido devuelto!`);
      } else if (
        row.costumeStatus === "RESERVADO" &&
        today.getTime() + 24 * 60 * 60 * 1000 >
          new Date(row.reservationDate).getTime()
      ) {
        alert(`${alertTitle}: ¡Alerta! Queda 1 día para retirar el disfraz ${row.name} reservado!`);
      }
    });
  }, [data, today, alertTitle]);

  return (
    <>
      <TextField
        label="Buscar"
        value={searchText}
        onChange={handleSearchTextChange}
      />
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Nombre del Disfraz</TableCell>
              <TableCell>Detalle</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Fecha de Retiro</TableCell>
              <TableCell>Fecha de Entrega</TableCell>
              <TableCell>Estatus</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <img
                    src={row.image}
                    alt={row.name}
                    style={{ width: 100, height: 100 }}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.detail}</TableCell>
                <TableCell>{row.clientRented || "-"}</TableCell>
                <TableCell>{new Date(row.deadlineDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(row.reservationDate).toLocaleDateString()}</TableCell>
                <TableCell style={{ color: row.costumeStatus === 'ALQUILADO' ? 'green' : row.costumeStatus === 'RESERVADO' ? 'blue' : 'goldenrod' }}>
                  <span className={`status ${row.costumeStatus}`}>
                    {row.costumeStatus}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default List;
