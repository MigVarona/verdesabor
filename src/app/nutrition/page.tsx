import NutritioCategory from "../components/NutritionCategory";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";



function NutritionPage() {
  return ( <>
    <div className = "min-h-screen bg-white" >
    <Header />
    <main >
    <NutritioCategory />
    <Newsletter />
    </main> 
    <Footer />
    </div>
  </> );
}

export default NutritionPage;