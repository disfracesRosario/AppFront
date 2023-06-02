import React, { useState, useEffect } from "react";
import "./disfraces.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../tablaproductos";
import UserTable, { userRows } from "../../tablaproductos";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Datatable2 = ({ onCostumeSelect, selectedCostume }) => { // Paso el estado del input como una prop llamada "selectedCostume"
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedCostumeIds, setSelectedCostumeIds] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]); // Define and initialize selectedProducts


  const handleSelect = (id, quantity) => {
    const updatedIds = [...selectedCostumeIds, id];
    setSelectedCostumeIds(updatedIds);
    onCostumeSelect(id, quantity);
    handleQuantityChange(id, quantity); // Pasa la cantidad seleccionada actualizada
    console.log(`IDs seleccionadas: ${updatedIds.join(", ")}`);
  };


  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };


  const handleQuantityChange = (productId, quantity) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };



  const handleSelectButtonClick = (params) => {
    const costumeId = params.getValue(params.id, "id");
    const quantity = selectedQuantities[costumeId] || 1; // Obtener la cantidad seleccionada actual
    if (costumeId) {
      handleSelect(costumeId, quantity);
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


  const handleCostumeSelect = (productId, quantity) => {
    const newProduct = {
      productId: productId,
      quantity: quantity,
    };
    setSelectedProducts([...selectedProducts, newProduct]);
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
              field: "quantity",
              headerName: "Cantidad",
              width: 120,
              renderCell: (params) => (
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={selectedQuantities[params.getValue(params.id, "id")] || ""}
                  onChange={(event) => {
                    const costumeId = params.getValue(params.id, "id");
                    const newQuantity = parseInt(event.target.value);
                    handleQuantityChange(costumeId, newQuantity); // Actualizar la cantidad seleccionada en el estado
                  }}
                />
              ),
            },
            {
              field: "selectButton",
              headerName: "Seleccionar",
              width: 120,
              renderCell: CustomSelectButton,
            },

          ]}
          pageSize={8}
          rowsPerPageOptions={[8]}

          autoHeight
          rowHeight={130}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectedRows(newSelectionModel);
          }}
        />
      </div>
    </div>
  );
};

export default Datatable2;