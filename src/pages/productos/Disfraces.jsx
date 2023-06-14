import React, { useState, useEffect } from "react";
import "./disfraces.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../tablaproductos";
import UserTable, { userRows } from "../../tablaproductos";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

const Datatable2 = ({ onCostumeSelect, selectedCostume }) => { // Paso el estado del input como una prop llamada "selectedCostume"
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedCostumeIds, setSelectedCostumeIds] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]); // Define and initialize selectedProducts


  const handleSelect = (id, quantity, name, price) => {
    const existingIndex = selectedCostumeIds.indexOf(id);
  
    if (existingIndex !== -1) {
      // El producto ya está seleccionado, sobrescribe la cantidad
      handleQuantityChange(id, quantity);
      console.log(`El producto ${id} ya está seleccionado, se actualizó la cantidad a ${quantity}`);
    } else {
      // El producto no está seleccionado, agrega el nuevo producto a la lista
      const updatedIds = [...selectedCostumeIds, id];
      setSelectedCostumeIds(updatedIds);
      onCostumeSelect(id, quantity, name, price);
      handleQuantityChange(id, quantity);
      console.log(`IDs seleccionadas: ${updatedIds.join(", ")}`);
    }
  };
  


  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };


const handleQuantityChange = (productId, quantity) => {
  setSelectedQuantities((prevQuantities) => ({
    ...prevQuantities,
    [productId]: quantity,
  }));

  setSelectedProducts((prevProducts) => {
    const updatedProducts = prevProducts.map((product) => {
      if (product.productId === productId) {
        return { ...product, quantity: quantity };
      }
      return product;
    });
    return updatedProducts;
  });
};

  const handleSelectButtonClick = (params) => {
    const costumeId = params.getValue(params.id, "id");
    const costumeName = params.getValue(params.id, "name"); // Obtener el nombre del producto
    const costumePrice = params.getValue(params.id, "price"); // Obtener el precio del producto
    const quantity = selectedQuantities[costumeId] || 1;
    if (costumeId) {
      handleSelect(costumeId, quantity, costumeName, costumePrice); // Pasa ID, cantidad, nombre y precio
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


  const handleCostumeSelect = (productId, quantity,price, name) => {
    const newProduct = {
      productId: productId,
      quantity: quantity,
      price: price,
      name: name,  
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