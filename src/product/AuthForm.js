import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../firebase-config";
import { message, Alert, Space } from 'antd';

const AuthFormSignUp = ({ hanldeOpenSignup }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const [form, setForm] = useState('');
    const [user, setUser] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordAgain, setUserPasswordAgain] = useState('');
    const [notifySuccess, setNotifySuccess] = useState(false);
    const [notifyError, setNotifyError] = useState(false);
    const [notifyWarning, setNotifyWarning] = useState(false)
    const checkUsernameExists = async (username) => {
        try {
            const q = query(collection(db, 'Users'), where('userName', '==', username));
            const querySnapshot = await getDocs(q);
            return !querySnapshot.empty;
        } catch (error) {
            console.error('Error checking username:', error);
            return false;
        }
    };
    const handleAddUser = async () => {
        const usernameExists = await checkUsernameExists(user);

        if (!usernameExists && userPassword == userPasswordAgain && user !== '' && userPassword !== '' && userPasswordAgain !== '') {
            const values = {
                userName: user,
                Password: userPassword,
            }
            try {
                const docRef = await addDoc(collection(db, "Users"), values)
                console.log("Document written with ID: ", docRef.id);
                setNotifySuccess(true)
            }
            catch (err) {
                console.log(err)
            }
        } else if (usernameExists) {
            setNotifyWarning(true)

        } else {
            setNotifyError(true);
        }
    }

    return (
        <div className="modal">
            <div className="modal_ovarlay"></div>
            <div className="modal_body">
                {/* authen form */}
                <div className="auth-form">
                    <div className="Close-auth-form">
                        <button onClick={() => hanldeOpenSignup(false)} style={{ border: 'none', backgroundColor: '#fff' }} >X</button>
                    </div>
                    <div className="auth-form_container">
                        <div style={{ marginTop: '24px' }} className="auth-form_header">
                            <h3 className="auth-form_heading">Đăng kí</h3>
                        </div>
                        <div className="auth-form_form">
                            <div className="auth-form_group">
                                <input
                                    type="text"
                                    placeholder="Tên của bạn"
                                    className="auth-form_input"
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </div>
                            <div className="auth-form_group">
                                <input
                                    type="password"
                                    placeholder="Mật khẩu của bạn"
                                    className="auth-form_input"
                                    onChange={(e) => setUserPassword(e.target.value)}

                                />
                            </div>
                            <div className="auth-form_group">
                                <input
                                    type="password"
                                    placeholder="Nhập lại mật khẩu "
                                    className="auth-form_input"
                                    onChange={(e) => setUserPasswordAgain(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="auth-form_aside">
                            <p className="auth-form_policy-text">
                                Bằng việc đăng kí, bạn đã đồng ý với .
                                <a href="" className="auth-form_text-link">
                                    Điều khoản dịch vụ
                                </a>
                                &amp;
                                <a href="" className="auth-form_text-link">
                                    Chính sách bảo mật
                                </a>
                            </p>
                        </div>
                        {notifySuccess == true ? (
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Alert message="Đăng kí thành công" type="success" showIcon />
                            </Space>
                        ) : (
                            ''
                        )}
                        {notifyError == true ? (
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Alert message="Mật khẩu nhập lại không đúng" type="error" showIcon closable />
                            </Space>
                        ) : ''}
                        {notifyWarning == true ? (
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Alert message="Tên đã tồn tại" type="error" showIcon closable />
                            </Space>
                        ) : ''}
                        <div style={{ marginBottom: 30 }} className="auth-form_controls">
                            {/* <NavLink to='/giohang'> */}
                            <button onClick={() => hanldeOpenSignup(false)} className="btn btn-normal auth-form_controls-back">
                                TRỞ LẠI
                            </button>
                            {/* </NavLink> */}
                            <button onClick={handleAddUser} className="btn btn-normal btn-grey ">ĐĂNG KÍ</button>
                        </div>
                    </div>
                </div>
                {/* SignUp form  */}

            </div>
            <span> {contextHolder}  </span>
        </div>

    )
}
export default AuthFormSignUp;