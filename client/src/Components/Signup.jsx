import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    agreeTerms: '' 

  });

  // State variable to track agreement to terms
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Handle redirect if already logged in
  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn == "true"){
      navigate('/');
      window.location.reload()
    }
  }, []);

  // Handle Inputs
  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear errors when user starts typing again
  };

  // Handle Agreement to Terms
  const handleAgreeTerms = () => {
    setAgreeTerms(!agreeTerms); // Toggle the agreement state
    setErrors({ ...errors, agreeTerms: '' }); // Clear errors related to agreement
  };

  // Handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Object Destructuring
    const { username, email, password } = user;

    // Validation
    let hasErrors = false;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation for empty fields
    if (!username.trim() || !email.trim() || !password.trim() || !agreeTerms) {
      setErrors({
        username: username.trim() ? '' : 'Username is required',
        email: email.trim() ? '' : 'Email is required',
        password: password.trim() ? '' : 'Password is required',
        agreeTerms: !agreeTerms ? 'You must agree to the terms and conditions' : ''

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
      //console.log(user);

      const res = await fetch('http://localhost:3001/Signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      console.log("fetch sent");

      if (res.status === 400 || !res) {
        window.alert('Invalid Signup Details');
      } 
      if (res.status === 401 ) {
        window.alert('Email address already exists');
      } 
      
      
      else {
        window.alert('Signup Successful please proceed to Login page');
        navigate('/Login');
      }
    } catch (error) {
      console.log(error);
    }

    //console.log("Handle on submit finished");
  };

  return (
    <div>
      <div className="container shadow my-5">
        <div className="row justify-content-end">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
            <h1 className="display-4 fw-bolder">Hello, Friend</h1>
            <p className="lead text-center">Enter Your Details to Register</p>
            <h5 className="mb-4">OR</h5>
            <NavLink to="/login" className="btn btn-outline-light rounded-pill pb-2 w-50">
              Login
            </NavLink>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">SignUp</h1>
            <form onSubmit={handleSubmit} method="POST">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="username"
                  value={user.username}
                  onChange={handleInput}
                />
                {errors.username && <p className="text-danger">{errors.username}</p>}
              </div>
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
                  onChange={handleInput}
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
                  onChange={handleInput}
                />
                {errors.password && <p className="text-danger">{errors.password}</p>}
              </div>
              <div className="mb-3 form-check">
                <input
                 type="checkbox"
                  className="form-check-input"
                   id="exampleCheck1"
                   checked={agreeTerms} // Set the checked attribute based on the state variable
                   onChange={handleAgreeTerms} // Call the handleAgreeTerms function to toggle the state variable               
                   />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  I Agree Terms and Conditions
                </label>
                {errors.agreeTerms && <p className="text-danger">{errors.agreeTerms}</p>}
              </div>
              <button type="submit" className="btn btn-outline-primary w-100 mt-4 rounded-pill">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;













// import React, { useState } from 'react';
// import { NavLink , Link  } from 'react-router-dom';
// import { useNavigate} from 'react-router';

// const Signup = () => {

//   const Navigate = useNavigate()

//   const [user, setUser] = useState(
//     {
//       username : "",
//       email : "",
//       password : ""
//     }
//   );

//   const [errors, setErrors] = useState({
//     username : "",
//     email: '',
//     password: ''
//   });

//   // Handle Inputs
//   const handleInput = (event) =>{
//     let name = event.target.name;
//     let value = event.target.value;
//     setUser({...user, [name]:value});
//     setErrors({ ...errors, [name]: '' }); // Clear errors when user starts typing again

//   }

//   // Handle Submit
//   const handleSubmit = async (event)=>{
//     event.preventDefault();

//     // Object DeStructuring
//     // Store Object Data into Variables
//     const {username, email, password} = user;

//     // Validation
//     let hasErrors = false;
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!username.trim()) {
//       setErrors({ ...errors, username: 'Username is required' });
//       hasErrors = true;
//     }

//     if (!email.trim() || !emailPattern.test(email)) {
//       setErrors({ ...errors, email: 'Invalid email format' });
//       hasErrors = true;
//     }

//     if (!password.trim() || password.length < 8) {
//       setErrors({ ...errors, password: 'Password must be at least 8 characters long' });
//       hasErrors = true;
//     }

//     if (hasErrors) {
//       return; // Don't proceed with form submission if there are validation errors
//     }


//     try {
//       //It is Submitted on port 3000 by default
//       // Which is Front End but we need to 
//       // Submit it on Backend which is on 
//       // Port 3001. So we need Proxy.
//       const res = await fetch('/Signup', {
//         method : "POST",
//         headers : {"Content-Type" : "application/json"},
//         body : JSON.stringify({username, email, password})
//       })
//       console.log(res.status)
//       if(res.status === 400 || !res){
//         window.alert("Already Used Details / Invalid Signup Details'")
//       }else{
//         // You need to Restart the Server for Proxy Works
//         // Now Try Again
//         window.alert("Registered Successfully");
//         Navigate('/login')
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }


  
//     return (
//         <div>
//             <div className="container shadow my-5">
//         <div className="row justify-content-end">
//           <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
//             <h1 className="display-4 fw-bolder">Hello, Friend</h1>
//             <p className="lead text-center">Enter Your Details to Register</p>
//             <h5 className="mb-4">OR</h5>
//             <NavLink
//               to="/login"
//               className="btn btn-outline-light rounded-pill pb-2 w-50"
//             >
//               Login
//             </NavLink>
//           </div>
//           <div className="col-md-6 p-5">
//           <h1 className="display-6 fw-bolder mb-5">SignUp</h1>
//             <form onSubmit={handleSubmit} method="POST">
//               <div className="mb-3">
//                 <label htmlFor="name" className="form-label">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="name"
//                   name="username"
//                   value={user.username}
//                   onChange={handleInput}
//                 />
//                 {errors.email && <p className="text-danger">{errors.email}</p>}

//               </div>
//               <div className="mb-3">
//                 <label htmlFor="exampleInputEmail1" className="form-label">
//                   Email address
//                 </label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="exampleInputEmail1"
//                   aria-describedby="emailHelp"
//                   name="email"
//                   value={user.email}
//                   onChange={handleInput}
//                 />
//                 {errors.email && <p className="text-danger">{errors.email}</p>}

//                 <div id="emailHelp" className="form-text">
//                   We'll never share your email with anyone else.
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="exampleInputPassword1" className="form-label">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="exampleInputPassword1"
//                   name="password"
//                   value={user.password}
//                   onChange={handleInput}
//                 />
//                 {errors.password && <p className="text-danger">{errors.password}</p>}

//               </div>
//               <div className="mb-3 form-check">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   id="exampleCheck1"
//                 />
//                 <label className="form-check-label" htmlFor="exampleCheck1">
//                   I Agree Terms and Conditions
//                 </label>
//               </div>  
//               <Link to="/Dashboard" >    
//               <button  type="submit"   className="btn btn-outline-primary w-100 mt-4 rounded-pill">
//                 Register
//               </button>
//               </Link>
//             </form>
//           </div>
//         </div>
//       </div>
//         </div>
//     );
// }

// export default Signup;