import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    if (data.role === "user") {
      data.role_id = "67c14d24571d971090e21d16";
    } else if (data.role === "seller") {
      data.role_id = "67bf35937927832fe3eca04f";
    }
    delete data.role;
    data.status = data.status === "true";

    try {
      const res = await axios.post("http://localhost:8000/user/", data);
      if (res.status === 201) {
        toast.success("Signup successful!");
        navigate("/login");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      toast.success("Signup successful!");
      navigate("/login");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <div style={styles.logo}></div>
          <h1 style={styles.title}>SIGN UP</h1>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="firstName" style={styles.label}>First Name</label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              placeholder="Enter first name"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="lastName" style={styles.label}>Last Name</label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              placeholder="Enter last name"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="role" style={styles.label}>Signup As</label>
            <select id="role" {...register("role")} style={styles.input}>
              <option value="user">User</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="age" style={styles.label}>Age</label>
            <input
              type="number"
              id="age"
              {...register("age")}
              placeholder="Enter age"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter email"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter password"
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <div style={styles.signupLink}>
          <p>
            Already have an account?{" "}
            <a href="/login" style={styles.signupText}>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

// Reuse the same vibrant theme styles as Login
const styles = {
  container: {
    display: "flex",
    justifyContent: "center", 
    alignItems: "center",
    height: "100vh",
    background: "#EDF6FF",
  },
  card: {
    background: "#ffffff",
    padding: "30px",
    width: "400px",
    height: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Slight box shadow
    border: "1px solid #ddd", // Optional: add a border for the boxy effect
    borderRadius: "4px", // Reduced from 12px to a subtle boxy curve; or set to 0 for sharp edges
    textAlign: "center",
    color: "#000",
  },
  brand: {
    marginBottom: "20px",
  },
  logo: {
    width: "60px",
    height: "60px",
    background: "url('/assets/images/logo.png') no-repeat center/cover",
    margin: "0 auto",
    borderRadius: "50%",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginTop: "10px",
    color: "#12354D",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    textAlign: "left",
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#000",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #12354D",
    borderRadius: "5px",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    color: "#000",
    outline: "none",
    transition: "0.3s",
  },
  button: {
    width: "100%",
    background: "#12354D",
    color: "white",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  signupLink: {
    marginTop: "15px",
    fontSize: "14px",
  },
  signupText: {
    textDecoration: "none",
    color: "#12354D",
    fontWeight: "700",
    transition: "0.3s",
  },
};

export default Signup;
