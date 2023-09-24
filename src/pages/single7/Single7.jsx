import "./single7.scss";
import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import { Input } from '@mui/joy';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/joy/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination'; // Importa la paginación
import IconButton from '@mui/material/IconButton'; // Importa IconButton
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'; // Importa icono de flecha izquierda
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'; // Importa icono de flecha derecha
const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: "black",
  backgroundColor: "#e7e7e7"
}));


export default function BasicGrid({ onImageUrlChange, onIdChange, onTransactionIdChange, onDocumentNumberChange }) {
  const [documentNumber, setDocumentNumber] = useState('');
  const [clientData, setClientData] = useState(null);
  const [id, setId] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [dni, setDni] = useState('');
  const [searchDni, setSearchDni] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Cambia esto al número de elementos por página que deseas

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Función para manejar el cambio del ID del cliente
  const handleDocumentNumberChange = (value) => {
    setDocumentNumber(value);
  }

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://disfracesrosario.up.railway.app/clients/${documentNumber}/history`);
      console.log(response.data);
      setClientData(response.data);
      const imageUrl = response.data.imageUrl;
      if (imageUrl) {
        setImageUrl(imageUrl);
        // Llama a la prop onImageUrlChange para actualizar el estado del padre con la URL de la imagen
        if (onImageUrlChange) {
          onImageUrlChange(imageUrl);
        }
      }

      // Establece el ID del cliente
      setId(response.data.id);
      if (onIdChange) {
        onIdChange(response.data.id);
      }

    } catch (error) {
      console.error(error);
      alert("La ID no existe")
    }
  };


  const handleDniChange = (event) => {
    setDocumentNumber(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  // Función para manejar la selección de un disfraz
  const handleSelectCostume = (costume) => {
    onImageUrlChange(costume.image);
    onIdChange(costume.costumeIds);
    alert("Disfraz seleccionado");
    console.log("Datos de la transacción:", costume);
  }

  return (
    <div className='tabla'>
      <div className="datos2">
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid xs={2}>
            <Item>Nombre: {clientData ? clientData.name : ''}</Item>
          </Grid>
          <Grid xs={2}>
            <Item>Apellido: {clientData ? clientData.lastName : ''}</Item>
          </Grid>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid item xs={4}>
              <Input
                color="info"
                type="text"
                placeholder="Escribir ID cliente "
                onChange={handleDniChange}
              />
              <Grid item xs={2}>
              <Button onClick={handleSearch}>Buscar</Button>
            </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className="bar1">
      </div>
      {clientData && clientData.transactions &&
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID de la transaccion</TableCell>
                <TableCell>Nombre del Disfraz</TableCell>
                <TableCell>Fecha de Reserva</TableCell>
                <TableCell>Fecha de Entrega</TableCell>
                <TableCell>Pago</TableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
            {clientData.transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Realiza el corte según la página actual y los elementos por página
                .map((costume) => (
                <TableRow key={costume.id} style={{ minWidth: '10px' }}>
                  <TableCell style={{ minWidth: '25px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{costume.id}</TableCell>
                  <TableCell style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{costume.names}</TableCell>
                  <TableCell style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{costume.reservationDate}</TableCell>
                  <TableCell style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{costume.deadline}</TableCell>
                  <TableCell style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{costume.amount}</TableCell>
                  <TableCell>
                    {costume.image && (
                      <img src={costume.image} alt="Disfraz" height="100" width="100" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleSelectCostume(costume)}>
                      Seleccionar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={clientData.transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            // Agrega los botones de "Anterior" y "Siguiente"
            ActionsComponent={({ onPageChange, page }) => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => onPageChange(page - 1)} disabled={page === 0}>
                  <KeyboardArrowLeft />
                </IconButton>
                <IconButton onClick={() => onPageChange(page + 1)} disabled={page >= Math.ceil(clientData.transactions.length / rowsPerPage) - 1}>
                  <KeyboardArrowRight />
                </IconButton>
              </div>
            )}
          />
        </TableContainer>
      }
    </div>
  );

}  