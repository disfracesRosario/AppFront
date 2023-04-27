import { useState, useEffect } from 'react';
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data;
  
  const [amount2, setAmount2] = useState(200);
  const [number, setNumber] = useState(null);

  useEffect(() => {
    const fetchLimit = async () => {
      try {
        const response = await fetch("https://disfraces.onrender.com/configs/limit");
        const data = await response.json();
        setNumber(data.limit);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLimit();
  }, []);

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "FACTURACION ELECTRONICA",
        isMoney: true,
        link: 
            <Link to="/factele" style={{ textDecoration: "none" }}>
            <button>Ver Detalles</button>
        </Link>,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.2)",
            }}
          />
        ),
      };
      break;

      
      case "order":

  data = {
    title: "LIMITE",
    isMoney: true,
    link: (
      <div>
        <button onClick={() => setAmount2(amount2 + diff)}>Modificar</button>
      </div>
    ),
    icon: (
      <ShoppingCartOutlinedIcon
        className="icon"
        style={{
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          color: "red",
        }}
      />
    ),
  };
  break;

    case "earning":
      data = {
        title: "RESTO PARA FACTURAR",
        isMoney: true,
        link: "",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }


  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {type === "order" ? amount2 : amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
    
        
        <div className=" ">

        </div>
        {data.icon}
        
      </div>
     
    </div>
  );
};

export default Widget;
