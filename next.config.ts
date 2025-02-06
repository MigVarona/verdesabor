import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'], // Añade aquí el dominio de las imágenes externas
  },
};

module.exports = nextConfig;
