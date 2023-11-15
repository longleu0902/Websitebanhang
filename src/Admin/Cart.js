import React from 'react';
import { Table, Search } from "reactstrap";
import { db } from "../firebase-config";
import { addDoc, collection, doc, deleteDoc, updateDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { Input, Space } from 'antd';

export const Cart = () => {
    const [cartList, setCartList] = useState([]);
    const [tongtien, setTongTien] = useState(0);
    const [userFilter, setUserFilter] = useState('')
    const { Search } = Input;
    const getCart = async () => {
        const userRef = await getDocs(collection(db, 'Cart'))
        const dataCart = userRef.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setCartList(dataCart)
    }
    useEffect(() => {
        getCart();
    }, [])
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    const delivered = async (id, product) => {
        const cartDelivered = cartList.filter((item) => item.id !== id)
        setCartList([...cartDelivered])
        const proIdx = cartList.findIndex(it => it.id === product.id && it.size == product.size && it.color == product.color)
        const tempCartList = {...cartList[proIdx]}
        try{
        const docRef = await addDoc(collection(db, "Delivered"), tempCartList);
        }catch(err){

        }
        const productDoc = doc(db, "Cart", id);
        await deleteDoc(productDoc);
    }
    const cancelCart = async (id, product) => {
        const cartDelivered = cartList.filter((item) => item.id !== id)
        setCartList([...cartDelivered])
        const proIdx = cartList.findIndex(it => it.id === product.id && it.size == product.size && it.color == product.color)
        const tempCartList = {...cartList[proIdx]}
        try{
        const docRef = await addDoc(collection(db, "NotDelivered"), tempCartList);
        }catch(err){

        }
        const productDoc = doc(db, "Cart", id);
        await deleteDoc(productDoc);
    }

    return (
        <div>
            <Search onChange={(e) => setUserFilter(e.target.value)} style={{ marginBottom: '30px' }} placeholder="Tìm theo số điện thoại" enterButton />
            <div style={{ height: "700px", overflow: 'scroll' }}>
                <Table
                    hover
                >
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>
                                Ảnh
                            </th>
                            <th style={{width:'5%'}}>
                                Mã đơn hàng
                            </th>
                            <th style={{ width: '15%' }}>
                                Tên sản phẩm
                            </th>
                            <th style={{ width: '10%' }}>
                                Số lượng
                            </th>
                            <th>
                                Người mua
                            </th>
                            <th style={{ width: '15%' }}>
                                Địa chỉ
                            </th>
                            <th style={{ width: '10%' }}>
                                Số điện thoại
                            </th>
                            <th>
                                Số tiền
                            </th>
                            <th>

                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    {cartList.filter((product) => product.phone.includes(userFilter)).map((product) => (
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <img style={{ width: '50px', height: "50px" }} src={product.img} />
                                </th>
                                <td>
                                    {product.id}
                                </td>
                                <td>
                                    <p>{product.title} </p>
                                    <p style={{ color: 'red' }}>{product.color},{product.size}</p>
                                </td>
                                <td style={{ width: '7%' }}>
                                    {product.amount}
                                </td>
                                <td>
                                    {product.userName}
                                </td>
                                <td>
                                    {product.Adress}

                                </td>
                                <td>
                                    {product.phone}
                                </td>
                                <td style={{ color: 'red' }}>
                                    {numberWithCommas(Number(product.price) * Number(product.amount))}
                                </td>
                                <td>
                                    <button onClick={() => delivered(product.id, product)} type="submit" style={{ border: 'none', backgroundColor: '#rgb(51, 204, 51)', color: '#33cc33' }}>Đã giao</button>
                                </td>
                                <td>
                                    <button onClick={() => cancelCart(product.id, product)} type="submit" style={{ border: 'none', backgroundColor: '#rgb(51, 204, 51)', color: 'red' }}>Đã huỷ</button>
                                </td>
                            </tr>
                        </tbody>

                    ))}

                </Table>
            </div>
        </div>
    )
}
