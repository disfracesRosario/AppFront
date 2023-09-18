import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Usuarios from "./components/datatable/Datatable";
import Single from "./pages/single/Single";
import Single2 from "./pages/single2/Single2"
import Single3 from "./pages/single3/Single3";
import Single4 from "./pages/single4/Single4";
import Single5 from "./pages/single5/Single5";
import Single8 from "./pages/single8/Single8";
import Single9 from "./pages/single9/Single9";
import New from "./pages/new/New";
import New2 from "./pages/new2/New2";
import Ventas from "./pages/ventas/Ventas"; 


import Nuevafac from "./pages/nuevafac/Nuevafac";
import Facturacion from "./pages/facturacion/Facturacion";
import Disfraces from "./components/disfraces/Disfraces";
import Productos from "./components/productos/Productos";
import Histfac from "./pages/histfac/Histfac";
import Factele from "./pages/factele/Factele";
import New3 from "./pages/nuevopedido/NuevoPedido";
import New4 from "./pages/retiro/Retiro";
import New5 from "./pages/new3/New3";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import { userInputs2 } from "./disfraces";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />

            <Route path="login" element={<Login />} />
            <Route path="facturacion" element={<Facturacion />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="histfac" element={<Histfac />} />
            <Route path="factele" element={<Factele />} />
            <Route path="ventas" element={<Ventas />} />
            <Route path="productos" element={<Productos />} />
            <Route path="disfraces" element={<Disfraces />} />
            <Route path="nuevopedido" element={<New3 />} />
            <Route path="retiro" element={<New4 />} />


            <Route path="users">

              <Route index element={<List />} />


              <Route path=":userId" element={<Single />} />

              <Route
                path="new"
                element={<New inputs={userInputs} title="Agregar Nuevo Usuario" />}
              />

            </Route>



            <Route path="user">

              <Route index element={<Single2 />} />

              <Route path=":userId" element={<Single2 />} />

              <Route
                path="new2"
                element={<New2 inputs={userInputs2} title="Agregar Disfraz Nuevo" />}
              />
            </Route>

            
            <Route path="user">

              <Route index element={<Single9 />} />

              <Route path=":userId" element={<Single9 />} />

              <Route
                path="new3"
                element={<New5 inputs={userInputs2} title="Agregar Producto Nuevo" />}
              />
            </Route>

            <Route path="single9">

              <Route index element={<Single9 />} />

              <Route path=":userId" element={<Single9 />} />


            </Route>





            <Route path="single2">

              <Route index element={<Single2 />} />

              <Route path=":userId" element={<Single2 />} />


            </Route>

            <Route path="single8">

              <Route index element={<Single8 />} />

              <Route path=":userId" element={<Single8 />} />


            </Route>



            <Route path="single3">

              <Route index element={<Single3 />} />

              <Route path=":userId" element={<Single3 />} />


            </Route>

            <Route path="single4">

              <Route index element={<Single4 />} />

              <Route path=":userId" element={<Single4 />} />


            </Route>
            <Route path="single5">

              <Route index element={<Single5 />} />

              <Route path=":userId" element={<Single5 />} />


            </Route>

            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
