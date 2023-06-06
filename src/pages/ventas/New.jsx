import "./new5.scss";
import * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource2";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from '@mui/joy';
import Single6 from "../single6/Single";
import Button from '@mui/joy/Button';
import Calendario from "../calendario/Calendario";
import BasicGrid from "../single6/Single";
import Productos from "../productos/Disfraces";
import axios from 'axios';
import Check from "../check/Check";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { DatePicker, Space } from 'antd';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';



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
  const [partialPayment, setPartialPayment] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedCostumeIds, setSelectedCostumeIds] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [newConstant, setNewConstant] = useState(0);
  const [isInvoiceChecked, setIsInvoiceChecked] = useState(false);
  const [partialPaymentAmount, setPartialPaymentAmount] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedQuantities, setSelectedQuantities] = useState({});


  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleInvoiceChange = (event) => {
    setIsInvoiceChecked(event.target.checked);
  };




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


  const handleCostumeSelect = (productId, quantity) => {
    const newProduct = {
      productId: productId,
      quantity: quantity
    };
    setSelectedProducts([...selectedProducts, newProduct]);
  };


  const handleCheckInChange = (name, checked) => {
    if (checked) {
      setCheckIn([...checkIn, name]);
    } else {
      setCheckIn(checkIn.filter((item) => item !== name));
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("partialPayment", e.target.elements.partialPayment.value);
    // enviar formData al servidor
  };

  const [error, setError] = useState(null);

  const onCostumeSelect = (id) => {
    // Verificar si la ID ya está seleccionada
    if (!selectedCostumeIds.includes(id)) {
      // Añadir la ID seleccionada a la lista de IDs previamente seleccionadas
      const updatedIds = [...selectedCostumeIds, id];
      setSelectedCostumeIds(updatedIds);

      // Establecer el valor del estado costumeIds como un array de cadenas de texto
      const idsString = updatedIds.join(',');
      setCostumeIds(idsString);

      // Mostrar las IDs que se van sumando en la consola
      console.log(`IDs seleccionadas: ${idsString}`);
    }
  };

  const handleAccept = () => {
    const selectedRowsData = selectedRows.map((rowId) =>
      data.find((row) => row.id === rowId)
    );

    const products = selectedRowsData.map((row) => ({
      productId: row.id,
      quantity: selectedQuantities[row.id] || 1,
    }));

    const requestData = {
      type,
      clientId,
      products: selectedProducts,
      checkIn: checkIn.join(','),
    };

    const partialPaymentAmount = amount - partialPayment;

    axios
      .post('https://disfracesrosario.up.railway.app/transactions/newTransactionSale', requestData)
      .then(response => {
        const responseData = response.data;
        console.log(responseData);

        const remitoData = {
          id: responseData.id,
          amount: responseData.amount,
          type: responseData.type,
          clientId: responseData.clientId,
          products: responseData.products,
          checkIn: responseData.checkIn,
          clientName: responseData.clientName,
          clientLastName: responseData.clientLastName,
          transactionDetails: responseData.transactionDetails,
          billPayment: responseData.billPayment,
          statusPayment: responseData.statusPayment,
        };

        const generateRemitoPDF = async (responseData) => {
          const pdfDoc = await PDFDocument.create();
          const page = pdfDoc.addPage([595.28, 841.89]);
          const { width, height } = page.getSize();
          const currentDate = new Date();
          const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        
          // Cargar la imagen de fondo
          const imageUrl = 'https://res.cloudinary.com/dkzil7l5p/image/upload/v1685969339/plantillaRemito_eobfdb_me2a2u.png'; // URL de la imagen o ruta local
          const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());
          const backgroundImage = await pdfDoc.embedPng(imageBytes);
          const fontSize = 12;
        
          // Agregar contenido al PDF utilizando la biblioteca pdf-lib
          page.drawImage(backgroundImage, { x: 0, y: 0, width: width, height: height, opacity: 1 });
        
          const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
          page.setFont(font);
          page.setFontSize(fontSize);
        
          page.drawText(`Fecha: ${formattedDate}`, { x: 365, y: height - 195, fontSize });
          page.drawText(` ${responseData.id}`, { x: 390, y: height - 150, fontSize });
          page.drawText(`TOTAL : ${responseData.amount}`, { x: 320, y: height - 655, fontSize });
          page.drawText(`Tipo: ${responseData.type}`, { x: 50, y: height - 110, fontSize });
          page.drawText(`Nombre del cliente: ${responseData.clientName} ${responseData.clientLastName}`, { x: 50, y: height - 140, fontSize });
        
          page.drawText("Detalles de la transacción:", { x: 50, y: height - 170, fontSize });
        
        
          responseData.transactionDetails.forEach((detail, index) => {
            page.drawText(`Producto: ${detail.product}`, { x: 170, y: height - 360 - (30 * index), fontSize });
            page.drawText(` ${detail.quantity}`, { x: 370, y: height - 360 - (30 * index), fontSize });
            page.drawText(` ${detail.totalUnitario}`, { x: 420, y: height - 360 - (30 * index), fontSize });
            page.drawText(`Total del Producto: ${detail.totalProduct}`, { x: 50, y: height - 290 - (30 * index), fontSize });
          });
        
          // Añadir más campos y detalles según sea necesario
        
          const pdfBytes = await pdfDoc.save();
        
          return pdfBytes;
        };
        
        const generatePDFPreview = async (pdfBytes) => {
          const pdfDataUri = 'data:application/pdf;base64,' + btoa(String.fromCharCode(...pdfBytes));
        
          const viewer = document.getElementById('pdf-viewer');
          viewer.src = pdfDataUri;
        };
        
        // Generar el PDF del remito
        generateRemitoPDF(responseData)
          .then(pdfBytes => {
            // Generar la vista previa del PDF
            generatePDFPreview(pdfBytes);
        
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        
            // Descargar el PDF en el navegador del usuario
            //COMENTAR CUANDO NO SE QUIERE DESCARGAR PARA PROBAR
           // saveAs(blob, 'remito.pdf');
        
            setCheckIn([]);
          })
          .catch(error => {
            console.log('Error al generar el PDF:', error);
          });

        // Generar el remito utilizando remitoData
        console.log('Remito:', remitoData);

        setCheckIn([]);
        alert("Venta realizada correctamente");

      })
      .catch(error => {
        alert(error.response.data.details);
        setError(error.response.data.details);
      });
  };


  const handleImageUrlChange = (url, clientIdValue) => {
    setImageUrl(url);
    setClientId(clientIdValue);
  };


  const handleSelect = (id) => {
    // Verificar si la ID ya está seleccionada
    if (!selectedCostumeIds.includes(id)) {
      // Añadir la ID seleccionada a la lista de IDs previamente seleccionadas
      const updatedIds = [...selectedCostumeIds, id];
      setSelectedCostumeIds(updatedIds);
      setCostumeIds((prevIds) => [...prevIds, id]); // Agregar la ID del disfraz seleccionado a la matriz costumeIds

      // Mostrar las IDs que se van sumando en la consola
      console.log(`IDs seleccionadas: ${updatedIds.join(", ")}`);
    }
  };

  const handleSelectionChange = (selection) => {
    const selectedIds = selection.map((selectedRow) => selectedRow.id);
    handleSelect(selectedIds);
  };


  const handleIdChange = (id) => {
    setClientId(id);
  };



  return (
    <div className="datatable">
      {error && <p>{error}</p>}
      <button>
        <a href="/">Volver a la pantalla</a>
      </button>
      <div className="info-cliente">
        <BasicGrid onImageUrlChange={handleImageUrlChange} onIdChange={handleIdChange} />
      </div>
      <div className="id">
      </div>
      <div className="tabla">
        <Productos onCostumeSelect={handleCostumeSelect} />
        <Input
          color="info"
          placeholder="IDs de disfraces (separados por comas)"
          variant="outlined"
          value={costumeIds}
          onChange={(event) => {
            const ids = event.target.value.split(',').map((id) => id.trim());
            setCostumeIds(ids.join(',')); // Actualizar el estado costumeIds
          }}
        />

      </div>
      <div className="info">
      </div>
      <div className="botones">
        <Input
          color="info"
          placeholder="Monto"
          variant="soft"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <TextField
          color="info"
          select
          label="Tipo"
          variant="outlined"
          value={type}
          onChange={handleTypeChange}
          style={{ minWidth: "100px" }}
        >
          <MenuItem value="mercado_pago">Mercado Pago</MenuItem>
          <MenuItem value="efectivo">Efectivo</MenuItem>
          <MenuItem value="tarjeta">Tarjeta</MenuItem>
          <MenuItem value="factura electronica">Factura electronica (Marcar Casillero)</MenuItem>
        </TextField>
      </div>

      <div className="check">
        <div className="check">
          <div className="invoice">
            <FormControlLabel
              control={
                <Checkbox
                  checked={isInvoiceChecked}
                  onChange={handleInvoiceChange}
                  name="invoice"
                  color="primary"
                />
              }
              label="Facturación Electrónica"
            />
            {isInvoiceChecked && <Button variant="outlined" color="info"><a target="_blank" href="https://auth.afip.gob.ar/contribuyente_/login.xhtml?action=SYSTEM&system=rcel">Generar Factura</a></Button>}
          </div>
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