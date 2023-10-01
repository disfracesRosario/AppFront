import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        toast.error(`¡Cuidado! El disfraz ${row.name} alquilado aún no ha sido devuelto!`, {
          position: "top-right", // Posición de la notificación
          autoClose: 5000, // Tiempo de cierre automático en milisegundos (5 segundos en este caso)
          hideProgressBar: false, // Mostrar barra de progreso
          closeOnClick: true, // Cerrar al hacer clic en la notificación
          pauseOnHover: true, // Pausar cierre automático al pasar el cursor
          draggable: true, // Permitir arrastrar la notificación
          progress: undefined,
        });
      } else if (
        row.costumeStatus === "RESERVADO" &&
        today.getTime() + 24 * 60 * 60 * 1000 >
          new Date(row.reservationDate).getTime()
      ) {
        toast.warning(`¡Alerta! Queda 1 día para retirar el disfraz ${row.name} reservado!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  }, [data, today, alertTitle]);

  return (
    <>
      <ToastContainer /> {/* Contenedor de notificaciones */}
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
