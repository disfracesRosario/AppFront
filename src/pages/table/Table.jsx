import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';


function ClientHistory() {
  const [clientData, setClientData] = useState(null);
  const url = window.location.href;
  const id = url.split("/").pop(); // Obtener la id de la URL actual

  function formatDate(dateString) {
    // Convierte la cadena de fecha a un objeto Date
    const date = new Date(dateString);
  
    // Obtiene las partes de la fecha (día, mes, año, hora, minutos, segundos)
    const day = date.getDate();
    const month = date.getMonth() + 1; // +1 porque los meses van de 0 a 11
    const year = date.getFullYear();
    const hours = date.getHours();
  
  
    // Formatea la fecha con separadores (por ejemplo, "dd/mm/yyyy hh:mm:ss")
    return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
  }


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://disfracesrosario.up.railway.app/clients/${id}/history`
      );
      setClientData(result.data);
    };
    fetchData();
  }, [id]);
  
  return (
    <div>
      {clientData && (
        <table>
          <thead>
            <tr>
              <th style={{ padding: "0 10px" }}>Nombre</th>
              <th style={{ padding: "0 10px" }}>Apellido</th>
              <th style={{ padding: "0 10px" }}>Transaction ID</th>
              <th style={{ padding: "0 10px" }}>Precio</th>
              <th style={{ padding: "0 10px" }}>Forma de pago</th>
              <th style={{ padding: "0 10px" }}>Disfraz</th>
              <th style={{ padding: "0 10px" }}>Fecha de reserva</th>
              <th style={{ padding: "0 10px" }}>Fecha de entrega</th>
              <th style={{ padding: "0 10px" }}>Tipo de Factura</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "0 10px" }}>{clientData.name}</td>
              <td style={{ padding: "0 10px" }}>{clientData.lastName}</td>
            </tr>
            {clientData.transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td></td>
                <td></td>
                <td  style={{ padding: "7px 40px" }}>{transaction.id}</td>
                <td  style={{ padding: "7px 10px" }}>{transaction.amount}</td>
                <td  style={{ padding: "7px 25px" }}>{transaction.type}</td>
                <td  style={{ padding: "7px 10px" }}>{transaction.names[0]}</td>
                <td  style={{ padding: "7px 10px" }}>{formatDate(transaction.reservationDate)}</td>
                <td  style={{ padding: "7px 10px" }}>{formatDate(transaction.deadline)}</td>
                <td  style={{ padding: "7px 10px" }}>{transaction.checkIn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClientHistory;
