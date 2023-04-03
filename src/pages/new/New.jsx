import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import "./new.scss";
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';

const New = ({ inputs, title, apiUrl }) => {
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    adress: "",
    documentNumber: "",
    type: "",
    phone: "",
    image: "",
  });

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "qarsntph"); // Reemplaza "tu_upload_preset" con el nombre de tu upload preset en Cloudinary
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dkzil7l5p/image/upload", // Reemplaza "tu_cloud_name" con el nombre de tu cloud name en Cloudinary
        formData
      );
      setFormData({ ...formData, image: res.data.secure_url }); // Actualiza el estado del formulario con la URL de la imagen subida
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
     // Actualiza la vista previa de la imagen
  };


  // Maneja el envío del formulario.
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://disfraces-production.up.railway.app/clients/newClient", JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  // Maneja el cambio de los campos de entrada del formulario.
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="image">Imagen:</label>
             
                <input
                  type="file" // Cambia el tipo de entrada a "file"
                  name="image"
                  onChange={handleFileChange} // Maneja la selección de archivos
                />
                   <button type="submit" className="submitButton" onClick={handleImageUpload}>
                  Subir imagen
                </button>
                {imagePreview && (
                  <img src={imagePreview} alt="Vista previa de la imagen" /> // Muestra la vista previa de la imagen
                )}
              </div>
              <div className="formInput">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  placeholder="Ingrese su nombre"
                  name="name"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="lastName">Apellido:</label>
                <input
                  type="text"
                  placeholder="Ingrese su apellido"
                  name="lastName"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="address">Dirección:</label>
                <input
                  type="text"
                  placeholder="Ingrese su dirección"
                  name="adress"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="documentNumber">Número de documento:</label>
                <input
                  type="text"
                  placeholder="Ingrese su número de documento"
                  name="documentNumber"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Tipo de cliente:</label>
                <input
                  type="text"
                  placeholder="Ingrese el tipo de cliente"
                  name="type"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="phone">Teléfono:</label>
                <input
                  type="text"
                  placeholder="Ingrese su teléfono"
                  name="phone"
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="submitButton">
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default New;