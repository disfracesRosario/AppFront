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
import BasicGrid from "../../pages/single6/Single";
import Disfraces from "../disfraces2/Disfraces";
import axios from 'axios';
import Check from "../check/Check";
import { DatePicker, Space } from 'antd';




const Datatable = ({ singleId }) => {
  const [selectedDni, setSelectedDni] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [clientId, setClientId] = useState('');
  const [costumeIds, setCostumeIds] = useState([]);
  const [checkIn, setCheckIn] = useState([]);
  const [id, setId] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [deadline, setDeadline] = useState('');




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

  const handleCheckInChange = (name, checked) => {
    if (checked) {
      setCheckIn([...checkIn, name]);
    } else {
      setCheckIn(checkIn.filter((item) => item !== name));
    }
  };



  const onCostumeSelect = (id) => {
    setCostumeIds((prevIds) => [...prevIds, id]);
  };

  const handleAccept = () => {
    const data = {
      amount,
      type,
      clientId,
      costumeIds,
      reservationDate,
      deadline,
      checkIn: checkIn.join(',') // Convertir el array a un string separado por comas
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

  const handleImageUrlChange = (url, clientIdValue) => {
    setImageUrl(url);
    setClientId(clientIdValue);
  };
  const handleSelect = (ids) => {
    onCostumeSelect(ids);
  };
  const handleSelectionChange = (selection) => {
    const selectedIds = selection.map((selectedRow) => selectedRow.id);
    handleSelect(selectedIds);
  };
  

  const handleIdChange = (id) => {
    setClientId(id);
  };
  const handleCostumeSelect = (id) => {
    setCostumeIds([id]); // Actualizar el valor de costumeIds
  };



  return (
    <div className="datatable">
      <button>
        <a href="/">Volver</a>
      </button>
      <div className="info-cliente">
        <BasicGrid onImageUrlChange={handleImageUrlChange} onIdChange={handleIdChange} />
      </div>
      <div className="id">
      </div>
      <div className="tabla">
        <Disfraces onCostumeSelect={handleCostumeSelect} />
        <Input
          color="info"
          placeholder="IDs de disfraces (separados por comas)"
          variant="outlined"
          value={costumeIds.join(',')}
          onChange={(event) => {
            const ids = event.target.value.split(',').map((id) => id.trim());
            setCostumeIds(ids);
          }}
        />
      </div>
      <div className="info">
        <div className="calendario">
          <Calendario
            reservationDate={reservationDate}
            setReservationDate={setReservationDate}
            deadline={deadline}
            setDeadline={setDeadline}
          />
        </div>
      </div>
      <div className="botones">
        <Input
          color="info"
          placeholder="Monto"
          variant="soft"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
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
        <div className="check">
          <Check name="Banco" onCheckInChange={handleCheckInChange} />
          <Check name="Remito" onCheckInChange={handleCheckInChange} />
        </div>
      </div>

      <div className="final">
        <Button onClick={handleAccept}>Aceptar</Button>
      </div>
    </div>
  );
};

export default Datatable;