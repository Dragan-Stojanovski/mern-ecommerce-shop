import SetMetaInfo from "../../../../infra/utility/SetMetaInfo";
import BannersSection from "./components/banners-section";
import HeroSection from "./components/hero-section";
import PartnersSlider from "./components/partners-slider";
import TrendingNowProducts from "./components/products/trending-now-products";

const HomePage = ():JSX.Element => {
return(
    <>
       <SetMetaInfo title="Home Page" description="Home page of the ecommerce page" />
    <HeroSection />
    <PartnersSlider />
    <TrendingNowProducts/>
    <BannersSection/>
    </>
)
}

export default HomePage;