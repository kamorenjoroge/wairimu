import Contact from "./components/Contact"
import Hero from "./components/Hero"
import ProductList from "./components/ProductList"

const Page = () => {
  return (
    <div className='pt-0'>
      <Hero/>
      <ProductList/>
      <Contact/>
    </div>
  )
}

export default Page