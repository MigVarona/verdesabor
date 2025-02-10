import Header from "./components/Header";
import FeaturedArticles from "./components/FeaturedArticles";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
       
        <FeaturedArticles />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Home;