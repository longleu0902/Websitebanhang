import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { Container } from 'reactstrap'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, message, Empty } from 'antd';
import CartChild from './Cart';
function CartProductFilter({ List, HandleAddProduct, numberWithCommas, size, setSize, handleClickSize, keywords }) {
    const navigate = useNavigate();
    const handleRedirectPage = (idProduct, type = 'product') => {
        navigate(`/${type}/${idProduct}`);
    }
    const params = useParams();
    // console.log("param", params)
    const samples = params.sample
    const CartList = [...List];
    const CartListFilter = CartList.filter((product) => product.sample == samples)
    // console.log(CartListFilter)
    return (
        <div className="CTN">
            <Row>
                {CartListFilter.map((product) => (
                    <CartChild product={product} HandleAddProduct={HandleAddProduct} numberWithCommas={numberWithCommas} handleClickSize={handleClickSize} size={size} />
                ))}
            </Row>
            {/* </Col> */}
            {/* </Row> */}
        </div>
    )
}
export default CartProductFilter;