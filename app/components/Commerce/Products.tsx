"use client"

import React, { useEffect } from "react";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  default_price: string;
};

type ProductsProps = {
  products: Product[];
};

export const Products: React.FC<ProductsProps> = ({ products }) => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log("Order canceled -- continue to shop around and checkout when you’re ready.");
    }
  }, []);

  return (
    <>
      {products.length ? (
        <ul className="grid grid-cols-1 gap-4 p-0 list-none sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.id} className="border p-4 rounded-lg shadow">
              <form action="/api/checkout_session" method="POST">
                <img
                  src={product.images[0]}
                  alt={`Image of ${product.name}`}
                //   layout="responsive"
                  width={0}
                  height={0}
                //   priority={true}
                />
                <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <button
                  type="submit"
                  role="link"
                  className="inline-block bg-primary-color text-white px-4 py-2 rounded border border-primary-color hover:bg-white hover:text-primary-color mt-4"
                >
                  Buy Now
                </button>
                <input
                  type="hidden"
                  name="priceId"
                  value={product.default_price}
                />
              </form>
            </li>
          ))}
        </ul>
      ) : (
        <div>No products</div>
      )}
    </>
  );
};
