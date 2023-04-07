import "./disfraces.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource2";
import UserTable, { userRows } from "../../disfra/datatablesource2";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Datatable2 = ({ onCostumeSelect }) => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelect = (id) => {
    onCostumeSelect(id);
  };

  const handleSelectionChange = (selection) => {
    if (selection.length > 0) {
      handleSelect(selection[0]);
    }
  };

  const { id } = useParams(); // Obtener la ID de la URL

  useEffect(() => {
    const fetchData = async () => {
      const rows = await userRows(id); // Pasar la ID a la función userRows
      setData(rows);
    };
    fetchData();
  }, [id]);

  
  return (
    <div className="datatable">
      <div className="tableWrapper">
        <DataGrid
          className="datagrid"
          rows={data}
          columns={userColumns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          autoHeight
          rowHeight={130}
          onSelectionModelChange={handleSelectionChange} // Agregar el evento onSelectionModelChange
        />
      </div>
    </div>
  );
};

export default Datatable2;
