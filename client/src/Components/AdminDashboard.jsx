import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate } from 'react-router';
import Swal from 'sweetalert2';

// import {Button, Dropdown} from 'react-bootstrap';
// import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import polylogo from '//Images/polylogo.png';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1sFRk1Lo2Cj7pEuNlwRpbYd3s8WLa+7VgweVC5I4B+DeOgbe4fPeCxu4NvABKg+qNNQbBRcmcbatZx8efWY9LQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />

const AdminDashboard = () => {
  const Navigate = useNavigate();
  //const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isAdmin = localStorage.getItem("isAdmin");
  const isUpdate = localStorage.getItem("isUpdate");
  localStorage.setItem("isUpdate","false");
  // console.log("Loggedin : ",isLoggedIn);
  // console.log("Admin :",isAdmin);

  const [firstChoice, setFirstChoice] = useState('');
  const [secondChoice, setSecondChoice] = useState('');
  const [tableTD, setTableTD] = useState([]);
  const [tableTP, setTableTP] = useState([]);
  const [tableC, setTableC] = useState([]);

  const [Add, setAdd] = useState('');
  const [Update, setUpdate] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleChange = (event) =>{
    let name = event.target.name
    let value = event.target.value

    if(isUpdate === "true"){
      setUpdate({...Update, [name]:value})
    }
    else{      
      setAdd({...Add, [name]:value})
    }
  }

    // Function to handle changes in the Add form fields
    const handleAddFormChange = (event) => {
      const { name, value } = event.target;
      setAdd({ ...Add, [name]: value });
    };
    // Function to handle changes in the Update form fields
    const handleUpdateFormChange = (event) => {
      const { name, value } = event.target;
      setUpdate({ ...Update, [name]: value });
    };

  
  // Handle redirect if logged out
  useEffect(() => {
    if (isAdmin !== "true"){
      Navigate('/');
      window.location.reload()
    }
  }, [Navigate, isAdmin]);

  // Function to handle first choice change
  const handleFirstChoiceChange = (event) => {
    setFirstChoice(event.target.value);
    // Reset second choice when the first choice changes
    setSecondChoice('');
  };

  const handleSubmit = async () => {
    try {
      const responseTD = await fetch('http://localhost:3001/getTDs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstChoice, secondChoice })
      });
      const responseTP = await fetch('http://localhost:3001/getTPs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstChoice, secondChoice })
      });
      const responseCs = await fetch('http://localhost:3001/getCs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstChoice, secondChoice })
      });

      if (responseTD.ok && responseTP.ok && responseCs.ok) {
        const dataTD = await responseTD.json();
        const dataTP = await responseTP.json();
        const dataCs = await responseCs.json();
        setTableTD(dataTD);
        setTableTP(dataTP);
        setTableC(dataCs);
  
      } else {
        console.error('Error:', responseTD.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  {/* ------------------------Functions to handle Delete / Add / Update--------------------------------------- */}

  // Function to handle deleting an item
  const handleDelete = async(item) => {
    Swal.fire({
      title: "Are you sure ?",
      text: " You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "light",
      confirmButtonText: "Delete"
    }).then( async (result)  => {
      if (result.isConfirmed) {
        const response = await fetch('http://localhost:3001/removeDoc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({item})
      });
      handleSubmit();
      }
    });
  
  };

  // ADD and UPDATE handeled together

 
  const willUpdate = (item) => {
    localStorage.setItem("isUpdate","true");
    setUpdate(item);
    setShowAddModal(true);

  };

  const handleFormUpdate = async(event) => {
    event.preventDefault();
    try {
      // console.log(Update);
        const res = await fetch('http://localhost:3001/updateDoc', {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(Update)
      });

      if(res.status === 400 || !res){
        window.alert("Input error")
      } 
      else{
        // window.alert("Login Successfull");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You have add the document successfully!",
          showConfirmButton: false,
          timer: 2000
        });
      }
    } catch (error) {
      console.log(error);
    }
    handleSubmit();
  };

  //function for handling form submission
  const handleFormAdd = async(event) => {
    // event.preventDefault();
    try {
        const res = await fetch('http://localhost:3001/addDoc', {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(Add)
      });

      if(res.status === 400 || !res){
        window.alert("Input error")
      } 
      else{
        // window.alert("Login Successfull");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You have add the document successfully!",
          showConfirmButton: false,
          timer: 2000
        });
      }
      handleSubmit();
    } catch (error) {
      console.log(error);
    }
    
    // Hide the modal after submitting
    setShowAddModal(false);
  };
  
    
    return (
        <div>
            <div className="container-fluid mb-5">
        <div className="row">

{/* ----------------------------------Side Navbar-----------------------------------------------------*/}

          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                  <li>                           
                    <div className="container mt-4">
                      <div className="row">
                        <div className="col-md-10">
                          <div className="mb-3">
                            <label htmlFor="firstChoice" className="form-label">
                              Promo
                            </label>
                            <select
                              id="firstChoice"
                              className="form-select"
                              value={firstChoice}
                              onChange={handleFirstChoiceChange}
                            >
                              <option value="Peip1">Peip1</option>
                              <option value="Peip2">Peip2</option>
                              <option value="APP3">APP3</option>
                              <option value="APP4">APP4</option>
                              <option value="APP5">APP5</option>
                              <option value="ET3">ET3</option>
                              <option value="ET4">ET4</option>
                              <option value="ET5">ET5</option>
                            </select>
                          </div>

                          {/* Render second choice list conditionally based on the first choice */}
                          
                          {['Peip1','Peip2'].includes(firstChoice) && (
                            <div className="mb-3">
                              <label htmlFor="secondChoice" className="form-label">Second Choice</label>
                              <select
                                id="secondChoice"
                                className="form-select"
                                value={secondChoice}
                                onChange={(event) => setSecondChoice(event.target.value)}
                              >
                                <option value="Opt1">Opt1</option>
                                <option value="Opt2">Opt2</option>
                                <option value="Opt3">Opt3</option>
                                <option value="Opt4">Opt4</option>
                              </select>
                            </div>
                          )}
                          {['APP3','APP4','APP5','ET3','ET4','ET5'].includes(firstChoice) && (
                            <div className="mb-3">
                              <label htmlFor="secondChoice" className="form-label">Spe</label>
                              <select
                                id="secondChoice"
                                className="form-select"
                                value={secondChoice}
                                onChange={(event) => setSecondChoice(event.target.value)}
                              >
                                <option value="INFO">INFO</option>
                                <option value="MTX">MTX</option>
                                <option value="PSO">PSO</option>
                                <option value="ESR">ESR</option>
                              </select>
                            </div>
                          )}

                          <div className="mb-3">
                            <button className="btn btn-primary" onClick={handleSubmit} >Submit</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li> 
              </ul>
            </div>
          </nav>

{/* ----------------------------------Main Body-----------------------------------------------------*/}
       
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            
            <div className="chartjs-size-monitor">
              <div className="chartjs-size-monitor-expand">
                <div className="">
                </div>
              </div>
              <div className="chartjs-size-monitor-shrink">
                <div className="">
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
              <div className="btn-toolbar mb-2 mb-md-0"></div>
              <button  className="btn btn-primary"onClick={() => setShowAddModal(true)}>Add</button>
            </div>
                  {/*--------------------- Modal----------------------- */}
            <div className={`modal ${showAddModal ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: showAddModal ? "block" : "none" }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add / Modify Item</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowAddModal(false)}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {/* Form */}
                  { isUpdate === "true" ?
                    <form onSubmit={handleFormUpdate}>
                      {/* Include your input fields here */}
                      <div className="form-group">
                        <label htmlFor="input1">Name</label>
                        <input onChange={handleUpdateFormChange} type="text" className="form-control" name="name" value={Update.name} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="input1">Subject</label>
                        <input onChange={handleUpdateFormChange} type="text" className="form-control" name="type" value={Update.type} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="input1">Type</label>
                        <input onChange={handleUpdateFormChange} type="text" className="form-control"  name="file_type" value={Update.file_type} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="input1">Link</label>
                        <input onChange={handleUpdateFormChange} type="text" className="form-control" name='link' value={Update.link} required />
                      </div>
                      <button type="submit" className="btn btn-primary">Update Item</button>
                    </form>
                  : null}
                  { isUpdate === "false" ?
                      <form onSubmit={handleFormAdd}>
                      {/* Include your input fields here */}
                      <div className="form-group">
                        <label htmlFor="input1">Name</label>
                        <input onChange={handleAddFormChange} type="text" className="form-control" name="docName" value={Add.Name} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="input1">Subject</label>
                        <input onChange={handleAddFormChange} type="text" className="form-control" name="Subject" value={Add.Subject} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="input1">Type</label>
                        <input onChange={handleAddFormChange} type="text" className="form-control"  name="Type" value={Add.Type} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="input1">Link</label>
                        <input onChange={handleAddFormChange} type="text" className="form-control" name='Link' value={Add.Link} required />
                      </div>
                      <button type="submit" className="btn btn-primary">Add Item</button>
                    </form>
                     
                     : null}

                      {/* <button type="submit" className="btn btn-primary">Add Item</button> */}
                     
                    
                  </div>
                </div>
              </div>
            </div>

      {/* -------------------------------Sections TD TP COURS----------------------------*/}

            <h2>TD</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">File Name</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Link</th>
                    <th scope="col">Add / Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {tableTD.map((item) => (
                    <tr key={item}>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td><a href={item.link}>{item.link}</a></td>
                      <td>
                      <button className ="btn btn-success" onClick={() => willUpdate(item)}>Update</button>
                      {' '}
                      <button  className ="btn btn-danger" onClick={() => handleDelete(item)}>Delete</button>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <h2>TP</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">File Name</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Link</th>
                    <th scope="col">Add / Delete</th>
                  </tr>
                </thead>
                <tbody>
                {tableTP.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td><a href={item.link}>{item.link}</a></td>
                      <td>
                      <button className ="btn btn-success" onClick={() => willUpdate(item)}>Update</button>
                      {' '}
                      <button  className ="btn btn-danger" onClick={() => handleDelete(item)}>Delete</button>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>  
            </div>

            <h2>Cours</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">File Name</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Link</th>
                    <th scope="col">Add / Delete</th>
                  </tr>
                </thead>
                <tbody>
                {tableC.map((item) => (
                    <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td><a href={item.link}>{item.link}</a></td>
                    <td>
                      <button className ="btn btn-success outline-danger" onClick={() => willUpdate(item)}>Update</button>
                      {' '}
                      <button  className ="btn btn-danger" onClick={() => handleDelete(item)}>Delete</button>
                    </td>
                  </tr>
                  ))} 
                </tbody>
              </table>  
            </div>
          </main>
        </div>
      </div>
        </div>
    );
}

export default AdminDashboard;
