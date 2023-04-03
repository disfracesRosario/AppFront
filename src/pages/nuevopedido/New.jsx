import "./new1.scss";
import * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource2";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from '@mui/joy';
import Single6 from "../single6/Single";
import Button from '@mui/joy/Button';
import Calendario from "../calendario/Calendario";
import Check from "../check/Check";
import BasicGrid from "../../pages/single6/Single";
import Disfraces from "../disfraces2/Disfraces";
import axios from 'axios';


const Datatable = ({ singleId }) => {
  const [selectedDni, setSelectedDni] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [clientId, setClientId] = useState('');
  const [costumeIds, setCostumeIds] = useState([]);
  const [reservationDate, setReservationDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [checkIn, setCheckIn] = useState([]);



  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const [data, setData] = useState(userRows);

  const actionColumn = [
    {
      field: "action",
      headerName: "Accion",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/user" style={{ textDecoration: "none" }}>
              <div className="viewButton">Detalles</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Borrar
            </div>
          </div>
        );
      },
    },
  ];

  const handleAccept = () => {
    const data = {
      amount,
      type,
      clientId,
      costumeIds,
      reservationDate,
      deadline,
      checkIn
    };

    axios.post('https://disfraces-production.up.railway.app/transactions/newTransaction', data)
      .then(response => {
        console.log(response.data);
        // Aquí puedes hacer algo con la respuesta, como redirigir a otra página
      })
      .catch(error => {
        console.error(error);
        // Aquí puedes manejar el error de alguna manera
      });
  };

  const handleImageUrlChange = (url) => {
    setImageUrl(url);
  };

  return (
    <div className="datatable">
      <button>
        <a href="/">Volver</a>
      </button>
      <div className="info-cliente">
        <BasicGrid id={selectedDni} onImageUrlChange={handleImageUrlChange} />
      </div>
      <div className="tabla">
        <Disfraces onCostumeIdsChange={setCostumeIds}></Disfraces></div>

      <div className="info">
        <div className="calendario">
          <Calendario value={reservationDate} onChange={setReservationDate} />
          <Calendario value={deadline} onChange={setDeadline} />
        </div>
      </div>

      <div className="botones">
        <Input
          color="info"
          placeholder="Monto"
          variant="soft"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <Input
          color="info"
          placeholder="Tipo"
          variant="outlined"
          value={type}
          onChange={(event) => setType(event.target.value)}
        />
      </div>

      <div className="check">
        <Check checked={checkIn.includes('Banco')} onChange={(event) => {
          if (event.target.checked) {
            setCheckIn([...checkIn, 'Banco']);
          } else {
            setCheckIn(checkIn.filter(item => item !== 'Banco'));
          }
        }} /> Banco
        <Check checked={checkIn.includes('Remito')} onChange={(event) => {
          if (event.target.checked) {
            setCheckIn([...checkIn, 'Remito']);
          } else {
            setCheckIn(checkIn.filter(item => item !== 'Remito'));
          }
        }} /> Remito
      </div>
      <div className="final">
        <Button onClick={handleAccept}>Aceptar</Button>
      </div>
    </div>
  );
};

export default Datatable;
