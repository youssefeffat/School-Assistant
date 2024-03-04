import React from 'react';
//import { NavLink } from 'react-router-dom';
// import  Carousel  from './Carousel';

const Home = () => {
    if(localStorage.getItem("isLoggedIn") === null){
        localStorage.setItem("isLoggedIn","false");
    }
    return (
        <div>
            <section id="home" className="bg-primary text-white py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-3 text-center">
                            <h1 className="display-5 fw-bold mb-4">Feel the Fresh Business Perspective</h1>
                            <p className="lead fs-5 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit obcaecati aut molestiae porro reiciendis consectetur maiores atque necessitatibus blanditiis provident.</p>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-4 col-sm-6">
                            <div className="card h-100">
                                <div className="card-body text-center">
                                    <i className="fa fa-cogs fa-3x mb-3 text-primary"></i>
                                    <h5 className="card-title mb-2 fs-5 fw-bold">Highly Customizable</h5>
                                    <p className="card-text fs-6">
                                        Some quick example text to build on the card title and make
                                        up the bulk of the card's content.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div className="card h-100">
                                <div className="card-body text-center">
                                    <i className="fa fa-mobile fa-3x mb-3 text-primary"></i>
                                    <h5 className="card-title mb-2 fs-5 fw-bold">Fully Responsive</h5>
                                    <p className="card-text fs-6">
                                        Some quick example text to build on the card title and make
                                        up the bulk of the card's content.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div className="card h-100">
                                <div className="card-body text-center">
                                    <i className="fa fa-users fa-3x mb-3 text-primary"></i>
                                    <h5 className="card-title mb-2 fs-5 fw-bold">Users Experience</h5>
                                    <p className="card-text fs-6">
                                        Some quick example text to build on the card title and make
                                        up the bulk of the card's content.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>            
        </div>
    );
}

export default Home;









// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const Home = () => {
//     return (
//         <div>
//             <section id="home" className="bg-primary text-whites "> {/* Add class names for background and text color */}
//                 <div className="container-fluid">
//                     <div className="row justify-content-center">
//                         <div className="col-md-8 mt-5 text-center">
//                             <h1 className="display-4 fw-bolder mb-4">Feels the Fresh Business Perspective</h1>
//                             <p className="lead fs-4 mb-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit obcaecati aut molestiae porro reiciendis consectetur maiores atque necessitatibus blanditiis provident.</p>
//                             {/* <div className="buttons d-flex justify-content-center">
//                                 <NavLink to="/contact" className="btn btn-light me-4 rounded-pill px-4 py-2">Contact Us</NavLink>
//                             </div> */}
//                         </div>
//                     </div>

//                     <div className="row mt-5">    
//                         <div className="col-md-4 col-sm-6">
//                             <div className="card p-3 ">
//                                 <div className="card-body text-center">
//                                     <i className="fa fa-cogs fa-4x mb-4 text-primary"></i>
//                                     <h5 className="card-title mb-3 fs-4 fw-bold">Highly Customizable</h5>
//                                     <p className="card-text lead">
//                                         Some quick example text to build on the card title and make
//                                         up the bulk of the card's content.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-md-4 col-sm-6">
//                             <div className="card p-3 ">
//                                 <div className="card-body text-center">
//                                     <i className="fa fa-mobile fa-4x mb-4 text-primary"></i>
//                                     <h5 className="card-title mb-3 fs-4 fw-bold">Fully Responsive</h5>
//                                     <p className="card-text lead">
//                                         Some quick example text to build on the card title and make
//                                         up the bulk of the card's content.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                          <div className="col-md-4 col-sm-6">
//                             <div className="card p-3 ">
//                                 <div className="card-body text-center">
//                                     <i className="fa fa-users fa-4x mb-4 text-primary"></i>
//                                     <h5 className="card-title mb-3 fs-4 fw-bold">Users Experience</h5>
//                                     <p className="card-text lead">
//                                         Some quick example text to build on the card title and make
//                                         up the bulk of the card's content.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default Home;



