import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <Container>

      {/* heading */}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
      }}>
        <Typography variant="h3" fontWeight="bold">
          Cart
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          color="secondary"
        >
          Back to products
        </Button>
      </Box>

      {cart.length === 0 &&
        <Typography variant="h6" fontWeight="bold">
          Cart is Empty!
        </Typography>
      }

      {/* products */}
      <Grid container spacing={4}>
        {cart.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                maxWidth: 345,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 5,
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                alt={item.title}
                image={item.images}
                sx={{ objectFit: "contain" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  {item.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button fullWidth variant="outlined" color="primary">Buy now</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Container>
  );
};

export default CartPage;
