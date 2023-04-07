import "./single.scss";
import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import { Input } from '@mui/joy';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/joy/Button';

const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: "black",
  backgroundColor: "#e7e7e7"
}));

export default function BasicGrid({ onImageUrlChange, onIdChange }) {
  const [documentNumber, setDocumentNumber] = useState('');
  const [clientData, setClientData] = useState(null);
  const [id, setId] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://disfraces-production.up.railway.app/clients/document/${documentNumber}`);
        setClientData(response.data);
  

        const imageUrl = response.data.imageUrl;
        if (imageUrl) {
          setImageUrl(imageUrl);
          // Call onImageUrlChange prop to update parent state with imageUrl
          if (onImageUrlChange) {
            onImageUrlChange(imageUrl);
          }
        }

        // Set the client ID
        setId(response.data.id);
        if (onIdChange) {
          onIdChange(response.data.id);
        }

      } catch (error) {
        console.error(error);
      }
    };

    if (documentNumber) {
      fetchData();
    }
  }, [documentNumber, onImageUrlChange, onIdChange]);

  const handleDniChange = (event) => {
    setDocumentNumber(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleSearch = () => {
    setClientData(null); // Reset clientData to null
    setImageUrl(null); // Reset imageUrl to null
  };

  return (
    <div className='tabla'>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={1}>
          <Item>Id: {clientData ? clientData.id : ''}</Item>
        </Grid>
        <Grid xs={2}>
          <Item>Nombre: {clientData ? clientData.name : ''}</Item>
        </Grid>
        <Grid xs={1}>
          <Item>Apellido: {clientData ? clientData.lastName : ''}</Item>
        </Grid>
        <Grid xs={1}>
          <Item>Tipo: {clientData ? clientData.type : ''}</Item>
        </Grid>
        <img style={{ maxWidth: '600px', maxHeight: '400px' }}  src={clientData?.image} alt="" />
      </Grid>

      <div className="bar">
        <Input
          color="info"
          type="text"
          placeholder="Escribir DNI cliente"
          onChange={handleDniChange}
        />
        
      </div>

      {imageUrl && (
        <div className="image">
          <img src={clientData.image} alt="Client image"style={{ maxWidth: '600px', maxHeight: '400px' }}  />
        </div>
      )}

      <div className="bar">
        <Input
          color="info"
          type="text"
          value={id}
          onChange={handleIdChange}
        />
      </div>
    </div>
  );
}
