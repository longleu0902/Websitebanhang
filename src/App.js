import logo from './logo.svg';
import './App.css';
import Nav from './product/Nav';
import Header from './product/Header';
import CartProduct from './product/CartProduct';
import CartProductFilter from './product/CartProductFitle';
import Footer from './product/Footer';
import ShowCartProduct from './product/ShowCartProduct';
import ShoppingCart from './product/ShoppingCart';
import React, { useState, useEffect } from 'react';
import { Route, Routes, NavLink, BrowserRouter } from 'react-router-dom';
import { message, Pagination } from 'antd';
import ListDataService from "./Lists.services";
import AuthFormLogin from './product/AuthFormSignUp';
import AuthFormSignUp from './product/AuthForm';
import Admin from "./Admin/LoginAd";
import MainAdmin from './Admin/main-admin';
function App() {
  const [List, setList] = useState([]);
  const getLists = async () => {
    try {
      const data = await ListDataService.getAllLists();
      const dataList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setList(dataList)
    } catch (err) {
      console.log(err)
    }

  }
  useEffect(() => {
    getLists();
  }, []);
  // console.log(List)
  ///test list
  // const [List, setList] = useState([
  //   {
  //     id: 1,
  //     img: 'https://i.pinimg.com/564x/14/e1/43/14e1436f0221827d1e8510b47f901c36.jpg',
  //     title: 'Áo dài tay trắng mùa đông lạnh',
  //     price: 300000,
  //     amount: 1,
  //     size: '',
  //   },
  //   {
  //     id: 2,
  //     img: 'https://i.pinimg.com/564x/a1/48/f9/a148f93e63b4ad204630ba40820ffa02.jpg',
  //     title: 'Áo thiết kế sơ mi nữ',
  //     price: 200000,
  //     amount: 1,
  //     size : ''
  //   },
  //   {
  //     id: 3,
  //     img: 'https://i.pinimg.com/564x/fb/2c/8b/fb2c8b4795bb325e0e84aac2d929c62e.jpg',
  //     title: 'Set quần áo nữ mùa thu',
  //     price: 400000,
  //     amount: 1,
  //     size:''
  //   },
  //   {
  //     id: 4,
  //     img: 'https://i.pinimg.com/564x/6d/2e/e9/6d2ee90cd364043df8a94590d51c1de5.jpg',
  //     title: 'Quần áo trẻ em',
  //     price: 350000,
  //     amount: 1,
  //     size: ''
  //   },
  //   {
  //     id: 5,
  //     img: 'https://i.pinimg.com/564x/c5/4e/7f/c54e7fedf905bfee1956b3f28c206b0d.jpg',
  //     title: 'Set quần áo nam mặc đẹp ,màu trắng ,đầy đủ các loại size,',
  //     price: 520000,
  //     amount: 1,
  //     size: ''
  //   },
  //   {
  //     id: 6,
  //     img: 'https://i.pinimg.com/564x/59/51/33/59513349517f513de90443f463ddc0b4.jpg',
  //     title: 'Set đồ thể thao unisex',
  //     price: 200000,
  //     amount: 1,
  //     size : ''
  //   },
  //   {
  //     id: 7,
  //     img: 'https://i.pinimg.com/564x/a0/2e/da/a02eda77a0d5be7cb6976df078fc0cd8.jpg',
  //     title: 'Quần Jean Nữ Ống Rộng - Quần Jean Nữ Suông',
  //     price: 129000,
  //     amount: 1,
  //     size : ''
  //   },
  //   {
  //     id: 8,
  //     img: 'https://i.pinimg.com/564x/66/8d/b0/668db06be3a1695fe8875ecfcd3c4fc2.jpg',
  //     title: 'Set đồ thể thao nỉ nam mùa đông ',
  //     price: 378000,
  //     amount: 1,
  //     size: ''

  //   }
  // ]);
  const [Cart, setCart] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const [size, setSize] = useState([]) //đây là state để lưu size 
  const handleClickSize = (type) => {
    setSize(type);
  }
  
  const HandleAddProduct = (product) => {
    const tempCart = [...Cart]
    const proIdx = tempCart.findIndex(it => it.id === product.id && it.size == product.size && it.color == product.color)
    if (proIdx === -1) {
      tempCart.push(product)
    } else {
      tempCart[proIdx] = { ...tempCart[proIdx], ...product, amount: tempCart[proIdx].amount + 1 }//khi đã tồn tài thì sẽ tăng số lượng sp lên 1
    }
    setCart([...tempCart]);
    localStorage.setItem('Cart', JSON.stringify(tempCart))
    // console.log(tempCart)
    messageApi.open({
      type: 'success',
      content: 'Đã thêm sản phẩm vào giỏ hàng',
    });
  }
  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem('Cart'));
    setCart([...storedArray])
  }, [])
  // console.log(Cart)
  const removeProduct = (sanpham) => {
    const arr = Cart.filter((sp) => sp.id !== sanpham.id || sp.color != sanpham.color || sp.size != sanpham.size);
    console.log(arr);
    setCart([...arr]);
    const storedArrayString = localStorage.getItem('Cart');
    if (storedArrayString) {
      const storedArray = JSON.parse(storedArrayString);
      const removeArray = storedArray.filter(item => item.id !== sanpham.id || item.color != sanpham.color || item.size != sanpham.size);
      localStorage.setItem('Cart', JSON.stringify(removeArray));
    } else {
      console.error("No data found in localStorage with the specified key");
    }
  };
  const removeAllProdcut = () => {
    const arr = '';
    setCart([...arr]);
    const existingArray = JSON.parse(localStorage.getItem('Cart')) || [];
    existingArray.length = 0;
    localStorage.setItem('Cart', JSON.stringify(existingArray));
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const [keywords, setKeywords] = useState('');
  const getKeywords = (e) => {
    setKeywords(e.target.value);
  };

  return (
    <div className="App">
      {contextHolder}
      {/* <Footer /> */}
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={<Nav List={List} keywords={keywords} getKeywords={getKeywords} soluong={Cart.length} Cart={Cart} setCart={setCart} removeProduct={removeProduct} numberWithCommas={numberWithCommas} size={size} setSize={setSize} />} />
            <Route path='/filter/:sample' element={<Nav List={List} keywords={keywords} getKeywords={getKeywords} soluong={Cart.length} Cart={Cart} setCart={setCart} removeProduct={removeProduct} numberWithCommas={numberWithCommas} size={size} setSize={setSize} />} />
            <Route path='/product/:id' element={<Nav List={List} keywords={keywords} getKeywords={getKeywords} soluong={Cart.length} Cart={Cart} setCart={setCart} removeProduct={removeProduct} numberWithCommas={numberWithCommas} size={size} setSize={setSize} />} />
            <Route path='/giohang' element={<Nav List={List} keywords={keywords} getKeywords={getKeywords} soluong={Cart.length} Cart={Cart} setCart={setCart} removeProduct={removeProduct} numberWithCommas={numberWithCommas} size={size} setSize={setSize} />} />
            <Route path='/AuthFormSignUp' element={<Nav List={List} keywords={keywords} getKeywords={getKeywords} soluong={Cart.length} Cart={Cart} setCart={setCart} removeProduct={removeProduct} numberWithCommas={numberWithCommas} size={size} setSize={setSize} />} />
          </Routes>
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/filter/:sample" element={<Header />} />
            <Route path="/Admin" element={<Header />} />
          </Routes>
          <Routes>
            <Route path="/" element={<CartProduct keywords={keywords} List={List} HandleAddProduct={HandleAddProduct} numberWithCommas={numberWithCommas} handleClickSize={handleClickSize} size={size} setSize={setSize} />} />
            <Route path="/filter/:sample" element={<CartProductFilter List={List} HandleAddProduct={HandleAddProduct} numberWithCommas={numberWithCommas} handleClickSize={handleClickSize} size={size} setSize={setSize} />} />
            <Route path='/product/:id' element={<ShowCartProduct List={List} setList={setList} Cart={Cart} setCart={setCart} HandleAddProduct={HandleAddProduct} numberWithCommas={numberWithCommas} />} />
            <Route path="/giohang" element={<ShoppingCart Cart={Cart} setCart={setCart} removeProduct={removeProduct} numberWithCommas={numberWithCommas} removeAllProdcut={removeAllProdcut} />} />
            <Route path='/AuthFormSignUp' element={<AuthFormSignUp />} />
            <Route path='/Admin' element={<Admin/>}/> 
            <Route path='/MainAdmin' element={<MainAdmin List={List} setList={setList} />} />
          </Routes>
          <Routes>
            <Route path='/' element={<Footer />} />
            <Route path='/filter/:sample' element={<Footer />} />
            <Route path='/product/:id' element={<Footer />} />
            <Route path='/giohang' element={<Footer />} />
            <Route path='/AuthFormSignUp' element={<Footer />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
