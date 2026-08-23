import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">PinkPulse</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow-sm"
          >
            <img
              src={`http://localhost:5000${product.images[0]?.imageUrl}`}
              alt={product.name}
              className="w-full h-72 object-cover rounded-lg"
            />

            <h2 className="text-xl font-semibold mt-4">
              {product.name}
            </h2>

            <p className="text-gray-500 text-sm">
              {product.description}
            </p>

            <p className="text-pink-600 font-bold text-lg mt-2">
              KSh {Number(product.salePrice ?? product.price)}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}