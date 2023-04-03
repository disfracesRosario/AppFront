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

export default function BasicGrid({ onImageUrlChange }) {
  const [clientData, setClientData] = useState(null);
  const [id, setDni] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://disfraces-production.up.railway.app/clients/${id}`);
        setClientData(response.data)
        console.log(response.data);

        const imageUrl = response.data.imageUrl;
        if (imageUrl) {
          setImageUrl(imageUrl);
          // Call onImageUrlChange prop to update parent state with imageUrl
          if (onImageUrlChange) {
            onImageUrlChange(imageUrl);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchData();
    }
  },  [id, onImageUrlChange]);

  const handleDniChange = (event) => {
    setDni(event.target.value);
  };

  const handleSearch = () => {
    setClientData(null); // Reset clientData to null
    setImageUrl(''); // Reset imageUrl to empty string
    setDni(id); // Set documentNumber state
  };

  return (
    <div className='tabla'>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={1}>
          <Item>{clientData ? clientData.documentNumber : ''}</Item>
        </Grid>
        <Grid xs={1}>
          <Item>{clientData ? clientData.name : ''}</Item>
        </Grid>
        <Grid xs={1}>
          <Item>{clientData ? clientData.lastName : ''}</Item>
        </Grid>
        <Grid xs={1}>
          <Item>{clientData ? clientData.type : ''}</Item>
        </Grid>
        <img src={clientData?.image} alt="" />

      </Grid>

      <div className="bar">
        <Input
          color="info"
          type="text"
          placeholder="Escribir ID cliente"
          value={id}
          onChange={handleDniChange}
        />
      
      </div>
      {imageUrl && (
        <div className="image">
          <img src={clientData.image} alt="Client image" />
        </div>
      )}
    </div>
  );
}
