import React from 'react'
import BlogCards from '../components/blogs/BlogCards.jsx'
import Hero from '../components/homeComponent/Hero.jsx'

const Blogs = () => {
  return (
    <div>
      <Hero 
        page="Blog" 
        title1="The" 
        title2="Luxury" 
        italicTitle="Travel Log." 
        subtitle="Deep dive into the world of elite travel. From insider guides on the best-kept secrets of the Mediterranean to packing tips for arctic expeditions, our blog is your go-to resource for expert knowledge, travel inspiration, and the latest trends in global tourism."
        kicker="INSIDER PERSPECTIVES"
        showForm={false}
      />
      <BlogCards/>
      
    </div>
  )
}

export default Blogs
