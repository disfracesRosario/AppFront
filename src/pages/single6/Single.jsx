import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';

const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: "black",
  backgroundColor: "#e7e7e7"
}));

export default function BasicGrid() {
  return (
    <div className='tabla'>
    <Grid container spacing={2} sx={{ flexGrow: 1 }} >
      <Grid xs={1}>
        <Item>DNI</Item>
      </Grid>
      <Grid xs={1}>
        <Item>Nombre</Item>
      </Grid>
      <Grid xs={1}>
        <Item>Apellido</Item>
      </Grid>
      <Grid xs={2}>
        <Item>Tipo Cliente</Item>
      </Grid>
      <Grid xs={1}>
        <Item>Texto 31424</Item>
      </Grid>
      <Grid xs={1}>
        <Item>texto asascasc</Item>
      </Grid>
    </Grid>
    </div>
  );
}