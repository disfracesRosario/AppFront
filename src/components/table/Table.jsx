import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "Difras Shrek",
      img: "https://static1.funidelia.com/142444-f6_big2/disfraz-de-la-casa-de-papel.jpg",
      customer: "John Smith",
      date: "1 Marzo",
      amount: 785,
      method: "Efectivo",
      status: "Pending",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://static1.funidelia.com/503840-f6_big2/disfraz-de-hormiga-para-ninos.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://static1.funidelia.com/448950-f6_big2/disfraz-de-t-rex-hinchable-jurassic-world-para-adulto.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://static1.funidelia.com/509851-f6_big2/disfraz-de-gallina-para-ninos.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRihKFHdJTnqGXuKuNtr1bTAv6PajyZlmUBKA&usqp=CAU",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Disfraz</TableCell>
            <TableCell className="tableCell">Cliente</TableCell>
            <TableCell className="tableCell">Fecha de Retiro</TableCell>
            <TableCell className="tableCell">Fecha de Entrega</TableCell>
            <TableCell className="tableCell">Metodo de Pago</TableCell>
            <TableCell className="tableCell">Estatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
