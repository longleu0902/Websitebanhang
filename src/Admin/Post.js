import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import { Input, Space } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { message } from 'antd';
import ListDataService from "../Lists.services";
import { db } from "../firebase-config";
import { addDoc, collection, doc, deleteDoc, updateDoc } from 'firebase/firestore';
// import type { SearchProps } from '../Search';
const Post = ({ List, setList }) => {
    const [postFilter, setPostFiler] = useState('')
    const [messageApi, contextHolder] = message.useMessage();
    const [updatePrice, setUpdatePrice] = useState('')
    const handleChange = (e) => {
        setPostFiler(e.target.value)
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

    //form
    const [openForm, setOpenForm] = useState(false);
    const hanldeOpenForm = () => {
        setOpenForm(prev => !prev)
    }
    const formik = useFormik({
        initialValues: {
            img: '',
            title: '',
            price: '',
            sample: '',
            amount: 1,

        },
        onSubmit: async (values) => {
            try {
                const docRef = await addDoc(collection(db, "Lists"), values);
                console.log("Document written with ID: ", docRef.id);
                setList([...List, {...values, id: docRef.id} ]);

            } catch (e) {
                console.error("Error adding document: ", e);
            }

            messageApi.open({
                type: 'success',
                content: 'Create succcessfully',
            });
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required('Required'),
            sample: Yup.string().required('Required'),
            price: Yup.number().required('Required'),
            amount: Yup.number().required('Required'),
            img: Yup.string().required('Required'),
        }),
    });
    const deleteProduct = async (id) => {
        const ListRemove = List.filter((item)=> item.id !==id)
        setList([...ListRemove])
        const productDoc = doc(db, "Lists", id);
        console.log(productDoc)
        await deleteDoc(productDoc);
    }
    const updateProduct = async (id) => {
        const ListUpdate = [...List]
        const productDoc = doc(db, "Lists", id);
        const idx = ListUpdate.findIndex((item)=> item.id==id)
        if(idx!== -1) {
        ListUpdate[idx] = {...List[idx],  price: updatePrice }
        }
        setList([...ListUpdate])
        await updateDoc(productDoc, { price: updatePrice });
    }

    return (
        <div>
            <Search style={{ marginBottom: '30px' }} placeholder="input search text" onChange={handleChange} enterButton />
            <div style={{ height: "700px", overflow: 'scroll' }} >
                <Table hover size="sm">
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Img
                            </th>
                            <th>
                                Title
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Sample
                            </th>
                            <th>
                                Amount
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    {List.filter((product) => product.title.toLowerCase().includes(postFilter)).map((product) => (
                        <tbody>
                            <tr>
                                <th style={{ width: '10px' }} scope="row">
                                    <span className="row-post">{product.id}</span>
                                </th>
                                <td style={{ width: '100px' }}>
                                    <img style={{ width: '50px', height: "50px" }} src={product.img} />
                                </td>
                                <td style={{ width: '400px' }}>
                                    {product.title}
                                </td>
                                <td className="Post-price">
                                    {product.price}
                                    <div className="update-price">
                                        <input onChange={(e) => setUpdatePrice(e.target.value)} placeholder="update price" />
                                        <button onClick={() => updateProduct(product.id)} type="submit" style={{ border: 'none', backgroundColor: '#000', color: '#fff', marginLeft: '12px' }}>update</button>
                                    </div>
                                </td>
                                <td>
                                    {product.sample}
                                </td>
                                <td>
                                    {product.amount}
                                </td>
                                <td style={{ width: '50px' }}>
                                    <button onClick={() => deleteProduct(product.id)} type="submit" style={{ border: 'none', backgroundColor: '#000', color: '#fff' }}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    ))}

                </Table>
            </div>
            <button onClick={hanldeOpenForm} style={{ border: 'none' }}> + </button>
            {openForm && <form onSubmit={formik.handleSubmit}>
                <div className='mt-2'>
                    <Input
                        addonBefore='img'
                        placeholder='Enter your img product'
                        size='large'
                        value={formik.values.img}
                        onChange={formik.handleChange}
                        name='img'
                    />
                    <p style={{ color: 'red' }}>{formik.errors.img}</p>
                </div>
                <div className='mt-2'>
                    <Input
                        addonBefore='title'
                        placeholder='Enter your title product'
                        size='large'
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        name='title'
                    />
                    <p style={{ color: 'red' }}>{formik.errors.title}</p>
                </div>
                <div className='mt-2'>
                    <Input
                        addonBefore='price'
                        placeholder='Enter your price product'
                        size='large'
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        name='price'
                    />
                    <p style={{ color: 'red' }}>{formik.errors.price}</p>
                </div>
                <div className='mt-2'>
                    <Input
                        addonBefore='sample'
                        placeholder='Enter your sample product'
                        size='large'
                        value={formik.values.sample}
                        onChange={formik.handleChange}
                        name='sample'
                    />
                    <p style={{ color: 'red' }}>{formik.errors.sample}</p>
                </div>
                <div className='mt-2'>
                    <Input
                        addonBefore='amount'
                        placeholder='Enter your amount product'
                        size='large'
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        name='amount'
                        disabled='false'
                    />
                    <p style={{ color: 'red' }}>{formik.errors.amount}</p>
                </div>

                <div className='mt-2'>
                    {/* <Button type='primary'>Add Product</Button> */}
                    <button type='submit'>
                        Add
                    </button>
                </div>
            </form>}


        </div>
    )
}
export default Post;