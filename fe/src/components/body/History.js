import * as service from '../service/Service';
import InfoIcon from '@mui/icons-material/Info';
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

Modal.setAppElement('#root'); // Thiết lập phần tử gốc của ứng dụng

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        height: '50%',
        backgroundColor: 'white',
        color: 'black',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    table: {
        color: 'black',
        fontWeight: "bold"
    }

};
export function History() {
    const navigate = useNavigate();
    const [bills, setBill] = useState([])
    const [billDetail, setBillDetail] = useState([])
    const getBill = async () => {
        try {
            const rs = (await service.getBills()).data
            await setBill(rs)
        } catch (error) {
            navigate('/')
        }

    }
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const detailBill = async (id) => {
        try {
            const rs = (await service.getBillDetail(id)).data
            await setBillDetail(rs)
        } catch (error) {
            if (error.response.status == 500) {
                toast.error("no content")
                // navigate('/error')
            }
        }
        openModal();
    }



    useEffect(() => {
        document.title = "History Order";
        window.scrollTo(0, 0)
        getBill()
    }, []);
    return (
        <>
            <main className="table" style={{ marginLeft: "8%", marginTop: "6%" }}>
                <section className="table__header" style={{ justifyContent: "center" }}>
                    <h1 >My order history</h1>
                </section>
                <section className="table__body">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    NO. <span className="icon-arrow">↑</span>
                                </th>
                                <th>
                                    Order Code <span className="icon-arrow">↑</span>
                                </th>

                                <th>
                                    Order Date <span className="icon-arrow">↑</span>
                                </th>
                                <th>
                                    Amount <span className="icon-arrow">↑</span>
                                </th>
                                <th style={{ textAlign: "center" }}>
                                    Status <span className="icon-arrow">↑</span>
                                </th>
                                <th>
                                    Detail <span className="icon-arrow">↑</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bills && bills.map((val, index) => (
                                    <tr key={index}>
                                        <td> {index + 1} </td>
                                        <td>
                                            {val.code}
                                        </td>
                                        <td> {val.createDate} </td>
                                        <td> {val.totalPrice} $</td>
                                        <td>
                                            {
                                                index % 3 == 0 ?
                                                    <p className="status shipped">Shipping</p>
                                                    :
                                                    <p className="status delivered">Delivered</p>


                                            }
                                        </td>
                                        <td >
                                            <a onClick={() => detailBill(val.id)}>
                                                <InfoIcon style={{ marginLeft: "8%", color: "blue" }} />
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </section>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Modal"
                >
                    <button onClick={closeModal} className='btn btn-danger' style={{ marginLeft: "92%" }}>Close</button>

                    <section className="table__body" style={customStyles.table}>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        NO. <span className="icon-arrow">↑</span>
                                    </th>
                                    <th>
                                        Product <span className="icon-arrow">↑</span>
                                    </th>
                                    <th>
                                        Product Type <span className="icon-arrow">↑</span>
                                    </th>
                                    <th>
                                        Price product <span className="icon-arrow">↑</span>
                                    </th>
                                    <th>
                                        Quantity <span className="icon-arrow">↑</span>
                                    </th>
                                    <th >
                                        Total Price <span className="icon-arrow">↑</span>
                                    </th>
                                    <th >
                                        <span className="icon-arrow">↑</span>
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    billDetail && billDetail.map((val, index) => (
                                        <tr key={index}>
                                            <td > {index + 1} </td>
                                            <td>
                                                <img src={val.products.image} alt="" />
                                                {val.products.name}
                                            </td>
                                            <td> {val.products.category.name} </td>
                                            <td> {val.products.price} $</td>
                                            <td> {val.quantity} </td>
                                            <td>
                                                {val.price} $
                                            </td>
                                            <td>
                                                <NavLink to={`/details/${val.products.id}`} >
                                                   Buy again
                                                </NavLink>
                                            </td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </section>
                </Modal>
            </main>

        </>
    )
}