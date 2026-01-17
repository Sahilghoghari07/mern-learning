import axios from "axios";
import { setProducts } from "./productSlice";

const JSON_URL = "http://localhost:5000/products";

export const loadProducts = () => async (dispatch) => {
    // Check JSON Server first
    const jsonRes = await axios.get(JSON_URL);

    // If already exists → DO NOT POST AGAIN
    if (jsonRes.data.length > 0) {
        dispatch(setProducts(jsonRes.data));
        return;
    }

    // Else fetch from Dummy API
    const dummyRes = await axios.get("https://dummyjson.com/products");

    // Insert once
    for (let product of dummyRes.data.products) {
        await axios.post(JSON_URL, product);
    }

    // Fetch final data
    const finalRes = await axios.get(JSON_URL);
    dispatch(setProducts(finalRes.data));
};