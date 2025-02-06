import React, {useEffect} from 'react';
import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import Login from "../Login.jsx";
import { useSelector} from "react-redux";

const Layout = ({children}) => {
    const isModalOpen = useSelector(state => state.modal.modalOpen)

    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
            {isModalOpen && <Login />}
        </>
    );
};

export default Layout;