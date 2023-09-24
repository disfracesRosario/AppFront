import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import List2 from '../lista/ListaDis';
import "./single8.scss";

const Single2 = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [transaction, setTransaction] = useState({
    id: '',
    clientName: '',
    type: '',
    names: '',
    checkIn: '',
    partialPayment: '',
    pending: '',
    reservationDate: '',
    deadline: '',
    details: [],
  });

  const url = window.location.href;
  const id = url.split("/").pop();// Obtener la id de la URL actual

  useEffect(() => {
    async function fetchData() {
      console.log(id)
      const response = await fetch(`https://disfracesrosario.up.railway.app/transactions/${id}`);

      if (!response.ok) {
        // Manejar el caso en el que la respuesta no es exitosa
        console.error('Error al cargar la transacción:', response.statusText);
        return;
      }

      const data = await response.json();

      // Verificar si "details" es una cadena no vacía antes de analizarla
      if (data.details && typeof data.details === 'string') {
        try {
          // Intenta analizar "details" como JSON
          const detailsObj = JSON.parse(data.details);
          data.details = detailsObj;
        } catch (error) {
          // Manejar cualquier error de análisis aquí
          console.error("Error al analizar la propiedad 'details':", error);
          // Puedes proporcionar un valor predeterminado o tomar otras medidas según sea necesario
          data.details = [];
        }
      }

      setTransaction(data);
    }
    fetchData();
  }, [id]);
  const handleEditClick = () => setIsEditing(!isEditing);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTransaction({ ...transaction, [name]: value });
  }

  const handleSaveClick = () => {
    // Send details to server
  }
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={handleEditClick}>
              {isEditing ? 'Terminar' : 'Editar'}
            </div>
            {isEditing && (
              <div className="editButtons">
                <div className="saveButton" onClick={handleSaveClick}>Guardar</div>
              </div>
            )}

            <h1 className="title1">Informacion</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">Transaccion</h1>
                <div className="detailItem">
                  <div className="detailItem">
                    <span className="itemKey">ID:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input type="text" name="id" value={transaction.id} onChange={handleInputChange} />
                      ) : (
                        transaction.id
                      )}
                    </span>
                  </div>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Nombre:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="clientName" value={transaction.clientName} onChange={handleInputChange} />
                    ) : (
                      transaction.clientName
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Tipo:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="type" value={transaction.type} onChange={handleInputChange} />
                    ) : (
                      transaction.type
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Disfraz:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="names" value={transaction.names} onChange={handleInputChange} />
                    ) : (
                      transaction.names
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">CheckIn:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="checkIn" value={transaction.checkIn} onChange={handleInputChange} />
                    ) : (
                      transaction.checkIn
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pago parcial:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="partialPayment" value={transaction.partialPayment} onChange={handleInputChange} />
                    ) : (
                      transaction.partialPayment == null ? "No realizo un pago parcial" : transaction.partialPayment
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pago Pendiente:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="pending" value={transaction.pending} onChange={handleInputChange} />
                    ) : (
                      transaction.pending == null ? "No debe dinero" : transaction.pending
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Fecha de retrio:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="reservationDate" value={transaction.reservationDate} onChange={handleInputChange} />
                    ) : (
                      transaction.reservationDate
                    )}
                  </span>
                </div>  <div className="detailItem">
                  <span className="itemKey">Fecha de devolucion:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="deadline" value={transaction.deadline} onChange={handleInputChange} />
                    ) : (
                      transaction.deadline
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Detalles de Transacción</span>
                  {transaction.details.map((detail, index) => (
                    <div key={index} className="detailItem">
                      <span className="itemKey">Producto:</span>
                      <span className="itemValue">{detail.product}</span>
                      <span className="itemKey">Cantidad:</span>
                      <span className="itemValue">{detail.quantity}</span>
                      <span className="itemKey">Precio Unitario:</span>
                      <span className="itemValue">{detail.totalUnitario}</span>
                      <span className="itemKey">Total del Producto:</span>
                      <span className="itemValue">{detail.totalProduct}</span>
                      {/* Agregar más campos de detalle aquí */}
                    </div>
                  ))}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Monto Total:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="pending" value={transaction.pamount} onChange={handleInputChange} />
                    ) : (
                      transaction.amount
                    )}
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single2;