import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BasicCard() {
  const [data, setData] = useState({
    monthly: 0,
    electronicBilling: 0,
    collected: 0,
    owed: 0
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://disfracesrosario.up.railway.app/transactions/monthSelected');
        const responseData = await response.json();

        setData({
          currentMonth: responseData.currentMonth || 0,
          totalElectronic: responseData.totalElectronic || 0,
          collected: responseData.collected || 0,
          selectMonthPending2: responseData.selectMonthPending2 || 0
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const cobrado = data.currentMonth - data.selectMonthPending2;

  return (
    <Box sx={{ display: 'flex', gap: 25 }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            MENSUAL
          </Typography>
          <Typography variant="body2"  sx={{ fontSize: 25 }} >
            ${data.currentMonth}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            FACTURACION ELECTRONICA
          </Typography>
          <Typography variant="body2"  sx={{ fontSize: 25 }} >
            ${data.totalElectronic}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            COBRADO
          </Typography>
          <Typography variant="body2"  sx={{ fontSize: 25 }}>
            ${cobrado}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            ADEUDADO
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 25 }} >
           ${data.selectMonthPending2}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
