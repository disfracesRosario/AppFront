import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Editar</div>
            <h1 className="title1">Informacion</h1>
            <div className="item">
         
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
             
                <div className="detailItem">
                  <span className="itemKey">Telefono:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Direccion:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">N° Documento:</span>
                  <span className="itemValue">USA</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Fecha de Alta:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Disfraz Alquilado:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Fecha de Retiro:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Fecha de Entrega:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Estatus:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="dni">
          <img src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/2AYDKWFWUBG7VNZ24CJVPHHOWI.jpg" alt="" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Historial de Alquileres</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
