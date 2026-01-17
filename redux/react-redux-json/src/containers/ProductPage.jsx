import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadProducts } from "../redux/features/product/productThunk";
import { addToCart } from "../redux/features/cart/cartSlice";
import { Badge, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Container, Grid, IconButton, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

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
          Products
        </Typography>

        <IconButton
          component={Link}
          to="/cart"
          color="primary"
          sx={{
            bgcolor: "secondary.main",
            color: "#fff",
            "&:hover": {
              bgcolor: "secondary.dark",
            },
          }}
        >
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>

      {/* products */}
      <Grid container spacing={4}>
        {products.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
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
                alt={p.title}
                image={p.images}
                sx={{ objectFit: "contain" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  {p.title}
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
                  {p.description}
                </Typography>

                <Chip
                  label={p.category}
                  size="small"
                  color="secondary"
                  sx={{ mt: 1, fontWeight: 500 }}
                />

              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button fullWidth variant="outlined" color="primary" onClick={() => dispatch(addToCart(p))}>Add to cart</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Container>
  );
};

export default ProductPage;