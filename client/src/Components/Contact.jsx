import React, {useState} from "react";

const Contact = () => {

  const [msg, setMsg] = useState({
    name : "",
    email : "",
    message : ""
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Handle Inputs
  const handleChange = (event) =>{
    let name = event.target.name;
    let value = event.target.value;

    setMsg({...msg, [name]:value});
  }

  // Handle Submit
  const handleSubmit = async (event)=>{
    event.preventDefault();
    // Object DeStructuring
    // Store Object Data into Variables
    const {name, email, message} = msg;

    // Validation
    let hasErrors = false;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation for empty fields
    if (!email.trim() || !name.trim() || !message.trim()) {
      setErrors({
        email: email.trim() ? '' : 'Email is required',
        name: name.trim() ? '' : 'Name is required',
        message: message.trim() ? '' : 'Message is required'
      });
      return; // Don't proceed with form submission if any field is empty
    }

    if (!emailPattern.test(email)) {
      setErrors({ ...errors, email: 'Invalid email format ( accepted format : X@universite-paris-saclay.fr)' });
      hasErrors = true;
    }

    if (hasErrors) {
      return; // Don't proceed with form submission if there are validation errors
    }

    try {

      const res = await fetch('http://localhost:3001/Contact/message', {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          name, email, message
        })
      })
      console.log(res.status)
      if(res.status === 400 || !res){
        window.alert("Message Not Sent. Try Again Later")
      }else{
        // You need to Restart the Server for Proxy Works
        // Now Try Again
        window.alert("Message Sent");
        setMsg({
          name : "",
          email : "",
          message : ""
        })
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <section id="contact">
        <div className="container my-5 py-5">
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fs-5 text-center mb-0">Contact Us</h3>
              <h1 className="display-6 text-center mb-4">
                Have Some <b>Question?</b>
              </h1>
              <hr className="w-25 mx-auto" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img 
              src="https://www.polytech.universite-paris-saclay.fr/sites/default/files/2020-06/hall%20polytech%20paris%20saclay.jpg" 
              alt="Contact" 
              className="w-100 " 
              />
            </div>
            <div className="col-md-6">
              <form onSubmit={handleSubmit} method="POST">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="John Smith"
                    name="name"
                    value={msg.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="text-danger">{errors.name}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    name="email"
                    value={msg.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-danger">{errors.email}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">
                    Your Message
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    name="message"
                    value={msg.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && <p className="text-danger">{errors.message}</p>}
                </div>
                <button type="submit" className="btn btn-outline-primary rounded-pill px-4">Send Message <i className="fa fa-paper-plane ms-2"></i></button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;