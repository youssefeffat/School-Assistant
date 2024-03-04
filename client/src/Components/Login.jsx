import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
//import { useHistory } from "react-router";

const Login = () => {

//   const history = useHistory()
const navigate = useNavigate()
const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [user, setUser] = useState({
    email : '',
    password : ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Handle redirect if already logged in
  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn === "true"){
      navigate('/');
      window.location.reload()
    }
  }, [isLoggedIn, navigate]);

  // Handle Input
  const handleChange = (event) =>{
    let name = event.target.name
    let value = event.target.value

    setUser({...user, [name]:value})
    setErrors({ ...errors, [name]: '' }); // Clear errors when user starts typing again

  }

  // Handle Login
  const handleSubmit = async (event) =>{
    event.preventDefault();
    const {email, password} = user;

    // Validation
    let hasErrors = false;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation for empty fields
    if (!email.trim() || !password.trim()) {
      setErrors({
        email: email.trim() ? '' : 'Email is required',
        password: password.trim() ? '' : 'Password is required'
      });
      return; // Don't proceed with form submission if any field is empty
    }

    if (!emailPattern.test(email) || !email.includes('@universite-paris-saclay.fr')) {
      setErrors({ ...errors, email: 'Invalid email format ( accepted format : X@universite-paris-saclay.fr)' });
      hasErrors = true;
    }

    if (password.length < 8) {
      setErrors({ ...errors, password: 'Password must be at least 8 characters long' });
      hasErrors = true;
    }

    if (hasErrors) {
      return; // Don't proceed with form submission if there are validation errors
    }

    try {
      const res = await fetch('http://localhost:3001/Login', {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({ email, password})
      });

      if(res.status === 400 || !res){
        window.alert("Invalid Credentials")
      } else if (res.status === 404) { // Handle non-existent user
        window.alert("User does not exist. Please sign up first."); // Display appropriate message
      } else if (res.status === 410) { // Handle non-existent user
        window.alert("Password is incorrect"); // Display appropriate message
      } else{
        // window.alert("Login Successfull");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You have been logged in successfully!",
          showConfirmButton: false,
          timer: 2000
        });
        localStorage.setItem("isLoggedIn","true")
        localStorage.setItem("isAdmin","false")
        navigate('/Dashboard');
        

        // window.location.reload();
        // history.push('/')
        // Token is generated When we Logged In.
        // Now we need to create Schema for Messages
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
            <h1 className="display-4 fw-bolder">Welcome Back</h1>
            <p className="lead text-center">Enter Your Credentials To Login</p>
            <h5 className="mb-4">OR</h5>
            <NavLink
              to="/Signup"
              className="btn btn-outline-light rounded-pill pb-2 w-50"
            >
              SignUp
            </NavLink>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}

                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-danger">{errors.password}</p>}
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Remember me
                </label>
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-4 rounded-pill">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;