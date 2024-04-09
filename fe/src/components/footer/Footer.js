import { toast } from 'react-toastify'
import '../header/header.css'
export function Footer() {
  const clickMe = () => {
    toast.success("Thask you so much")
  }
    return(
        <>
  {/* ======= Footer ======= */}
  <footer id="footer">
    <div className="container">
      <div className="row d-flex align-items-center">
        <div className="col-lg-6 text-lg-left text-center">
          <div className="copyright">
            © Copyright <strong>KWatch</strong>. All Rights Reserved
          </div>
        </div>
        <div className="col-lg-6">
          <nav className="footer-links text-lg-right text-center pt-2 pt-lg-0">
            <a href="/" className="scrollto">
              Home
            </a>
            <a href="#about" className="scrollto">
              About
            </a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </nav>
        </div>
      </div>
    </div>
  </footer>
  {/* End Footer */}
</>

    )
}