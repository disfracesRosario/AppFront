import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import List2 from '../lista/ListaDis';
import "./single.scss";

const Single2 = () => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    id: '',
    name: '',
    colour: '',
    detail: '',
    creationDay: '',
    lastClientRented: '',
    image:'',
    status:'',
    lastClientRented:''
  });
  
  const url = window.location.href;
const id = url.split("/").pop();// Obtener la id de la URL actual

  useEffect(() => {
    async function fetchData() {
      console.log(id)
      const response = await fetch(`https://disfracesrosario.up.railway.app/costumes/${id}`);
      const data = await response.json();
      setDetails(data);
    }
    fetchData();
  }, [id]);

  const handleEditClick = () => setIsEditing(!isEditing);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
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
                <h1 className="itemTitle">Disfraz</h1>
                <div className="detailItem">
                  <div className="detailItem">
                    <span className="itemKey">ID:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input type="text" name="id" value={details.id} onChange={handleInputChange} />
                      ) : (
                        details.id
                      )}
                    </span>
                  </div>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Nombre:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="name" value={details.name} onChange={handleInputChange} />
                    ) : (
                      details.name
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Color:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="colour" value={details.colour} onChange={handleInputChange} />
                    ) : (
                      details.colour
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Detalle:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="detail" value={details.detail} onChange={handleInputChange} />
                    ) : (
                      details.detail
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Dia de creacion:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="creationDay" value={details.creationDay} onChange={handleInputChange} />
                    ) : (
                      details.creationDay
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Estatus:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="status" value={details.status} onChange={handleInputChange} />
                    ) : (
                      details.status
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Ultimo Cliente:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input type="text" name="lastClientRented" value={details.lastClientRented} onChange={handleInputChange} />
                    ) : (
                      details.lastClientRented
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="dni">
          <img src={details.image} alt=""  width="500px" height="400px"/>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Historial de Alquileres</h1>
        </div>
        <List2/>
      </div>
    </div>
  );
};

export default Single2;