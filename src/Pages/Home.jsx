import { saleItems, NewProducts, MostPopular, Hero, ElasticCarousel } from '../Constants'
const Home = () => {
  return (
    <>
      <Hero />
      <ElasticCarousel heading="Sale Items" products={saleItems} color="white" />
      <ElasticCarousel heading="New Products" products={NewProducts} color="#FAFAFA" />
      <ElasticCarousel heading="Most popular" products={MostPopular} color="white" />
      </>
  )
}
export default Home
