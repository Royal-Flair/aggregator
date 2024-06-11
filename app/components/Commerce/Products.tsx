import React from "react";
import Image from "next/image";

export const Products = ({ products }: { products: any[] }) => {
    return (
        <>
            {products.length ? (
                <ul className="grid grid-cols-1 gap-4 p-0 list-none sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <li key={product.id}>
                            <form action="/api/checkout_sessions" method="POST">
                                {/* <Image
                                    src={product.images[0]}
                                    alt={`Image of ${product.name}`}
                                    layout="responsive"
                                    width={0}
                                    height={0}
                                    priority={true}
                                /> */}
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <button type="submit" role="link" className="inline-block bg-primary-color text-white px-4 py-2 rounded border border-primary-color hover:bg-white hover:text-primary-color">
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
