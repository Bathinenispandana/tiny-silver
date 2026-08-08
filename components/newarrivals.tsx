import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { products } from "@/lib/products";

export default function NewArrivals() {
  const newProducts = products
    .filter((product) => product.isNew)
    .slice(0, 3);

  return (
    <section className="w-full py-10">
      <div className="mx-auto max-w-[1700px] px-5">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-4xl font-semibold tracking-tight text-accent">
            New Arrivals
          </h2>

          <Link
            href="/collections/new-arrivals"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            View All
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-15 sm:grid-cols-2 lg:grid-cols-3">
          {newProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              {/* Image */}
              <div className="relative h-[170px] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                
              </div>
            </Link>
          ))}
        </div> 
      </div>
    </section>
  );
}