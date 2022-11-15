import { PropsWithChildren } from 'react'
import Footer from './Footer'
import Header from './Header'
import classNames from './MainLayout.module.css'

export default function MainLayout({ children }: PropsWithChildren) {
  return(
    <main className={classNames.main}>
    <>
       <Header/>
       {children}
       <Footer/>
    </>
  </main>
  )
}
