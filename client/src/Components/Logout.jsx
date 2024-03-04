import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {

    const Navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    // const isAdmin = localStorage.getItem("isAdmin");

    const logout = async () => {
        // const confirmAdd = window.confirm("Are you sure you want to Logout");
        // if (confirmAdd) {
        try {
            const res = await fetch('http://localhost:3001/Logout', {
                method : "GET",
                headers : {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            });

            if(res.status === 401 || !res ){
                window.alert("Please Logout Later");
            }else{
                localStorage.setItem("isLoggedIn","false")
                localStorage.setItem("isAdmin","false")
                Navigate('/');
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    // }
    }

    // Handle redirect if already logged iout
    useEffect(() => {
        // console.log(isLoggedIn);
        if (isLoggedIn !== "true"){
          Navigate('/');
          window.location.reload()
        }
        logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            
        </div>
    );
}

export default Logout;