import StatBox from './StatBox';
import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, Grid, Paper } from '@mui/material';
import { tokens } from './theme';
import ProgressCircle from './ProgressCircle';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardActions } from '@mui/material';
import { Button } from '@mui/material';
import { PieChart, Pie, Cell } from 'recharts'; // Import the PieChart component
import './adminhome.css'

// Import Material-UI Icons
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Import Recharts components

const StatBoxCard = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = theme.palette;

  // CSS styles for the ProgressCircle container
  const progressCircleContainerStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

  return (
    <Card className="StatBoxCard" variant="outlined" style={{ backgroundColor: '#3e60af', color: 'white', position: 'relative' }}>
    <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <div>
            {React.cloneElement(icon, { style: { color: 'white', fontSize: 30 } })}
            <Typography variant="h6" style={{ color: 'yellow',marginTop: '20px' }}>
              {title}
            </Typography>
            <Typography  variant="subtitle1" style={{ color: 'yellow' }}>
              {subtitle}
            </Typography>
          </div>
          <Box style={progressCircleContainerStyle}>
            <ProgressCircle progress={progress} />
          </Box>
        </Box>
        {/* <Box mt={2}>
          <Typography variant="body1" color={colors.text.secondary} style={{ color: 'white' }}>
            Increase:
          </Typography>
          {increase !== null ? (
            <Typography variant="body1" color={colors.text.primary} style={{ color: 'white' }}>
              {increase}
            </Typography>
          ) : (
            <Typography variant="body1" color={colors.text.primary} style={{ color: 'white' }}>
              N/A
            </Typography>
          )}
        </Box> */}
      </CardContent>
    </Card>
  );
};

const AdminHome = () => {
  const [venueCount, setVenueCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [booking2Count, setBooking2Count] = useState(0);

  const [prevVenueCount, setPrevVenueCount] = useState(0);
  const [prevUserCount, setPrevUserCount] = useState(0);
  const [prevBookingCount, setPrevBookingCount] = useState(0);
  const [prevBooking2Count, setPrevBooking2Count] = useState(0);

  const data = [
    { name: 'Users', count: userCount },
    { name: 'Venues', count: venueCount },
    { name: 'Bookings', count: bookingCount },
    { name: 'Reservations', count: booking2Count },
  ];

  const pieChartData = [
    { name: 'Users', value: userCount },
    { name: 'Venues', value: venueCount },
    { name: 'Bookings', value: booking2Count },
    { name: 'Reservations', value: bookingCount },
  ];

  const pieChartColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Calculate the increase percentage for each category
  const venueIncrease = venueCount !== 0 ? ((venueCount - prevVenueCount) / prevVenueCount) * 100 : 0;
  const userIncrease = userCount !== 0 ? ((userCount - prevUserCount) / prevUserCount) * 100 : 0;
  const bookingIncrease = bookingCount !== 0 ? ((bookingCount - prevBookingCount) / prevBookingCount) * 100 : 0;
  const booking2Increase = booking2Count !== 0 ? ((booking2Count - prevBooking2Count) / prevBooking2Count) * 100 : 0;

  useEffect(() => {
    // Save the current counts as previous counts for the next update
    setPrevVenueCount(venueCount);
    setPrevUserCount(userCount);
    setPrevBookingCount(bookingCount);
    setPrevBooking2Count(booking2Count);
  }, [venueCount, userCount, bookingCount, booking2Count]);

  useEffect(() => {
    fetchVenueCount();
    fetchUserCount();
    fetchBookingCount();
    fetchBooking2Count();
  }, []);

  const fetchVenueCount = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/tours/search/getTourCount');
      if (!response.ok) {
        throw new Error('Failed to fetch venue count');
      }
      const data = await response.json();
      setVenueCount(data.data);
    } catch (error) {
      console.error('Failed to fetch venue count:', error);
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/users/count');
      if (!response.ok) {
        throw new Error('Failed to fetch users count');
      }
      const data = await response.json();
      setUserCount(data.data);
    } catch (error) {
      console.error('Failed to fetch users count:', error);
    }
  };

  const fetchBookingCount = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/booking/count');
      if (!response.ok) {
        throw new Error('Failed to fetch reservation count');
      }
      const data = await response.json();
      setBookingCount(data.data);
    } catch (error) {
      console.error('Failed to fetch reservation count:', error);
    }
  };

  const fetchBooking2Count = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/booking2/count');
      if (!response.ok) {
        throw new Error('Failed to fetch booking count');
      }
      const data = await response.json();
      setBooking2Count(data.data);
    } catch (error) {
      console.error('Failed to fetch booking count:', error);
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Box py={2} color="white" textAlign="center">
        <Typography variant="h3">Dashboard</Typography>
      </Box>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <StatBoxCard
              title="Users"
              subtitle={`Total Count: ${userCount}`}
              icon={<PersonIcon />}
              progress={userCount > 0 ? 0.75 : 0}
              increase={userIncrease !== 0 ? `+${userIncrease.toFixed(2)}%` : null}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatBoxCard
              title="Venues"
              subtitle={`Total Count: ${venueCount}`}
              icon={<LocationOnIcon />}
              progress={venueCount > 0 ? 0.65 : 0}
              increase={venueIncrease !== 0 ? `+${venueIncrease.toFixed(2)}%` : null}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatBoxCard
              title="Reservations"
              subtitle={`Total Count: ${bookingCount}`}
              icon={<EventIcon />}
              progress={bookingCount > 0 ? 0.85 : 0}
              increase={bookingIncrease !== 0 ? `+${bookingIncrease.toFixed(2)}%` : null}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatBoxCard
              title="Bookings"
              subtitle={`Total Count: ${booking2Count}`}
              icon={<ConfirmationNumberIcon />}
              progress={booking2Count > 0 ? 0.95 : 0}
              increase={booking2Increase !== 0 ? `+${booking2Increase.toFixed(2)}%` : null}
            />
          </Grid>
        </Grid>
      </Box>
      {/* Bar Chart */}
      <Box className="ChartContainer" style={{ marginTop: '25px' }} display="flex" flexDirection="row">
        <Box p={2} flex={1} textAlign="center">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        {/* Pie Chart */}
        <Box p={2} flex={1} textAlign="center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={(entry) => entry.name}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHome;
