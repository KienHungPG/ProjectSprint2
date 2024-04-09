import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../header/header.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import store from "store2";
export function Header() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState();
  const token = localStorage.getItem("token");
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  // const [decodedToken, setDecodedToken] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      // Xử lý khi không có token trong localStorage
    }
  }, [token]);

  const handlerLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setIsLogin(false);
    setDropdownOpen(false);
    toast.success("Logout seccuss !!");
    // window.location.reload()
    // await navigate("/login")
  };
  // console.log(decodedToken.sub)
  return (
    <>
      <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo">
            <h1>
              <NavLink to="/">KWatch</NavLink>
            </h1>
            {/* Uncomment below if you prefer to use an image logo */}
            {/* <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>*/}
          </div>
          <nav id="navbar" className="navbar">
            <ul>
              <li
                style={{
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                  fontWeight: "300",
                }}
              >
                {isLogin ? (
                  <>
                    <Dropdown
                      isOpen={dropdownOpen}
                      toggle={toggleDropdown}
                      className="nav-info-user"
                    >
                      <DropdownToggle
                        style={{
                          fontSize: "120%",
                        }}
                        className="nav-link btn-light"
                      >
                        <i
                          class="bi bi-person"
                          style={{ fontSize: "120%" }}
                        ></i>
                        {username}
                      </DropdownToggle>
                      <DropdownMenu className="abc">
                        <Link to="/info" className="dropdown-item ">
                          <i
                            class="bi bi-info-square"
                            style={{ fontSize: "110%" }}
                          >
                            {" "}
                            Information
                          </i>
                        </Link>
                        <Link to="/history" className="dropdown-item ">
                          <i
                            class="bi bi-card-list"
                            style={{ fontSize: "110%" }}
                          >
                            {" "}
                            Payment history
                          </i>
                        </Link>
                        <Link
                          className="dropdown-item "
                          onClick={() => handlerLogout()}
                          to="/login"
                        >
                          <i
                            class="bi bi-box-arrow-in-right"
                            style={{ fontSize: "120%" }}
                          >
                            {" "}
                            Logout
                          </i>
                        </Link>
                      </DropdownMenu>
                    </Dropdown>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className="font-a-header ">
                      <i class="bi bi-person" style={{ fontSize: "130%" }}></i>
                      LOGIN
                    </NavLink>
                  </>
                )}
              </li>
              <NavLink to="/cart" title="Shoping Cart">
                <ShoppingCartOutlinedIcon style={{ marginLeft: "10%" }} />
                CART
              </NavLink>
            </ul>
          </nav>
          {/* .navbar */}
        </div>
      </header>
      {/* End Header */}
    </>
  );
}
