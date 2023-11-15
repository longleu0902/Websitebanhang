import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import { useParams } from 'react-router-dom';
function ShowCartProduct({ List, setList, Cart, setCart, HandleAddProduct, numberWithCommas }) {
    const contentStyle = {
        // margin: '24px 12px',
        height: '700px',
        color: '#fff',
        background: '#ccc'
    };
    const params = useParams();
    const [productDetail, setProductDetail] = useState(null);
    if (params.id) {
        const product = List.find(
            (element) => element.id == params.id
        )
        if (product !== undefined && productDetail == null) {
            setProductDetail({ ...product, size: "S", color: "Trắng" });
        }
    }
    const handleChange = (key, value) => {
        setProductDetail({ ...productDetail, [key]: value })
    }
    // console.log(productDetail)
    return (
        <div className="BTN">
            <div className="showprodcut">
                <div className="showproduct-img">
                    <Carousel autoplay>
                        <div>
                            <h3 style={contentStyle}>
                                <img style={{ width: '100%', height: '100%', backgroundSize: 'cover' }} src={productDetail?.img}></img>
                            </h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>
                                <img style={{ width: '100%', height: '100%', backgroundSize: 'cover' }} src='https://ressmedia.com/wp-content/uploads/2021/07/LVN_5569-768x768.jpg '></img>
                            </h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>
                                <img style={{ width: '100%', height: '100%', backgroundSize: 'cover' }} src='https://cf.shopee.vn/file/da9692b78e73e57c0ade2b3237074791'></img>
                            </h3>
                        </div>
                    </Carousel>

                </div>
                <div className="showproduct-info">
                    <div style={{ whiteSpace: "pre-wrap", textOverflow: "ellipsis", with: '50px' }}>
                        <h1 className='square-font' style={{ margin: "24px 0 40px 0", }}>{productDetail?.title}</h1>
                    </div>
                    <span style={{ fontSize: 30, color: "#eb6e6e" }}>{productDetail !== null ? numberWithCommas(productDetail.price) : ''}đ</span>
                    <div className="showproduct-info-color">
                        <p>Màu sắc</p>
                        <button onClick={() => handleChange("color", "Đen")} style={{background:"Đen"===productDetail?.color?'rgb(235 235 235)':'',outline: 'none' }} className="showproduct-btn">Đen</button>
                        <button onClick={() => handleChange("color", "Trắng")} style={{background:"Trắng"===productDetail?.color?'rgb(235 235 235)':'' ,outline: 'none' }} className="showproduct-btn">Trắng</button>
                        <button onClick={() => handleChange("color", "Hồng")} style={{ background:"Hồng"===productDetail?.color?'rgb(235 235 235)':'',outline: 'none' }} className="showproduct-btn">Hồng</button>
                    </div>
                    <div className="showproduct-info-size">
                        <p>Kích cỡ</p>
                        <button onClick={() => handleChange("size", "S")} style={{background:"S"===productDetail?.size?'rgb(235 235 235)':'' ,outline: 'none' }} className="showproduct-btn">S</button>
                        <button onClick={() => handleChange("size", "L")} style={{background:"L"===productDetail?.size?'rgb(235 235 235)':''  ,outline: 'none' }} className="showproduct-btn">L</button>
                        <button onClick={() => handleChange("size", "XL")} style={{background:"XL"===productDetail?.size?'rgb(235 235 235)':''  ,outline: 'none' }} className="showproduct-btn">XL</button>
                        <button onClick={() => handleChange("size", "XXL")} style={{background:"XXL"===productDetail?.size?'rgb(235 235 235)':''  ,outline: 'none' }} className="showproduct-btn">XXL</button>
                    </div>
                    <div className="showproduct-info-guide">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                        </svg>
                        <span style={{ fontSize: 12, textDecoration: "underline", marginLeft: '12px' }}>
                            Hướng dẫn chọn kích cỡ
                        </span>
                        <div className="guide">
                            <div className="guide-title">
                                <span>Gợi ý kích cỡ</span>
                            </div>
                            <div className="guid-item">
                                <img
                                    className="guid-item-img"
                                    src="https://lamphongchina.com/wp-content/uploads/2016/04/size-quan-ao-1.jpg?fbclid=IwAR2dTs51fxWD87TIqoXWW0ZB3QGwGvwka0luP0Jk_WdakP3q-LuD-xEwL5s"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <button onClick={() => HandleAddProduct(productDetail)} className='btn-pay' style={{ padding: '16px 24px', margin: '0' }}>Thêm vào giỏ hàng</button>
                    <div style={{ margin: '24px 0px', color: '#ccc' }} >
                        Lưu ý: <br></br>
                        <br></br>
                        Giá sản phẩm đã bao gồm VAT, không bao gồm phí giao hàng.<br></br>Thời gian giao
                        hàng dự kiến 3-7 ngày làm việc. Mọi thắc mắc<br></br>vui lòng xem thêm tại trang
                        Dịch vụ khách hàng.
                    </div>
                </div>
            </div>


        </div>
    )
}
export default ShowCartProduct;