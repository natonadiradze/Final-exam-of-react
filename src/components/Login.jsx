import React, {useState} from 'react';
import PropTypes from 'prop-types';
import closetLogo from '../assets/images/loginLogo.png';
import {useDispatch} from "react-redux";
import {setToken} from "../redux/slices/authSlice.js";
import {loginUser} from "../utils/api.js";
import {modalClose} from "../redux/slices/modalSlice.js";

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const dispatch = useDispatch();


    const handleLogin = async () => {
        try {
            const userData = {
                username: mail,
                password: password,
            };
            const response = await loginUser(userData);
            console.log(response)

            if (response.token) {
                setError(false);
                dispatch(setToken(response.token));
                dispatch(modalClose(false))
            }

        } catch (error) {
            if (error.response) {
                setError(true);
                setErrMsg(error.response.data);
            }

            setTimeout(() => {
                setError(false);
            }, 4000);
        }
    };

    const closeModal = () => {
        dispatch(modalClose(false))
    }

    const closeErrMsg = () => {
        setError(false);
    }

    return (
        <div className="fixed left-0 top-0 h-[100%] w-full flex items-center justify-center z-20">
            <div
                className="login relative bg-modal-bg z-10 rounded-lg w-full ml-12 mr-12 h-[530px] lg:w-[709px] lg:h-[558px] flex flex-col justify-center items-center">
                <img src={closetLogo} alt='closet logo'/>

                <h3 className='text-white font-poppins mt-4 font-medium text-4xl text-center'> Welcome to CLOSET</h3>


                <div className='flex flex-col space-y-2 mt-9'>
                    <label className='text-white font-poppins text-base'>Email</label>
                    <input onChange={e => setMail(e.target.value)} type="text"
                           className='py-2 pr-20 pl-4 rounded outline-none'/>
                </div>
                <div className='flex flex-col space-y-2 mt-9 relative'>
                    <label className='text-white font-poppins text-base '>Password</label>

                    {
                        isPasswordVisible ? (
                                <input onChange={e => setPassword(e.target.value)} type="text"
                                       className='py-2 pr-20 pl-4 rounded outline-none'/>
                            ) :
                            <input onChange={e => setPassword(e.target.value)} type="password"
                                   className='py-2 pr-20 pl-4 rounded outline-none'/>

                    }

                    {
                        isPasswordVisible ? (
                                <svg onClick={() => setIsPasswordVisible(false)}
                                     className='absolute bottom-2 right-2 cursor-pointer' xmlns="http://www.w3.org/2000/svg"
                                     width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9ZM12 4.5C17 4.5 21.27 7.61 23 12C21.27 16.39 17 19.5 12 19.5C7 19.5 2.73 16.39 1 12C2.73 7.61 7 4.5 12 4.5ZM3.18 12C4.83 15.36 8.24 17.5 12 17.5C15.76 17.5 19.17 15.36 20.82 12C19.17 8.64 15.76 6.5 12 6.5C8.24 6.5 4.83 8.64 3.18 12Z"
                                        fill="#7B809A"/>
                                </svg>
                            ) :
                            <svg onClick={() => setIsPasswordVisible(true)}
                                 className='absolute bottom-2.5 right-2 cursor-pointer'
                                 xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18"
                                 fill="none">
                                <path
                                    d="M1 1.27L2.28 0L19 16.72L17.73 18L14.65 14.92C13.5 15.3 12.28 15.5 11 15.5C6 15.5 1.73 12.39 0 8C0.69 6.24 1.79 4.69 3.19 3.46L1 1.27ZM11 5C11.7956 5 12.5587 5.31607 13.1213 5.87868C13.6839 6.44129 14 7.20435 14 8C14 8.35 13.94 8.69 13.83 9L10 5.17C10.31 5.06 10.65 5 11 5ZM11 0.5C16 0.5 20.27 3.61 22 8C21.18 10.08 19.79 11.88 18 13.19L16.58 11.76C17.94 10.82 19.06 9.54 19.82 8C18.17 4.64 14.76 2.5 11 2.5C9.91 2.5 8.84 2.68 7.84 3L6.3 1.47C7.74 0.85 9.33 0.5 11 0.5ZM2.18 8C3.83 11.36 7.24 13.5 11 13.5C11.69 13.5 12.37 13.43 13 13.29L10.72 11C9.29 10.85 8.15 9.71 8 8.28L4.6 4.87C3.61 5.72 2.78 6.78 2.18 8Z"
                                    fill="#7B809A"/>
                            </svg>
                    }
                </div>

                <button onClick={handleLogin}
                        className='rounded py-2 px-11 bg-white mt-12 font-roboto font-medium leading-normal text-modal-btn border border-solid border-[#3E5673]  transition-all duration-500 hover:text-white hover:bg-modal-btn'>Login
                </button>

                {
                    error && (
                        <div
                            className='absolute right-2 top-2 h-[50px] w-[300px] bg-red-400 flex items-center p-2 rounded text-white justify-between'>
                            <p>{errMsg}</p>
                            <svg className='cursor-pointer' onClick={closeErrMsg} xmlns="http://www.w3.org/2000/svg"
                                 width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path
                                    d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                                    fill="#fff"/>
                            </svg>
                        </div>
                    )
                }
            </div>
            <div className="backdrop fixed left-0 top-0 w-full h-[100%] bg-backdrop" onClick={closeModal}></div>
        </div>
    );
};

Login.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Login;