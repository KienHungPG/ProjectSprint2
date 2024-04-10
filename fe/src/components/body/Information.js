import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as service from "../service/Service";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

export function Information() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState();
  const getCustomer = async () => {
    try {
      const rs = await service.getCustomers();
      setCustomer(rs.data);
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    document.title = "Information";
    getCustomer();
  }, []);
  if (!customer) {
    return null;
  }
  return (
    <>
      <div style={{ marginTop: "8%" }}>
        {/* <div className="avatar">
          <img src={customer.image} alt="" />
        </div>
        <div className="name">
          <h1>{customer.name}</h1>
          {customer.name == "Hồ Viễn" ? (
            <div className="specialize">Full-stack Developer</div>
          ) : (
            <div className="specialize">Front-End Developer</div>
          )}

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
              <span>G</span> {customer.gender == 0 ? "Female" : "Male"}
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eligendi
          omnis quasi dolores modi eius aliquam ipsum soluta, dolore tenetur
          excepturi praesentium porro alias itaque enim labore qui
          necessitatibus molestias hic cum deserunt ab! Illum sed eveniet
          distinctio, alias sunt repudiandae labore a dolorum tenetur? Harum
          deleniti mollitia odio neque.
        </div> */}
        <section style={{ backgroundColor: "#eee" }}>
          <MDBContainer className="py-5">
            <MDBRow>
              <MDBCol>
                <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                  <MDBBreadcrumbItem>
                    <a href="/">Home</a>
                  </MDBBreadcrumbItem>
                  <MDBBreadcrumbItem>
                    <a href="/">User</a>
                  </MDBBreadcrumbItem>
                  <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
                </MDBBreadcrumb>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: "150px" }}
                      fluid
                    />
                    <p className="text-muted mb-1">Full Stack Developer</p>
                    <p className="text-muted mb-4">
                      Bay Area, San Francisco, CA
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <MDBBtn>Edit</MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {customer.name}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Username</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {customer.users.username}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Gender</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                        {customer.gender == 0 ? "Female" : "Male"}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {customer.email}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Phone</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {customer.phoneNumber}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Birthday</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {customer.birthday}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {customer.address}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>
    </>
  );
}
