import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const userId = "67f8ba8635ea5e2f8508c441"; // Replace with dynamic user ID if needed
    const navigate = useNavigate(); // <-- useNavigate hook

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch(`http://localhost:8000/get_cart_items/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data);
                }
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, [userId]);

    const handleRemoveFromCart = async (productId) => {
        const response = await fetch("http://localhost:8000/remove_from_cart/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: userId,
                product_id: productId,
            }),
        });

        if (response.ok) {
            setCartItems(prevItems => prevItems.filter(item => item.product._id !== productId));
        }
    };

    const handleBuyClick = (product) => {
        navigate("/user/product/purchase", { state: { product } }); // <-- navigate to purchase page with product info
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>My Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div style={styles.grid}>
                    {cartItems.map(item => (
                        <div key={item.product._id} style={styles.card}>
                            <img
                                src={item.product.image_url}
                                alt={item.product.name}
                                style={styles.image}
                            />
                            <h3>{item.product.name}</h3>
                            <p style={styles.price}>₹{item.product.price}</p>
                            <div style={styles.buttonGroup}>
                                <button
                                    style={{ ...styles.button, backgroundColor: "#007bff" }}
                                    onClick={() => handleBuyClick(item.product)} // <-- Buy Now action
                                >
                                    Buy Now
                                </button>
                                <button
                                    style={{ ...styles.button, backgroundColor: "red" }}
                                    onClick={() => handleRemoveFromCart(item.product._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
    },
    heading: {
        textAlign: "center",
        marginBottom: "30px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        justifyItems: "center",
    },
    card: {
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "300px",
    },
    image: {
        width: "100%",
        height: "180px",
        objectFit: "contain",
        marginBottom: "10px",
    },
    price: {
        color: "red",
        fontWeight: "bold",
        fontSize: "16px",
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginTop: "10px",
    },
    button: {
        padding: "8px 12px",
        border: "none",
        borderRadius: "6px",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
    },
};

export default Cart;
