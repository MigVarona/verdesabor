import Header from "./components/Header";
import FeaturedArticles from "./components/FeaturedArticles";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="py-16 container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-6">
            Alimentación saludable para una vida mejor
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
            Descubre artículos, consejos y recetas para mejorar tu alimentación y bienestar.
          </p>
        </section>
        <FeaturedArticles />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Home;