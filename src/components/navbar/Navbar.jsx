import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
     
      <div className="wrapper">
        <div className="">
        </div>
        <div className="items">
        <div className="login">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <div className="img">  
                <img src="https://cdn.discordapp.com/attachments/744349867559747615/1113185044756971550/image.png"  alt="" />
                </div>
            </Link>
          </div>
   
        </div>
      </div>
    </div>
  );
};

export default Navbar;
