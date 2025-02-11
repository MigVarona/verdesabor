const Newsletter = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Únete a nuestra newsletter
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-base sm:text-lg">
          Recibe los mejores consejos sobre alimentación saludable y bienestar directamente en tu bandeja de entrada.
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="flex-1 px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Suscribirse
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
