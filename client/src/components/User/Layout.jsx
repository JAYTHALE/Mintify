import React from 'react'

import { Outlet } from 'react-router-dom'
import NavBar from './Navbar'
import Footer from './Footer'

const Layout = () => {
    return <>
        <NavBar />
        <main className="pt-[70px]">
            <Outlet />
        </main>
        <Footer />
    </>
}

export default Layout