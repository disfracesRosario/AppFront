import List2 from '../../components/lista1/Table';

const ClientDetailsTable = ({ details }) => {
  const { name, lastName, transactions, costumes } = details;

  return (
    <div>
      <h2>Detalles del cliente</h2>
      <List2 items={[
        { itemKey: 'Nombre', itemValue: name },
        { itemKey: 'Apellido', itemValue: lastName },
      ]} />

      <h2>Transacciones del cliente</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Monto</th>
            <th>Tipo</th>
            <th>Fecha de reserva</th>
            <th>Fecha límite</th>
            <th>Check-in</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.type}</td>
              <td>{transaction.reservationDate}</td>
              <td>{transaction.deadline}</td>
              <td>{transaction.checkIn}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Disfraces del cliente</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha de reserva</th>
            <th>Fecha límite</th>
          </tr>
        </thead>
        <tbody>
          {costumes.map(costume => (
            <tr key={costume.id}>
              <td>{costume.id}</td>
              <td>{costume.name}</td>
              <td>{costume.reservationDate}</td>
              <td>{costume.deadLine}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientDetailsTable;
