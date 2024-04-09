import { Carousel } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link, useParams } from "react-router-dom";
import * as service from "../service/Service";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export function Details() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [images, setImage] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState({});
  const { id } = useParams();
  const [dep, setDep] = useState([]);
  const getProducts = async () => {
    try {
      const rs = (await service.getDetailProduct(id)).data;
      const res = await service.getImage(id);
      console.log(res);
      setImage(res);
      await setProduct(rs);

      if (product) {
        await setDep(rs.description.split("-"));
      }
      setCategory(rs.category);
    } catch (error) {
      if (error.response.status == 500) {
        navigate("/error");
      }
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
  }, []);
  const reload = (id) => {
    navigate(`/details/${id}`);
    window.location.reload();
  };

  const [productList, setProductList] = useState([]);
  const getAllProducts = async () => {
    const rs = await service.getAllProduct("null", 0);
    setProductList(rs.data.content);
  };
  const addToCart = async () => {
    await service.createShoppingcart(product, quantity);
    toast.success(
      `Add ${quantity} successful ${product.name} products to Cart!`
    );
    navigate("/");
  };
  useEffect(() => {
    document.title = "Detail";
    getAllProducts();
  }, []);
  const editQuantity = async (val) => {
    if (val == 1) {
      if (quantity < product.quantity) {
        setQuantity(quantity + 1);
      }
    } else {
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    }
  };

  return (
    <>
      <main id="main" style={{ marginTop: "5%" }}>
        <section className="layout_padding ">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="row">
                    <div className="col-md-7 p-relative r-left">
                      <div className="full back_blog text_align_center padding_right_left_15">
                        <Carousel>
                          {Array.isArray(images) &&
                            images.map((val) => (
                              <Carousel.Item key={val.id}>
                                <img
                                  className="d-block"
                                  src={val.img}
                                  alt="Carousel item"
                                  style={{
                                    width: "80%",
                                    marginLeft: "10%",
                                    height: "500px",
                                  }}
                                />
                              </Carousel.Item>
                            ))}
                        </Carousel>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="full heading_s1">
                        <h1 style={{ color: "#3498db" }}>{product.name}</h1>
                        <br />
                        <p>
                          {/* {product.description} */}
                          {dep.map((val) => (
                            <p> {val}</p>
                          ))}
                        </p>
                        <br />
                        <p>{category.name}</p>
                        <p>Quantity in stock: {product.quantity}</p>
                        <h3 style={{ color: "#3498db" }}>
                          Price: {product.price} $
                        </h3>
                        <div className="d-flex">
                          <p style={{ marginRight: "2%" }}>Quantity:</p>
                          <div className="d-flex">
                            <button
                              type="button"
                              className="minus"
                              onClick={() => editQuantity(0)}
                            >
                              <span>-</span>
                            </button>
                            <input
                              value={quantity}
                              className="input"
                              min="0"
                              max={product.quantity}
                              style={{ padding: "0 0" }}
                            />
                            <button
                              type="button"
                              value="+"
                              className="plus"
                              onClick={() => editQuantity(1)}
                            >
                              <span>+</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex" style={{ marginTop: "5%" }}>
                        <div
                          className="full"
                          style={{ marginRight: "10%", marginLeft: "10%" }}
                          title="Back Home"
                        >
                          <Link to="/">
                            <ArrowBackIcon style={{ fontSize: "200%" }} />
                          </Link>
                        </div>
                        <div className="full">
                          <Link onClick={() => addToCart()} title="Add to Cart">
                            <AddShoppingCartIcon style={{ fontSize: "200%" }} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ======= Portfolio Section ======= */}
        <section
          id="portfolio"
          className="portfolio"
          style={{ marginTop: "5%" }}
        >
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>Other products</h2>
            </div>
            <Carousel interval={5000}>
              {productList.map((val, index) => (
                <Carousel.Item>
                  <div
                    className="row portfolio-container"
                    data-aos="fade-up"
                    data-aos-delay={400}
                  >
                    <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                      <div className="portfolio-wrap">
                        <img
                          src={val.imageThumb}
                          className="img-fluid"
                          alt=""
                        />
                        <div className="portfolio-info">
                          <h4>{val.name}</h4>
                          <p>{val.category.name}</p>
                          <div className="portfolio-links">
                            <a
                              href="https://tcorder.vn/wp-content/uploads/2021/05/quat-mini-cam-tay-ban-nhieu-tren-shopee-3.jpg"
                              data-gallery="portfolioGallery"
                              className="portfolio-lightbox"
                              title="App 1"
                            >
                              <i className="bx bx-plus" />
                            </a>
                            <a href="#" title="Add to Cart">
                              <i className="bi bi-plus" />
                            </a>
                            <a
                              onClick={() => reload(val.id)}
                              title="More Details"
                            >
                              <i className="bi bi-link-45deg" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </section>
        {/* End Portfolio Section */}
      </main>
      {/* End #main */}
    </>
  );
}
