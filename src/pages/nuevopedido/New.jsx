import "./new1.scss";
import * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource2";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from '@mui/joy';
import Single6 from "../single6/Single";
import Button from '@mui/joy/Button';
import Calendario from "../calendario/Calendario";
import Check from "../check/Check";


const Datatable = () => {
  const [data, setData] = useState(userRows);


  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };



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

  return (
    <div className="datatable">
      <button>
        <a href="/">Volver</a>
      </button>


      <div className="bar"> <Input
        color="info"
        disabled={false}
        placeholder="Escribir Dni"
        size="lg"
        variant="outlined"
      />
        <Button variant="outlined">Aceptar</Button>
      </div>
      <div className="info-cliente">
        <Single6 />
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={15}
        rowsPerPageOptions={[15]}
        checkboxSelection
        rowHeight={140} />


      <div className="info">
        <div className="calendario">
          <Calendario />
        </div>
        <img src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/2AYDKWFWUBG7VNZ24CJVPHHOWI.jpg" alt="" />
      </div>





      <div className="botones">
        <Input
          color="info"
          placeholder="Monto"
          variant="soft"
        />   <Input
          color="info"
          placeholder="Detalle"
          variant="outlined"
        />
        <input type="text" name="tipo_de_dato" />
        <input type="text" name="tipo_de_dato" />
        <input type="text" name="tipo_de_dato" />
      </div>

      <div className="check">
        <Check /> Banco
        <Check /> Remito
      </div>
      <div className="final">
        <button>Aceptar</button>
      </div>
    </div>

  );
};

export default Datatable;
