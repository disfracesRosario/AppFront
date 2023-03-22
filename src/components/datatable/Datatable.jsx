import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import UserTable, { userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect  } from "react";


const Datatable = () => {
  
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(() => {
    const fetchData = async () => {
      const rows = await userRows();
      setData(rows);
    };
    fetchData();
  }, []);


  const actionColumn = [
    {
      field: "action",
      headerName: "Accion",
      width: 190,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
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
      <div className="datatableTitle">
        <h1> Agregar Nuevo Usuario</h1>
        <Link to="/users/new" className="link">
          Agregar 
        </Link>
      </div>
      <div className="tableWrapper">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        autoHeight
      />
    </div>
    </div>
  );
};



export default Datatable;
