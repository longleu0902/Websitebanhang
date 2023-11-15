import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { Container } from 'reactstrap'
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, message, Empty } from 'antd';
const CartChild = ({product,HandleAddProduct,numberWithCommas,handleClickSize,size}) => {
    const navigate = useNavigate();
    const handleRedirectPage = (idProduct, type = 'product') => {
        navigate(`/${type}/${idProduct}`);
    }

    const [productTemp,setProductTemp] = useState({...product,size:'S',color:'Trắng'})
    const handleChange = (key,value) => {
        setProductTemp({...productTemp,[key]:value})
        
    }
    return(
        <Col
        xl={6}
        lg={8}
        md={12}
        sm={24}
        style={{ padding: '8px' }}
        key={product.id}
    >
        <div onDoubleClick={() => handleRedirectPage(product.id)} className="product">
            {/* <div > */}
            <img
                className="product-img"
                src={product.img}
            />
            <div className="product-name_price">
                <div style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    cursor: "pointer",
                    fontFamily: 'Poppins',
                    width: '265px',
                    textAlign: 'center'

                }}>
                    <h5 style={{
                        fontSize: '16px',
                        color: "#595656",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                        fontFamily: 'Poppins',
                    }}
                    >{product.title}</h5>
                </div>

                <span style={{ color: "#000" }}>{numberWithCommas(product.price)}đ</span>
            </div>
            {/* </div> */}

            <div className='product-hover'>
                <img
                    className="product-img"
                    src={product.img}
                />
                <div className="product-name_price">
                    <div className='product-btn-color'>
                        <button onClick={()=> handleChange("color","Đen")} style={{border:"Đen"=== productTemp.color?'3px solid #ccc':'',outline:'none',backgroundColor:'rgb(96,96,96)'}}  className='btn-color'></button>
                        <button onClick={()=> handleChange("color","Hồng")}  style={{border:"Hồng"=== productTemp.color?'3px solid #ccc':'',outline:'none', backgroundColor:'#FFE4E1'}}  className='btn-color'></button>
                        <button onClick={()=> handleChange("color","Trắng")}  style={{border:"Trắng"=== productTemp.color?'3px solid #ccc':'',outline:'none',backgroundColor:'rgb(252 252 247)'}}  className='btn-color'></button>
                    </div>
                    <div className='Size'>
                        <button onClick={() => handleChange("size",'S')} style={{ backgroundColor: "S" === productTemp.size ? 'rgb(240 240 240)' : '#fff', outline: 'none' }} className='size-item'>S</button>
                        <button onClick={() => handleChange("size",'L')} style={{ backgroundColor: "L" === productTemp.size ? 'rgb(240 240 240)' : '#fff', outline: 'none' }} className='size-item'>L</button>
                        <button onClick={() => handleChange("size",'XL')} style={{ backgroundColor: "XL" === productTemp.size ? 'rgb(240 240 240)' : '#fff', outline: 'none' }} className='size-item'>XL</button>
                        <button onClick={() => handleChange("size",'XXL')} style={{ backgroundColor: "XXL" === productTemp.size ? 'rgb(240 240 240)' : '#fff', outline: 'none' }} className='size-item'>XXL</button>
                    </div>
                    <span style={{ color: "#000" }}>{numberWithCommas(product.price)}đ</span>
                </div>
                <div className="product-buy">
                    <button
                        style={{ width: '100%', backgroundColor: '#000' }}
                        onClick={() => HandleAddProduct(productTemp)}
                        type="button"
                        className="btn btn-secondary">
                        Add to cart
                    </button>
                </div>

            </div>
        </div>
    </Col>

    )

}
export default CartChild;