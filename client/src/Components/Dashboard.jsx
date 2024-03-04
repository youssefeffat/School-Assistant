import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
// import {Button, Dropdown} from 'react-bootstrap';
// import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const Navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isAdmin = localStorage.getItem("isAdmin");
  console.log("Loggedin : ",isLoggedIn);
  console.log("Admin : ",isAdmin);
  

  const [firstChoice, setFirstChoice] = useState('');
  const [secondChoice, setSecondChoice] = useState('');

  // Handle redirect if logged out
  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn !== "true"){
      Navigate('/');
      window.location.reload()
    }
  }, [Navigate, isLoggedIn]);

  const handleFirstChoiceChange = (event) => {
    setFirstChoice(event.target.value);
    // Reset second choice when the first choice changes
    setSecondChoice('');
  };



  // const [criteria1, setCriteria1] = useState('');
  // const [criteria2, setCriteria2] = useState('');
  const [tableTD, setTableTD] = useState([]);
  const [tableTP, setTableTP] = useState([]);
  const [tableC, setTableC] = useState([]);

  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3001/getTDs', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ firstChoice, secondChoice })
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setTableTD(data);
  //       console.log(data);
  //     } else {
  //       console.error('Error:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const handleSubmitV2 = async () => {
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
  
    return (
        <div className='Dashboard'>
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
                              <label htmlFor="secondChoice" className="form-label">Spe</label>
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
                              <label htmlFor="secondChoice" className="form-label">Second Choice</label>
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
                            <button className="btn btn-primary" onClick={handleSubmitV2} >Submit</button>
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
                  </tr>
                </thead>
                <tbody>
                  {tableTD.map((row, index) => (
                    <tr key={row.index}>
                      <td>{row.name}</td>
                      <td>{row.type}</td>
                      <td><a href={row.link}>{row.link}</a></td>
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
                  </tr>
                </thead>
                <tbody>
                {tableTP.map((row, index) => (
                    <tr key={index}>
                      <td>{row.name}</td>
                      <td>{row.type}</td>
                      <td><a href={row.link}>{row.link}</a></td>
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
                  </tr>
                </thead>
                <tbody>
                {tableC.map((row, index) => (
                    <tr key={index}>
                     <td>{row.name}</td>
                      <td>{row.type}</td>
                      <td><a href={row.link}>{row.link}</a></td>
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

export default Dashboard;