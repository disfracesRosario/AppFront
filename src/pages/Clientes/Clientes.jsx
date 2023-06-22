import "./clientes.scss";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { userColumns } from "../../tablaclient";
import UserTable, { userRows } from "../../tablaclient";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { TextField } from "@mui/material";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const filteredRows = data.filter((row) =>
  row.documentNumber?.toLowerCase().includes(searchValue.toLowerCase())
);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  }

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const rows = await userRows(id);
      setData(rows);
    };
    fetchData();
  }, [id]);
 


  // Definir el componente GridToolbarContainer que incluirá la barra de búsqueda

  return (
    <div className="datatable">
      <TextField
        label="Buscar por DNI"
        value={searchValue}
        onChange={handleSearchChange}
      />

      <div className="tableWrapper">
        <DataGrid
          className="datagrid"
          rows={filteredRows}
          columns={userColumns.concat()}
          pageSize={8}
          hideFooterPagination={true}
          rowsPerPageOptions={[8]}
          checkboxSelection
          autoHeight
        />
      </div>
    </div>
  );
};

export default Datatable;
