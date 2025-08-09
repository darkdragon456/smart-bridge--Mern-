import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );

  return (
    <div className="mt-16">
      {searchCategory && (
        <div className="flex flex-col items-center w-full mb-8">
          <h1 className="text-3xl md:text-4xl font-medium mb-4">
            {searchCategory.text.toUpperCase()}
          </h1>
          {searchCategory.image && (
            <img
              src={searchCategory.image}
              alt={searchCategory.text}
              className="w-full max-w-[600px] h-auto rounded-lg shadow-md"
            />
          )}
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-12">
          <h1 className="text-3xl md:text-4xl font-medium">
            No products found
          </h1>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;

