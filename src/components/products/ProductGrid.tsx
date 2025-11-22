import { Link } from "react-router-dom";
import type { Product } from "../../types";

type ProductListProps = {
  products: Product[];
};

const ProductGrid: React.FC<ProductListProps> = ({
  products
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {products?.map((p) => (
        <Link key={p.name} to={`/product/${p._id}`} className="block">
          <div className="bg-white p-4 ">
            <div className="w-full h-96 mb-4 rounded-lg overflow-hidden">
              <img
                src={p.images[0]?.url}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-sm mb-2">{p.name}</h3>
            <p className="text-gray-500 font-medium text-sm tracking-tighter">
              {p.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default ProductGrid;
