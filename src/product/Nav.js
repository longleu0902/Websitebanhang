import react, { useEffect } from 'react'
import { Route, Routes, NavLink, BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import { Empty, Input, Space, message } from 'antd';
import AuthFormLogin from './AuthForm';
import AuthFormSignUp from './AuthFormSignUp';
import { useState } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { db } from '../firebase-config';
import { auth } from "../firebase-config"
import SearchFilter from './SearchFilter';
import UserLogin from '../Admin/UserLogin';
import { getDoc, getDocs, collection, query, where } from 'firebase/firestore';
function Nav({ Cart, setCart, soluong, removeProduct, removeAllProdcut, numberWithCommas, size, setSize, getKeywords, keywords, List }) {
  const CartList = [...Cart];
  // setCart([...Cart,CartList])
  const navigate = useNavigate();
  const location = useLocation();
  const hanldeShowCart = () => {
    navigate('/giohang')
  }
  const hanldeShowProductFilter = (type) => {
    navigate(`/filter/${type}`)
  }

  // console.log('location: ', location)
  const styleNava = {
    color: location.pathname.includes('/product') || location.pathname.includes('/giohang') ? '#fff' : '#000'
  }
  const styleNavaicon = {
    color: location.pathname.includes('/product') || location.pathname.includes('/giohang') ? '#fff' : '#000',
    margin: 10,
    fontSize: '25px'

  }
  const [isOpenForm, setIsOpenForm] = useState(false)
  const hanldeOpenForm = () => {
    setIsOpenForm(prev => !prev)
  }
  const [isOpenFormSignup, setIsOpenFormSignup] = useState(false)
  const hanldeOpenSignup = () => {
    setIsOpenFormSignup(prev => !prev)
  }
  const { Search } = Input;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );
  //auth
  const [userData, setUserData] = useState('')
  const [userLogin, setUserLogin] = useState('');
  const [userNameLogin, setUserNameLogin] = useState('');
  const [userPasswordLogin, setUserPasswordLogin] = useState('')
  const [notify, setNotify] = useState(false)
  const getUserData = async () => {
    const data = await getDocs(collection(db, 'Users'));
    const dataUser = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setUserData(dataUser);
  }
  useEffect(() => {
    getUserData()
  }, [])
  const handleLoginUser = () => {
    const Login = {
      name: userNameLogin,
      Password: userPasswordLogin,
      photo: 'https://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png'
    }
    for (let e of userData) {
      if (e.userName == Login.name && e.Password == Login.Password) {
        setUserLogin(Login);
        break;
      } else {
        setNotify(true)
      }
    }
  }
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // console.log("Đăng nhập thành công:", user);
      const userID = await auth.currentUser;
      if (userID) {
        // Lấy thông tin của người dùng
        const AD = [
          {
            name: userID.displayName,
            email: userID.email,
            uid: userID.uid,
            photo: user.photoURL,
          }
        ]
        setUserLogin(...AD);
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };
  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Đăng nhập thành công:", user);
      const userID = await auth.currentUser;
      if (userID) {
        // Lấy thông tin của người dùng
        const AD = [
          {
            name: userID.displayName,
            email: userID.email,
            uid: userID.uid,
            photo: user.photoURL,
          }
        ]
        setUserLogin(...AD);
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  }
  useEffect(() => {
    if (userLogin != '') {
      localStorage.setItem('UserLogin', JSON.stringify(userLogin))
    }
  }, [userLogin])
  useEffect(() => {
    const UserLoginLocalStorage = JSON.parse(localStorage.getItem('UserLogin'))
    if (UserLoginLocalStorage?.name && UserLoginLocalStorage?.email && UserLoginLocalStorage?.photo) {
      setUserLogin(...[UserLoginLocalStorage])
      console.log(UserLoginLocalStorage)
    } else if (UserLoginLocalStorage?.name) {
      setUserLogin(...[UserLoginLocalStorage])
    }
  }, [])
  // console.log("Thông tin người dùng", userLogin)
  const handleLogOut = () => {
    setUserLogin('');
    localStorage.removeItem('UserLogin');
  }
  return (
    <div className="Nav" style={{
      position: location.pathname.includes('/product') || location.pathname.includes('/giohang') ? 'static' : 'fixed',
      background: location.pathname.includes('/product') || location.pathname.includes('/giohang') ? '#000' : '#fff',
      height: location.pathname.includes('/product') || location.pathname.includes('/giohang') ? '' : '50px',
    }}>
      <div className="nav-logo">
        <div style={{
          display: location.pathname.includes('/giohang') ? 'block' : 'none'
        }} className='nav-login'>
          {userLogin == '' ? '' : (
            <img style={{ marginBottom: '8px' }} className='img-login' src={userLogin.photo} />
          )}
          {userLogin == '' ? (
            <>
              <span className='AuthFromLogin' style={styleNava} onClick={hanldeOpenForm}>Login</span>
              {isOpenForm && <AuthFormSignUp notify={notify} handleLoginUser={handleLoginUser} setUserPasswordLogin={setUserPasswordLogin} setUserNameLogin={setUserNameLogin} hanldeOpenForm={hanldeOpenForm} handleFacebookLogin={handleFacebookLogin} handleGoogleLogin={handleGoogleLogin} />}
              <span style={styleNava} onClick={hanldeOpenSignup}>SignUp</span>
              {isOpenFormSignup && <AuthFormLogin hanldeOpenSignup={hanldeOpenSignup} />}
            </>
          ) : (
            <span className='nav-user-login'>
              <span style={styleNava} onClick={hanldeOpenForm}>{userLogin.name}</span>
              <div className='nav-user-login-item'>
                <p>Setting</p>
                <p onClick={handleLogOut}>LogOut</p>
              </div>
            </span>
          )}
        </div>
        <div style={{
          display: location.pathname.includes('/filter') || location.pathname.includes('/product') || location.pathname.includes('/giohang') ? 'none' : 'block'
        }} className='nav-input-search'>
          <div className='search-hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <div className='search-show'>
              <Space direction="vertical">
                <Search
                  placeholder=" Search "
                  onChange={getKeywords}
                  style={{
                    width: 200,
                  }}
                />
                {keywords != '' ? (
                  <div className='search-filter'>
                    <SearchFilter List={List} keywords={keywords} />
                  </div>
                ) : ''}
              </Space>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-item">
        <NavLink to='/'>
          <a className='nav-active' style={styleNava} href="/#">Home</a>
        </NavLink>
        <a className='nav-active' style={styleNava} href="#aboutus">About Us</a>
        <a className='nav-active' style={styleNava} href="#contact">Contact</a>
        <a className='nav-more' style={styleNava} href="#">
          <div className='nav-more-item'>
            <div onClick={() => hanldeShowProductFilter('váy')} className='nav-more-item-option'>Váy thời trang</div>
            <div onClick={() => hanldeShowProductFilter('đầm')} className='nav-more-item-option' >Đầm thời trang</div>
            <div onClick={() => hanldeShowProductFilter('set')} className='nav-more-item-option' >Các set thời trang</div>
            <div onClick={() => hanldeShowProductFilter('áo')} className='nav-more-item-option' >Các mẫu áo</div>
          </div>
          More
        </a>
        <i style={styleNavaicon} className="fas fa-shopping-bag cart">
          <ul style={{ paddingLeft: 0 }} className="cart-item">
            <div style={{ textAlign: 'center' }}>
              <a style={{ color: "#000", fontFamily: 'Poppins', padding: '12px 12px' }}>Đơn hàng đã chọn</a>
              <hr style={{ borderStyle: "dashed ", margin: '6px 12px' }}></hr>
            </div>
            <div style={{ height: "370px", overflowY: 'scroll' }}>
              {CartList == '' ? (<Empty description={false} />) : ''}
              {CartList.map((product) => (
                <li>
                  <a href="#">
                    <div className="cart-list">
                      <div
                        className="cart-product-img"
                        style={{
                          backgroundImage:
                            `url(${product.img})`,
                          height: '150px',
                          width: "30%",
                          backgroundSize: "cover",
                          backgroundPosition: 'center'
                        }}
                      ></div>
                      <div onClick={hanldeShowCart} className='cart-list-info'>
                        <span style={{ width: "300px", fontSize: "15px", height: '25px', margin: '0px 0px', fontFamily: 'Poppins' }}>
                          {product.title}
                        </span>
                        <div><span style={{ fontSize: '12px' }}>Size: {product?.size}</span></div>
                        <div><span style={{ fontSize: '12px' }}>Màu: {product?.color}</span></div>
                        <div><span style={{ fontSize: '12px' }} >Số lượng: {product.amount}</span> </div>
                        <span style={{ color: "#000", fontSize: '15px' }}>{numberWithCommas(product.price)}đ</span>
                      </div>
                      <button className='btn-xoa'
                        style={{
                          fontSize: 12,
                          padding: "0 12px",
                          color: '#000',
                          border: 'none',
                          backgroundColor: "#fff",
                          margin: '0px 6px',
                          outline: 'none'
                        }}
                        onClick={() => removeProduct(product)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                      </button>
                    </div>
                  </a>
                  <hr style={{ borderStyle: "dashed ", margin: '6px 0px' }}></hr>
                </li>
              ))}
            </div>
            <div style={{ display: "flex", height: '80px' }}>
              <button className='btn-xoa' onClick={hanldeShowCart} style={{ color: "#000", fontFamily: "Times New Roman", borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', margin: '24px 24px 16px 24px', backgroundColor: "#000", color: '#fff', outline: 'none', width: '100%' }}>
                Chi tiết giỏ hàng
              </button>
            </div>
          </ul>
          <span style={{
            color: location.pathname.includes('/product') || location.pathname.includes('/giohang') ? '#000' : '#fff'
          }}
            className="Soluong">{soluong}</span>
        </i>
      </div>
    </div>

  )
}
export default Nav;