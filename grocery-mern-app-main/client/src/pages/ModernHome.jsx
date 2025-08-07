
import { useState } from "react";
import { assets } from "../assets/assets";
import { Box, Typography, Button, Container, Grid, Card, CardMedia, CardContent, Switch, Paper, Fade } from '@mui/material';
import { useAppContext } from "../context/AppContext";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const HeroSection = ({ darkMode }) => (
  <Fade in timeout={900}>
    <Box sx={{
      background: darkMode
        ? 'linear-gradient(90deg, #232526 0%, #4b0082 100%)'
        : 'linear-gradient(90deg, #4b0082 0%, #6a5acd 100%)',
      color: 'white',
      py: 8,
      mb: 6,
      borderRadius: 3,
      textAlign: 'center',
      boxShadow: 6,
    }}>
      <Typography variant="h2" fontWeight={700} gutterBottom sx={{ letterSpacing: 1 }}>
        Welcome to Grocery Mart
      </Typography>
      <Typography variant="h5" mb={3}>
        Freshness Delivered. Savings Guaranteed.
      </Typography>
      <Button variant="contained" color="secondary" size="large" href="/products" sx={{ fontWeight: 600, px: 4, py: 1.5, borderRadius: 2 }}>
        Shop Now
      </Button>
    </Box>
  </Fade>
);

// Vegetables Banner Section
const VegetablesBanner = ({ darkMode }) => (
  <Box sx={{
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    my: 6,
    px: 2,
  }}>
    <img
      src={assets.organic_vegitable_image}
      alt="Fresh Organic Vegetables"
      style={{
        width: '340px',
        maxWidth: '100%',
        borderRadius: '24px',
        boxShadow: darkMode ? '0 8px 32px #232526' : '0 8px 32px #b2dfdb',
        background: darkMode ? '#232526' : '#fff',
        objectFit: 'cover',
      }}
    />
    <Box>
      <Typography variant="h4" fontWeight={700} mb={2} color={darkMode ? 'secondary' : 'primary'}>
        Eat Fresh, Live Healthy
      </Typography>
      <Typography variant="body1" color={darkMode ? 'grey.300' : 'text.secondary'}>
        Discover our wide range of organic vegetables, handpicked for quality and freshness. Start your healthy journey today!
      </Typography>
    </Box>
  </Box>
);

const FeaturedProducts = ({ darkMode }) => {
  const { products } = useAppContext();
  return (
    <Container sx={{ mb: 8 }}>
      <Typography variant="h4" fontWeight={600} mb={4} color={darkMode ? 'secondary' : 'primary'}>
        Featured Products
      </Typography>
      <Grid container spacing={3}>
        {products.slice(0, 4).map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product._id}>
            <Card sx={{ boxShadow: 3, borderRadius: 3, cursor: 'pointer', transition: '0.3s', '&:hover': { boxShadow: 8 }, background: darkMode ? '#232526' : '#fff', color: darkMode ? '#fff' : 'inherit' }}>
              <CardMedia
                component="img"
                height="180"
                image={`http://localhost:5000/images/${product.image[0]}`}
                alt={product.name}
                sx={{ objectFit: 'contain', p: 2, background: darkMode ? '#18191a' : '#f5f5f5' }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color={darkMode ? 'secondary.light' : 'text.secondary'} mb={1}>
                  {product.category}
                </Typography>
                <Typography variant="h6" color={darkMode ? 'secondary' : 'primary.main'}>
                  ${product.offerPrice} <Typography component="span" variant="body2" color={darkMode ? 'grey.400' : 'text.secondary'} sx={{ textDecoration: 'line-through', ml: 1 }}>${product.price}</Typography>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const Testimonials = ({ darkMode }) => (
  <Container sx={{ mb: 8 }}>
    <Typography variant="h4" fontWeight={600} mb={4} color={darkMode ? 'secondary' : 'primary'}>
      What Our Customers Say
    </Typography>
    <Grid container spacing={3}>
      {[
        { name: 'Amit', text: 'Great quality and fast delivery! Highly recommend Grocery Mart.' },
        { name: 'Priya', text: 'Fresh produce and amazing deals every week.' },
        { name: 'Rahul', text: 'Easy to use website and excellent customer service.' },
      ].map((t, i) => (
        <Grid item xs={12} md={4} key={i}>
          <Paper elevation={darkMode ? 8 : 3} sx={{ p: 3, borderRadius: 3, background: darkMode ? '#232526' : '#fff', color: darkMode ? '#fff' : 'inherit' }}>
            <Typography variant="body1" mb={2}>
              "{t.text}"
            </Typography>
            <Typography variant="subtitle2" color={darkMode ? 'secondary.light' : 'primary'}>
              - {t.name}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Container>
);

const Newsletter = ({ darkMode }) => (
  <Container sx={{ mb: 8, textAlign: 'center' }}>
    <Paper elevation={darkMode ? 8 : 3} sx={{ p: 4, borderRadius: 3, background: darkMode ? '#232526' : '#fff', color: darkMode ? '#fff' : 'inherit' }}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Subscribe to our Newsletter
      </Typography>
      <Typography variant="body1" mb={3}>
        Get the latest deals and updates delivered to your inbox!
      </Typography>
      <Box component="form" sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <input type="email" placeholder="Enter your email" style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', minWidth: 220 }} />
        <Button variant="contained" color="secondary" sx={{ px: 4, borderRadius: 2 }}>
          Subscribe
        </Button>
      </Box>
    </Paper>
  </Container>
);

const ModernHome = () => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#4b0082' },
      secondary: { main: '#ffb300' },
    },
    typography: {
      fontFamily: 'Outfit, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000, display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: darkMode ? '#232526' : '#fff', p: 1, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="caption" sx={{ fontSize: 12, mr: 0.5 }}>Dark</Typography>
        <Switch checked={darkMode} onChange={() => setDarkMode((d) => !d)} color="secondary" size="small" />
      </Box>
      <Box sx={{
        minHeight: '100vh',
        pt: 0,
        bgcolor: darkMode ? '#18191a' : '#f5f5f5',
      }}>
        <HeroSection darkMode={darkMode} />
        <VegetablesBanner darkMode={darkMode} />
        <FeaturedProducts darkMode={darkMode} />
        <Testimonials darkMode={darkMode} />
        <Newsletter darkMode={darkMode} />
      </Box>
    </ThemeProvider>
  );
};

export default ModernHome;
