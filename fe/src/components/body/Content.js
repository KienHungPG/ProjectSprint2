import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as service from '../service/Service';
import { toast } from 'react-toastify';

export function Content() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([])
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [type, setType] = useState("null");
  // const [searchName, setSearchName] = useState("");

  // const handleSearch = (value) => {
  //   setSearchName(value);
  // }


  // const submitSearch = async (searchName, type, page) => {
  //   let rs = await service.getAllProduct(searchName, type, page);
  //   setProductList(rs.data.content);
  // }

  const getAllProducts = async (type = 'null', page = 0) => {
    try {
      const rs = await service.getAllProduct(type, page)
      setProductList(() => [...productList, ...rs.data.content])
      setTotalPage(rs.data.totalPages)
      console.log(rs.data.totalPages);
    } catch (error) {
      navigate('/error')
    }

  }
  const getAllProductsNew = async (type = 'null', page = 0) => {
    const rs = await service.getAllProduct(type, page)
    setPage(0)
    setProductList(rs.data.content)
    setTotalPage(rs.data.totalPages)
    console.log(rs.data.totalPages);
  }
  const addCart = async (id) => {
    await service.createShoppingcart(id, 1)
    toast.success("Add to Cart successfully!!")
  }
  const loadMore = async () => {
    await getAllProducts(type, page + 1)
    setPage(page + 1);
  }
  const onclickType = async (type) => {
    if (type == 0) {
      setType("null")
      getAllProductsNew()
    } else if (type == 1) {
      setType("MEN'S WATCH")
      getAllProductsNew("MEN'S WATCH")
    } else if (type == 2) {
      setType("WOMEN'S WATCHES")
      getAllProductsNew("WOMEN'S WATCHES")
    } else if (type == 3) {
      setType("UNISEX WATCHES")
      getAllProductsNew("UNISEX WATCHES")
    }

  }
  useEffect(() => {
    document.title = "Home";
    getAllProducts();
  }, [])

if(productList.length == 0){
  return(
    <div>Loading</div>
  )
}

  return (
    <>
      <main id="main" className='container'>
        <section id="fan" className="portfolio row">
          <div className="container">
            <div className="section-title" style={{paddingTop: "10%"}} data-aos="fade-up">
              <h2>Featured Products</h2>
              <p>Choose your favorite products</p>
            </div>
            <div className="row" data-aos="fade-up" data-aos-delay={200}>
              {/* <div className='row d-flex'>
              <input onChange={(event) => handleSearch(event.target.value)} type="text" />
              <button onClick={() => submitSearch()} type="button" className="btn btn-in-list">Tìm
                                    kiếm
                                </button>
              </div> */}
              <div className="col-lg-12 d-flex justify-content-center">
                <ul id="portfolio-flters">
                  <li onClick={() => onclickType(0)}>All</li>
                  <li onClick={() => onclickType(1)}>MEN'S WATCH</li>
                  <li onClick={() => onclickType(2)}>WOMEN'S WATCHES</li>
                  <li onClick={() => onclickType(3)}>UNISEX WATCHES</li>
                </ul>
              </div>
            </div>
            <div
              className="row portfolio-container"
              data-aos="fade-up"
              data-aos-delay={400}
            >
              {productList.map((value, index) => (
                <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                  <div className="portfolio-wrap">
                    <img
                      src={value.imageThumb}
                      className="img-fluid"
                      alt=""
                    />
                    <div className="portfolio-info">
                      <h4>{value.name}</h4>
                      <h3 style={{ color: "white" }}>{value.price} $</h3>
                      <p>{value.category.name}</p>
                      {
                        value.quantity < 1 ?
                          <h4 style={{ color: "red" }}>Out of stock</h4> :
                          <></>
                    }

                      <div className="portfolio-links">
                        <a
                          href="https://tcorder.vn/wp-content/uploads/2021/05/quat-mini-cam-tay-ban-nhieu-tren-shopee-3.jpg"
                          data-gallery="portfolioGallery"
                          className="portfolio-lightbox"
                          title="App 1"
                        >
                          <i className="bx bx-plus" />
                        </a>
                        <a onClick={() => addCart(value)} title="Add to Cart">
                          <i className="bi bi-plus" />
                        </a>
                        <NavLink to={`/details/${value.id}`} title="More Details">
                          <i className="bi bi-link-45deg" />
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              ))}


            </div>
            {
              page < totalPage - 1 ? (
                <button onClick={() => loadMore()} className="load-more-button">Load More</button>

              ) : (<></>)
            }
          </div>
        </section>
        {/* End Portfolio Section */}
      </main>
      {/* End #main */}



    </>

  )
}