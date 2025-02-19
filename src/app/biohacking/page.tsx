import CategoryArticles from "../components/CategoryArticles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";

function BiohackingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <CategoryArticles category="biohacking" />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default BiohackingPage;