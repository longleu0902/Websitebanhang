import React, { useState, useEffect } from 'react';
import { Row, Col, Table } from 'reactstrap';
import { db } from '../firebase-config';
import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { CheckCircleOutlined, CloseCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const Dashboard = () => {
    const [lists, setLists] = useState([]);
    const [users, setUsers] = useState([])
    const [cartSuccess, setSuccess] = useState([]);
    const [cartCancel, setCartCancel] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [giaTriKho, setGiaTriKho] = useState(0);
    const [cartSuccessFilter, setCartSuccessFilter] = useState('')
    const [cartCancelFilter ,setCartCancelFilter] = useState('')
    const { Search } = Input;
    const getCartSuccess = async () => {
        const userRef = await getDocs(collection(db, 'Delivered'))
        const dataUserRef = userRef.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setSuccess(dataUserRef)
    }
    const getCartCancel = async () => {
        const userRef = await getDocs(collection(db, 'NotDelivered'))
        const dataUserRef = userRef.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setCartCancel(dataUserRef)
    }
    const getLists = async () => {
        const userRef = await getDocs(collection(db, 'Lists'))
        const dataUserRef = userRef.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setLists(dataUserRef)
    }
    const getUsers = async () => {
        const userRef = await getDocs(collection(db, 'Users'))
        const dataUserRef = userRef.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUsers(dataUserRef)
    }
    useEffect(() => {
        getCartSuccess();
        getCartCancel();
        getLists();
        getUsers();
    }, [])
    const tinhtongtien = () => {
        let tong = cartSuccess.reduce(function (a, b) {
            return Number(a) + Number(b.price) * Number(b.amount)
        }, 0)
        setRevenue(tong)
    }
    const giatrikho = () => {
        let tong = lists.reduce(function (a, b) {
            return Number(a) + Number(b.price) * Number(b.amount)
        }, 0)
        setGiaTriKho(tong)

    }
    useEffect(() => {
        tinhtongtien();
        giatrikho();
    })
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const deleteDelivered = async (id) => {
        const cartDelivered = cartSuccess.filter((item) => item.id !== id)
        setSuccess([...cartDelivered])
        const productDoc = doc(db, "Delivered", id);
        await deleteDoc(productDoc);
    }
    const deleteCartCancel = async (id) => {
        const CART_CANCEL = cartCancel.filter((item) => item.id !== id)
        setCartCancel([...CART_CANCEL])
        const productDoc = doc(db, "NotDelivered", id);
        await deleteDoc(productDoc);
    }
    return (
        <>
            <Row>
                <Col>
                    <div className='dashboard-item'>
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="pay-circle" width="40px" height="40px" fill="#33cc33" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm159.6-585h-59.5c-3 0-5.8 1.7-7.1 4.4l-90.6 180H511l-90.6-180a8 8 0 00-7.1-4.4h-60.7c-1.3 0-2.6.3-3.8 1-3.9 2.1-5.3 7-3.2 10.9L457 515.7h-61.4c-4.4 0-8 3.6-8 8v29.9c0 4.4 3.6 8 8 8h81.7V603h-81.7c-4.4 0-8 3.6-8 8v29.9c0 4.4 3.6 8 8 8h81.7V717c0 4.4 3.6 8 8 8h54.3c4.4 0 8-3.6 8-8v-68.1h82c4.4 0 8-3.6 8-8V611c0-4.4-3.6-8-8-8h-82v-41.5h82c4.4 0 8-3.6 8-8v-29.9c0-4.4-3.6-8-8-8h-62l111.1-204.8c.6-1.2 1-2.5 1-3.8-.1-4.4-3.7-8-8.1-8z"></path>
                            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm159.6-585h-59.5c-3 0-5.8 1.7-7.1 4.4l-90.6 180H511l-90.6-180a8 8 0 00-7.1-4.4h-60.7c-1.3 0-2.6.3-3.8 1-3.9 2.1-5.3 7-3.2 10.9L457 515.7h-61.4c-4.4 0-8 3.6-8 8v29.9c0 4.4 3.6 8 8 8h81.7V603h-81.7c-4.4 0-8 3.6-8 8v29.9c0 4.4 3.6 8 8 8h81.7V717c0 4.4 3.6 8 8 8h54.3c4.4 0 8-3.6 8-8v-68.1h82c4.4 0 8-3.6 8-8V611c0-4.4-3.6-8-8-8h-82v-41.5h82c4.4 0 8-3.6 8-8v-29.9c0-4.4-3.6-8-8-8h-62l111.1-204.8c.6-1.2 1-2.5 1-3.8-.1-4.4-3.7-8-8.1-8z"></path>
                        </svg>
                        <div className='dashboard-item-title'>
                            <p style={{ fontSize: '20px', fontWeight: 500 }}>Doanh Thu</p>
                            <p style={{ fontSize: '20px', fontWeight: 500 }}>{numberWithCommas(revenue)}đ</p>
                        </div>
                    </div>

                </Col>
                <Col>
                    <div className='dashboard-item'>
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="team" width="40px" height="40px" fill="#3399Ff" aria-hidden="true">
                            <path d="M824.2 699.9a301.55 301.55 0 00-86.4-60.4C783.1 602.8 812 546.8 812 484c0-110.8-92.4-201.7-203.2-200-109.1 1.7-197 90.6-197 200 0 62.8 29 118.8 74.2 155.5a300.95 300.95 0 00-86.4 60.4C345 754.6 314 826.8 312 903.8a8 8 0 008 8.2h56c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5A226.62 226.62 0 01612 684c60.9 0 118.2 23.7 161.3 66.8C814.5 792 838 846.3 840 904.3c.1 4.3 3.7 7.7 8 7.7h56a8 8 0 008-8.2c-2-77-33-149.2-87.8-203.9zM612 612c-34.2 0-66.4-13.3-90.5-37.5a126.86 126.86 0 01-37.5-91.8c.3-32.8 13.4-64.5 36.3-88 24-24.6 56.1-38.3 90.4-38.7 33.9-.3 66.8 12.9 91 36.6 24.8 24.3 38.4 56.8 38.4 91.4 0 34.2-13.3 66.3-37.5 90.5A127.3 127.3 0 01612 612zM361.5 510.4c-.9-8.7-1.4-17.5-1.4-26.4 0-15.9 1.5-31.4 4.3-46.5.7-3.6-1.2-7.3-4.5-8.8-13.6-6.1-26.1-14.5-36.9-25.1a127.54 127.54 0 01-38.7-95.4c.9-32.1 13.8-62.6 36.3-85.6 24.7-25.3 57.9-39.1 93.2-38.7 31.9.3 62.7 12.6 86 34.4 7.9 7.4 14.7 15.6 20.4 24.4 2 3.1 5.9 4.4 9.3 3.2 17.6-6.1 36.2-10.4 55.3-12.4 5.6-.6 8.8-6.6 6.3-11.6-32.5-64.3-98.9-108.7-175.7-109.9-110.9-1.7-203.3 89.2-203.3 199.9 0 62.8 28.9 118.8 74.2 155.5-31.8 14.7-61.1 35-86.5 60.4-54.8 54.7-85.8 126.9-87.8 204a8 8 0 008 8.2h56.1c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5 29.4-29.4 65.4-49.8 104.7-59.7 3.9-1 6.5-4.7 6-8.7z">
                            </path>
                        </svg>
                        <div className='dashboard-item-title'>
                            <p style={{ fontSize: '20px', fontWeight: 500 }}>Người dùng</p>
                            <p style={{ fontSize: '17px', fontWeight: 500 }}>{users.length} người</p>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className='dashboard-item'>
                        <CheckCircleOutlined style={{ fontSize: '40px', marginBottom: '40px', color: '#cc99ff' }} />
                        <div className='dashboard-item-title'>
                            <p style={{ fontSize: '20px', fontWeight: 500 }}>Đã giao</p>
                            <p style={{ fontSize: '17px', fontWeight: 500 }}>{cartSuccess.length} đơn</p>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className='dashboard-item'>
                        <svg viewBox="0 0 1024 1024" focusable="false" data-icon="shopping-cart" width="40px" height="40px" fill="#ff6666" aria-hidden="true"><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 00-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 100 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 00-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 00-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 00-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 00-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 01-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 01-31.6 31.6z"></path></svg>
                        <div className='dashboard-item-title'>
                            <p style={{ fontSize: '20px', fontWeight: 500 }}>Kho hàng</p>
                            <p style={{ fontSize: '17px', fontWeight: 500 }}>{lists.length} sản phẩm</p>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row xs={2} style={{ marginTop: '30px' }}>
                <Col xs={8} >
                    <div className='body-chart'>
                        <div className="chart">
                            <div className="bar" style={{ height: "80%" }} ><span style={{color:'#fff',margin:'12px 10px',fontWeight:700}}>Thứ 2</span></div>
                            <div className="bar" style={{ height: "60%" }} ><span style={{color:'#fff',margin:'12px 10px',fontWeight:700}}>Thứ 3</span></div>
                            <div className="bar" style={{ height: "40%" }} ><span style={{color:'#fff',margin:'12px 10px',fontWeight:700}}>Thứ 4</span></div>
                            <div className="bar" style={{ height: "20%" }} ><span style={{color:'#fff',margin:'12px 10px',fontWeight:700}}>Thứ 5</span></div>
                            <div className="bar" style={{ height: "60%" }} ><span style={{color:'#fff',margin:'12px 10px',fontWeight:700}}>Thứ 6</span></div>
                            <div className="bar" style={{ height: "90%" }} ><span style={{color:'#fff',margin:'12px 10px',fontWeight:700}}>Thứ 7</span></div>
                            <div className="bar" style={{ height: "30%" }} ><span style={{color:'#fff',margin:'12px 10px',fontWeight:700}}>CN</span></div>
                        </div>
                    </div>
                </Col>
                <Col xs={2} >
                    <div style={{ width: 368 }} className='dashboard-item'>
                        <CloseCircleOutlined style={{ fontSize: '40px', marginBottom: '40px', color: 'red' }} />
                        <div className='dashboard-item-title'>
                            <p style={{ fontSize: '20px', fontWeight: 500 }}>Đã huỷ</p>
                            <p style={{ fontSize: '17px', fontWeight: 500 }}>{cartCancel.length} đơn </p>
                        </div>
                    </div>
                    <div style={{ width: 368, marginTop: 20 }} className='dashboard-item'>
                        <DollarOutlined style={{ fontSize: '40px', marginBottom: '40px', color: '#cc99ff' }} />
                        <div className='dashboard-item-title'>
                            <p style={{ fontSize: '20px', fontWeight: 500 }}>Giá trị kho</p>
                            <p style={{ fontSize: '20px', fontWeight: 500 }}>{numberWithCommas(giaTriKho)}đ</p>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row style={{ marginTop: '30px' }}>
                <Col>
                    <h3 style={{ color: 'red', margin: '0px 4px' }}>Danh sách huỷ</h3>
                    <Search onChange={(e) => setCartCancelFilter(e.target.value)} style={{ margin:'12px 0px' }} placeholder="Tìm số người mua" enterButton />
                    <div style={{ height: "300px", overflow: 'scroll' }}>
                        <Table
                            hover
                        >
                            <thead>
                                <tr>
                                    <th>
                                        Tên sản phẩm
                                    </th>
                                    <th>
                                        Người mua
                                    </th>
                                    <th>
                                        Số tiền
                                    </th>
                                    <th style={{width:'20%'}} >
                                        Số điện thoại
                                    </th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartCancel.filter((product) => product.phone.includes(cartCancelFilter)).map((product) => (
                                    <tr>
                                        <th scope="row">
                                            {product.title}
                                        </th>
                                        <td>
                                            {product.userName}
                                        </td>
                                        <td>
                                            {product.price}
                                        </td>
                                        <td style={{ width: '25%' }}>
                                            {product.phone}
                                        </td>
                                        <td>
                                            <button onClick={()=>deleteCartCancel(product.id)} type="submit" style={{ border: 'none', backgroundColor: '#000', color: '#fff' }}>Delete</button>
                                        </td>
                                    </tr>

                                ))}

                            </tbody>
                        </Table>
                    </div>
                </Col>
                <Col>
                    <h3 style={{ color: 'green', margin: '0px 4px' }}>Danh sách giao thành công</h3>
                    <Search onChange={(e) => setCartSuccessFilter(e.target.value)} style={{ margin:'12px 0px' }} placeholder="Tìm số người mua" enterButton />
                    <div style={{ height: "300px", overflow: 'scroll' }}>
                        <Table
                            hover
                        >
                            <thead>
                                <tr>
                                    <th>
                                        Tên sản phẩm
                                    </th>
                                    <th>
                                        Người mua
                                    </th>
                                    <th>
                                        Số tiền
                                    </th>
                                    <th style={{width:'25%'}}>
                                        Số điện thoại
                                    </th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartSuccess.filter((product) => product.phone.includes(cartSuccessFilter)).map((product) => (
                                    <tr>
                                        <th scope="row">
                                            {product.title}
                                        </th>
                                        <td>
                                            {product.userName}
                                        </td>
                                        <td>
                                            {product.price}
                                        </td>
                                        <td style={{ width: '20%' }}>
                                            {product.phone}
                                        </td>
                                        <td>
                                            <button onClick={()=>deleteDelivered(product.id)} type="submit" style={{ border: 'none', backgroundColor: '#000', color: '#fff' }}>Delete</button>
                                        </td>
                                    </tr>

                                ))}

                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </>


    )
}
export default Dashboard;