import React from 'react'
import Header from '@/components/layouts/Header'
import TopBar from '@/components/layouts/TopBar'
import Footer from '@/components/layouts/Footer'

const LayoutContent = async ({ children }: { children: React.ReactNode }) => {
     const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/common`
     );
     const { data } = await res.json();
     if (!data) return null;
     const common = data.content;
     const { footer, header, topbar } = common; 
     return (
          <>
               <TopBar topbar={topbar} />
               <Header header={header} />
               {children}
               <Footer footer={footer} />
          </>

     )
}

export default LayoutContent
