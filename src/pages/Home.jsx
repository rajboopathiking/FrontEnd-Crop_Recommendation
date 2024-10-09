import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Recommend from '../components/Recommend/Recommend'
import Hero from '../components/Hero/Hero'
import Tostore from '../components/ToStore/Tostore'
import Contact from '../components/Contact/Contact'
import About from '../components/About/About'

function HomePage() {
    return (
        <div>
            <Navbar />
            <Hero />
            <Recommend />
            <Tostore />
            <Contact />
            <About />
        </div>
    )
}

export default HomePage
