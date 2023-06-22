import React, { useState, useEffect } from "react";
import "./disfraces2.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource2";
import UserTable, { userRows } from "../../disfra/datatablesource2";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Datatable2 = ({ onCostumeSelect, selectedCostume }) => {
  // Paso el estado del input como una prop llamada "selectedCostume"
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedCostumeIds, setSelectedCostumeIds] = useState([]);

  const handleSelect = (id, name) => {
    const updatedIds = [...selectedCostumeIds, id];
    setSelectedCostumeIds(updatedIds);
    onCostumeSelect(id);

    // Mostrar las IDs que se van sumando en la consola
    console.log(`IDs seleccionadas: ${updatedIds.join(", ")}`);
  };

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
    console.log(selectedRows);
  };

  const handleSelectButtonClick = (params) => {
    const costumeId = params.getValue(params.id, "id");
    const costumeName = params.getValue(params.id, "name");
    if (costumeId) {
      handleSelect(costumeId, costumeName);
    }
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const rows = await userRows(id); // Pasar la ID a la función userRows
      setData(rows);
    };
    fetchData();
  }, [id]);

  const CustomSelectButton = (params) => {
    return (
      <button
        className="selectButton"
        onClick={() => handleSelectButtonClick(params)}
      >
        Seleccionar
      </button>
    );
  };

  const handleCostumeSelect = (id) => {
    // Añadir la ID seleccionada a la lista de IDs previamente seleccionadas
    const updatedIds = [...selectedCostumeIds, id];
    setSelectedCostumeIds(updatedIds);
  };

  return (
    <div className="datatable">
      <div className="tableWrapper">
        <DataGrid
          className="datagrid"
          rows={data}
          columns={[
            ...userColumns,
            {
              field: "selectButton",
              headerName: "Seleccionar",
              width: 120,
              renderCell: CustomSelectButton,
            },
          ]}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          autoHeight
          rowHeight={130}
          onSelectionModelChange={(newSelectionModel) => {
            handleCostumeSelect(newSelectionModel);
            console.log(newSelectionModel);
          }}
        />
      </div>
    </div>
  );
};

export default Datatable2;
