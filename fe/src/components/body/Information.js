import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect } from "react";
import * as service from '../service/Service';

export function Information() {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState();
    const getCustomer = async () => {
        try {
            const rs = await service.getCustomers()
            setCustomer(rs.data)
        } catch (error) {
            navigate('/')
        }
    }
  
    useEffect(() => {
        document.title = "Information";
        getCustomer();
      }, [])
      if(!customer){
        return null;
    }
    return (
        <>

            <div className="containerr" style={{ marginTop: "8%" }}>
                <div className="avatar">
                    <img
                        src={customer.image}
                        alt=""
                    />
                </div>
                <div className="name">
                    <h1>{customer.name}</h1>
                    {
                    customer.name =="Hồ Viễn" ? 
                    <div className="specialize">Full-stack Developer</div> :
                    <div className="specialize">Front-End Developer</div>
                    }
                    
                    <ul className="contact">
                        <li>
                            <span>P</span> {customer.phoneNumber}
                        </li>
                        <li>
                            <span>E</span> {customer.email}
                        </li>
                        <li>
                            <span>D</span> {customer.birthday}
                        </li>
                        <li>
                            <span>G</span> {customer.gender == 0 ? "Female" :"Male"}
                        </li>
                    </ul>
                </div>
                <div className="info">
                    <ul>
                        <li>
                            From <b>{customer.address}</b> - VietNam
                        </li>
                        <li>Username: {customer.users.username}</li>
                    </ul>
                </div>
                <div className="intro">
                    <h2>INTRODUCE MYSELF</h2>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eligendi omnis
                    quasi dolores modi eius aliquam ipsum soluta, dolore tenetur excepturi
                    praesentium porro alias itaque enim labore qui necessitatibus molestias hic
                    cum deserunt ab! Illum sed eveniet distinctio, alias sunt repudiandae labore
                    a dolorum tenetur? Harum deleniti mollitia odio neque.
                </div>
            </div>

        </>
    )
}