import "./fonts/material-icon/css/material-design-iconic-font.min.css";
import "./css/style.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import React from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function LoginNew() {
    const navigate = useNavigate();
    const [password1, setPassword1] = useState("");
    const [matchError, setMatchError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("")
    const passwordInputHandler = (val) => {
        setConfirmPassword(val);
        setMatchError(val !== password1); // Kiểm tra nếu password1 và confirmPassword không khớp
    };
    useEffect(() => {
        passwordInputHandler(confirmPassword)
    }, [password1])

    useEffect(() => {
      const token = localStorage.getItem('token');
      if(token){
        navigate("/")
      }
      document.title = "Singup";
      window.scrollTo(0, 0)
    }, []);
    const loadSubmit = () => {
        Swal.fire({
            html: '<div className="loading-screen" style={{position: "fixed",\n' +
                '  top: "0;",\n' +
                '  left: "0",\n' +
                '  width: "100%",\n' +
                '  height: "100%",\n' +
                '  background-color: "rgba(0, 0, 0, 0.5)" }}/* Màu nền màn hình đen với độ mờ */></div>', // Sử dụng CSS để tạo màn hình đen.
            timer: 4000,
            title: "Please wait a moment",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: async () => {
                await Swal.showLoading();
            },
            willClose: () => {
                // Thêm xử lý khi SweetAlert2 đóng (nếu cần thiết).
            }
        });
    };
    return (
        <>

            <div className="main" style={{ marginTop: "5%" }}>
                {/* Sign up form */}
                <section className="signup">
                    <div className="container">
                        <div className="signup-content">
                            <div className="signup-form">
                                <h2 className="form-title">Sign up</h2>
                                <Formik
                                    initialValues={{
                                        password: "",
                                        confirmP: "",
                                        name: "",
                                        email: "",
                                        phoneNumber: "",
                                        username: "",
                                        birthday: "",
                                        gender: "",
                                        address:""
                                    }}
                                    validationSchema={Yup.object({
                                        name: Yup.string()
                                            .required("Can't be left blank!")
                                            .matches(/^[\p{Lu}\p{Ll}\p{N}\s]+$/u, "Product name must not contain special characters")
                                        ,
                                        address: Yup.string()
                                            .required("Can't be left blank!"),
                                        username: Yup.string()
                                            .required("Can't be left blank!").min(6, "Names can't be too short!")
                                        ,
                                   
                                        phoneNumber: Yup.string().required("Can't be left blank!")
                                            .matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, 'Enter correct SDT format eg: 098XXXXXXX (X is a digit)'),
                                        email: Yup.string().required("Can't be left blank!").email('Enter the correct email format')
                                    })}

                                    onSubmit={async (values, { setSubmitting }) => {
                                        try {
                                            values = {
                                                ...values,
                                                users: {
                                                    username: values.username,
                                                    password: password1
                                                }
                                            }
                                            await loadSubmit()
                                            const response = await axios.post(
                                                'http://localhost:8080/api/customer/createCustomer',
                                                values
                                            )
                                            console.log(response)
                                            toast.success("Sign Up Success");
                                            navigate('/login');
                                        } catch (error) {
                                            toast.error("Fail to register");
                                        } finally {
                                            setSubmitting(false);
                                        }
                                    }}
                                >
                                    <Form method="POST" className="register-form" id="register-form">
                                        <div className="form-group ">
                                            <label htmlFor="name">
                                                <i className="zmdi zmdi-account material-icons-name" />
                                            </label>
                                            <Field
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Your Name"
                                            />
                                            <ErrorMessage style={{ marginTop: "-5%" }} name="name" component="span" className="error-r" />
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="email">
                                                <i className="zmdi zmdi-email" />
                                            </label>
                                            <Field
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Your Email"
                                            />
                                            <ErrorMessage style={{ marginTop: "-5%" }} name="email" component="span" className="error-r" />
                                        </div>
                                        <div className="row ">
                                            <div className="form-group col-7">
                                                <label >
                                                    <i className="fa-solid fa-phone-volume"></i>
                                                </label>
                                                <Field
                                                    type="number"
                                                    name="phoneNumber"

                                                    placeholder="Phone"
                                                />
                                                <ErrorMessage style={{ marginTop: "-5%" }} name="phoneNumber" component="span" className="error-r" />
                                            </div>
                                            <div className="form-group col-5">
                                                <label >
                                                    <i className="fa-solid fa-phone-volume"></i>
                                                </label>
                                                <Field
                                                    type="date"
                                                    name="birthday"
                                                />
                                                
                                            </div>
                                        </div>
                                         <div className="form-group ">
                                                <label >
                                                    <i className="fa-solid fa-user-plus"></i>
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="address"
                                                    placeholder="Address"
                                                />
                                                <ErrorMessage style={{ marginTop: "-5%" }} name="address" component="span" className="error-r" />
                                            </div>
                                        <div className="row">
                                            <div className="form-group col-9">
                                                <label >
                                                    <i className="fa-solid fa-user-plus"></i>
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="username"
                                                    placeholder="Username"
                                                />
                                                <ErrorMessage style={{ marginTop: "-5%" }} name="username" component="span" className="error-r" />
                                            </div>
                                            <div className="form-group col-3">
                                                <label htmlFor="name">
                                                    <i className="zmdi " />
                                                </label>
                                                <div className="row">
                                                    <div className="col-5">
                                                        <Field type="radio" name="gender" value="1" />
                                                        <div >
                                                            Male
                                                        </div>
                                                    </div>
                                                    <div className="col-7">
                                                        <Field type="radio" name="gender" value="0" />
                                                        <div >
                                                            Female
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="pass">
                                                <i className="zmdi zmdi-lock" />
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                onChange={(e) => setPassword1(e.target.value)}
                                                id="pass"
                                                placeholder="Password"
                                            />
                                            <ErrorMessage style={{ marginTop: "-5%" }} name="password" component="span" className="error-r" />
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                <i className="zmdi zmdi-lock-outline" />
                                            </label>
                                            <input
                                                type="password"
                                                name="confirmP"
                                                onChange={(v) => passwordInputHandler(v.target.value)}
                                                id="re_pass"
                                                placeholder="Repeat your password"
                                            />
                                            {matchError && <p style={{ color: 'red' }}>Password incorrect!</p>}
                                        </div>

                                        <div className="form-group form-button">
                                            <input
                                                type="submit"
                                                name="signup"
                                                id="signup"
                                                className="form-submit"
                                                defaultValue="Register"
                                            />
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                            <div className="signup-image">
                                <figure>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/c0823g1-sprint2.appspot.com/o/Modern%20Technology%20Clock%20Logo.png?alt=media&token=4d3c8581-aa75-493b-abb7-746a100babe3"
                                        alt="sing up image"
                                    />
                                </figure>

                            </div>
                        </div>
                    </div>
                </section>


            </div>

            <ToastContainer />

        </>
    )

}