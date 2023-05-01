import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

export const userColumns = [
  //Cambiar ancho tablas
  {
    field: "name",
    headerName: "Nombre",
    width: 170,
    renderCell: (params) => {
      return (
        <div className="">
          <img className="" alt="" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "lastName",
    headerName: "Apellido",
    width: 200,
  },
  {
    field: "documentNumber",
    headerName: "Documento",
    width: 200,
  },
  {
    field: "id",
    headerName: "ID del Cliente",
    width: 200,
  },
];

export function UserTable() {
  const [userRows, setUserRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://disfracesrosario.up.railway.app/clients")
      .then((response) => setUserRows(response.data))
      .catch((error) => console.log(error));
  }, []);

  const filteredRows = userRows.filter((row) =>
    row.documentNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Tabla de usuarios</h1>
      <input
        type="text"
        placeholder="Buscar por DNI"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <DataGrid rows={filteredRows} columns={userColumns} />
    </div>
  );
}

export async function userRows() {
  try {
    const response = await axios.get('https://disfracesrosario.up.railway.app/clients');
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default UserTable;
