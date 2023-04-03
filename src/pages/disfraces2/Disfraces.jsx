import "./disfraces.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource2";
import UserTable, { userRows } from "../../datatablesource2";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect  } from "react";
import axios from "axios";


const Datatable2 = () => {
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres borrar este cliente?")) {
      axios
        .delete(`https://disfraces-production.up.railway.app/costumes/${id}`)
        .then(() => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch((error) => console.log(error));
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

  const actionColumn = [
    {
      field: "action",
      headerName: "Accion",
      width: 190,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/single2/${params.row.id}`} style={{ textDecoration: "none" }}>
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



export default Datatable2;
