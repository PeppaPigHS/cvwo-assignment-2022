import React from 'react'

import Navbar from './Navbar'
import Footer from './Footer'

interface IPageLayout {
  children: React.ReactNode
}

const PageLayout = (props: IPageLayout) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col min-h-screen-navbar bg-gray-50">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export default PageLayout
