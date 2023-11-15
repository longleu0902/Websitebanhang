import { Table,Search } from "reactstrap";
import { db } from "../firebase-config";
import { addDoc, collection, doc, deleteDoc, updateDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { Input, Space } from 'antd';
const User = () => {
    const [listUsers, setListUsers] = useState([])
    const [usersFilter, setUsersFiler] = useState('')
    const [updatePassword, setUpdatePassword] = useState('')

    const getUsers = async () => {
        const userRef = await getDocs(collection(db, 'Users'))
        const dataUserRef = userRef.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setListUsers(dataUserRef)
    }
    useEffect(() => {
        getUsers();
    }, [])
    const deleteUser = async (id) => {
        const userRemove = listUsers.filter((item)=> item.id !==id)
        setListUsers([...userRemove])
        const userDoc = doc(db, "Users", id);
        await deleteDoc(userDoc);
    }
    const updateProduct = async (id) => {
        const userUpdate = [...listUsers]
        const productDoc = doc(db, "Users", id);
        const idx = userUpdate.findIndex((item)=> item.id==id)
        if(idx!== -1) {
        userUpdate[idx] = {...userUpdate[idx],  Password: updatePassword }
        }
        setListUsers([...userUpdate])
        await updateDoc(productDoc, { Password: updatePassword });
    }

    const handleChange = (e) => {
        setUsersFiler(e.target.value)
    }
    const { Search } = Input;
    return (
        <>
            <Search style={{ marginBottom: '30px' }} placeholder="input search text" onChange={handleChange} enterButton />
            <div style={{ height: "700px", overflow: 'scroll' }} >
                <Table
                    bordered
                    hover
                >
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                User
                            </th>
                            <th>
                                Password
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>

                    {listUsers.filter((user) => user.userName.toLowerCase().includes(usersFilter)).map((user) => (
                        <tbody>
                            <tr>
                                <th style={{ width: '25%' }} scope="row">
                                    {user.id}
                                </th>
                                <td style={{ width: '35%' }}>
                                    {user.userName}
                                </td>
                                <td className="User-password" style={{ width: '30%' }}>
                                    {user.Password}
                                    <div className="update-password">
                                        <input  onChange={(e) => setUpdatePassword(e.target.value)}  placeholder="update password" />
                                        <button onClick={()=>updateProduct(user.id)} type="submit" style={{ border: 'none', backgroundColor: '#000', color: '#fff', marginLeft: '12px' }}>update</button>
                                    </div>
                                </td>
                                <td>
                                    <button onClick={()=>deleteUser(user.id)} type="submit" style={{ border: 'none', backgroundColor: '#000', color: '#fff' }}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    ))}

                </Table>
            </div>
        </>
    )
}
export default User;