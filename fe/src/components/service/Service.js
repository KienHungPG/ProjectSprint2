import axios from "axios";
const token = localStorage.getItem('token');
export const getAllProduct = async (name, page) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/product?name=${name}&page=${page}`);
        return res;
    } catch (e) {
        console.log(e)
        return e
    }
}

export const getDetailProduct = async (id) => {
        const res = await axios.get(`http://localhost:8080/api/product/detail/${id}`
        );
        return res;
}
export const getImage = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/images/${id}`
         
        );
        return res.data;
    } catch (e) {
        console.log(e)
        return e
    }
}
export const getShoppingcart = async () => {

    if (token != null) {
        const res = await axios.get(`http://localhost:8080/api/shopping`
            ,
            {

                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return res.data;
    } else {
        const res = await axios.get(`http://localhost:8080/api/shopping`, { withCredentials: true })
        return res.data;
    }
}
export const getBills = async () => {

    if (token != null) {
        const res = await axios.get(`http://localhost:8080/api/order`
            ,
            {

                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return res;
    } 
}
export const getCustomers = async () => {
    if (token != null) {
        const res = await axios.get(`http://localhost:8080/api/customer`
            ,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return res;
    } 
}
export const getBillDetail = async (id) => {

    if (token != null) {
        const res = await axios.get(`http://localhost:8080/api/order/detail?id=${id}`
            ,
            {

                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return res;
    } 
}
export const createOrder = async () => {

    if (token != null) {
        const res = await axios.post('http://localhost:8080/api/order',""
            ,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return res;
    }
}
export const setShoppingcart = async (index, id, product) => {
    try {
        if (token != null) {
            const res = await axios.post(`http://localhost:8080/api/shopping/${index}/${id}`,""
                ,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                    ,{ withCredentials: true }
            );
            return res.data;
        } else {
            const res = await axios.post(`http://localhost:8080/api/shopping/${index}/` + product.id,"", { withCredentials: true }
            );
            return res.data;
        }

    } catch (e) {
        console.log(e)
        return e
    }
}
export const createShoppingcart = async (idProduct, quantity) => {
    const newValue = {
        quantity: quantity,
        products: idProduct
    }
    const id = idProduct.id;
    try {
        if (token) {
            const res = await axios.post(`http://localhost:8080/api/shopping/create/${id}/${quantity}`,"",
                
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
            );
            return res.data;
        } else {
            const res = await axios.post("http://localhost:8080/api/shopping", newValue,
                { withCredentials: true })
            return res.data;
        }

    } catch (e) {
        console.log(e)
        return e
    }
}
export const deleteShoppingcart = async (id, idP) => {
    try {
        if (token != null) {
            const res = await axios.delete(`http://localhost:8080/api/shopping/delete/${id}`
                ,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
            );
            return res.data;
        } else {
            const res = await axios.delete(`http://localhost:8080/api/shopping/deleteSession/` + idP, { withCredentials: true })
            return res.data;
        }

    } catch (e) {
        console.log(e)
        return e
    }
}