import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Grid, Stack, Divider, IconButton, Paper, Stepper, Step, StepLabel, StepContent, Button } from '@mui/material';
import { BsThreeDots, BsCart, BsCurrencyDollar, BsPeople } from 'react-icons/bs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';


dayjs.extend(isoWeek);

function Home() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (!token) {
          
          setError('Authorization token not provided');
          setLoading(false);
          return;
        }

        const [ordersRes, productsRes] = await Promise.all([
          axios.get('https://ecommerce-platform-kfby.onrender.com/Seller/countSellerOrders', { headers: { 'auth': token } }),
          axios.get('https://ecommerce-platform-kfby.onrender.com/Seller/countSellerProducts', { headers: { 'auth': token } })
        ]);

        setData({
          orders: ordersRes.data.data,
          products: productsRes.data.data,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  const { orders, products } = data;

 


  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <Paper sx={{ padding: "20px" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" marginBottom="15px">
                  <Box display="flex" alignItems="center">
                    <Typography variant="h6" gutterBottom color="#000">Total Order</Typography>
                  </Box>
                  <IconButton size='small'><BsThreeDots /></IconButton>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" marginBottom="5px">
                  <Box padding="15px" backgroundColor="#f6f9ff" borderRadius="50%" lineHeight="0">
                    <BsCurrencyDollar color='#4154f1' size={35} />
                  </Box>
                  <Box>
                    <Typography variant="h5" gutterBottom marginBottom="0px" fontSize="28px" fontWeight="600">
                      {orders}
                    </Typography>
                    <Typography variant="overline" sx={{ textTransform: "lowercase", fontSize: "15px" }} display="flex" alignItems="center" marginBottom="0" gap={1} gutterBottom>
                      <Typography color="rgb(25,135,84)" sx={{ fontWeight: 600 }}>12%</Typography>
                      increase
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Paper sx={{ padding: "20px" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" marginBottom="15px">
                  <Box display="flex" alignItems="center">
                    <Typography variant="h6" gutterBottom color="#000">Total Product</Typography>
                  </Box>
                  <IconButton size='small'><BsThreeDots /></IconButton>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" marginBottom="5px">
                  <Box padding="15px" backgroundColor="#f6f9ff" borderRadius="50%" lineHeight="0">
                    <BsPeople color='#4154f1' size={35} />
                  </Box>
                  <Box>
                    <Typography variant="h5" gutterBottom marginBottom="0px" fontSize="28px" fontWeight="600">
                       {products} 
                    </Typography>
                    <Typography variant="overline" sx={{ textTransform: "lowercase", fontSize: "15px" }} display="flex" alignItems="center" marginBottom="0" gap={1} gutterBottom>
                      <Typography color="rgb(25,135,84)" sx={{ fontWeight: 600 }}>12%</Typography>
                      increase
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
        
           
          </Grid>
        </Grid>
      </Grid>
    
    </Container>
  );
}

export default Home;
