import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";
import ProductCard from "../shared/ProductCard";
import ProductSkeletonGrid from "../shared/ProductSkeletonGrid";
import { FaExclamationTriangle } from "react-icons/fa";

const Home = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { isLoading, isBackgroundFetching, errorMessage } = useSelector(
        (state) => state.errors
    );

    useEffect(() => {
        // Fetch 12 featured products for the home page (uses cached data immediately if available)
        dispatch(fetchProducts("pageSize=12"));
    }, [dispatch]);

    const hasProducts = products && products.length > 0;

    return (
        <div className="lg:px-14 sm:px-8 px-4">
            <div className="py-6">
                <HeroBanner />
            </div>
            
            <div className="py-5">
                <div className="flex flex-col justify-center items-center space-y-2 text-center">
                    <h1 className="text-slate-800 text-4xl font-bold">Products</h1>
                    <span className="text-slate-700">
                        Discover our handpicked selection of top-rated items just for you!
                    </span>
                    {isBackgroundFetching && hasProducts && (
                        <div className="flex items-center gap-1.5 text-xs text-blue-600 font-medium pt-1">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                            <span>Updating products...</span>
                        </div>
                    )}
                </div>

                {isLoading && !hasProducts ? (
                    <ProductSkeletonGrid count={8} />
                ) : errorMessage && !hasProducts ? (
                    <div className="flex justify-center items-center h-[200px]">
                        <FaExclamationTriangle className="text-slate-800 text-3xl mr-2"/>
                        <span className="text-slate-800 text-lg font-medium">
                            {errorMessage}
                        </span>
                    </div>
                ) : (
                    <div className="pb-6 pt-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
                        {products && products.map((item) => (
                            <ProductCard key={item.productId} {...item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
