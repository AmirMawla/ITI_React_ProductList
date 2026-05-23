import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'
import { useTheme } from '../store/useThemeStore'

const User_Layout = () => {
  const { theme } = useTheme();

  return (
    <div className={theme === 'light' ? 'bg-gradient-to-br from-gray-50 to-gray-100' : 'bg-gradient-to-br from-gray-800 to-gray-900 text-white min-h-screen'}>
      <Nav />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default User_Layout