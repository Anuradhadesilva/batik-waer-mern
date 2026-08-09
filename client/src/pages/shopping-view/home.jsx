import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import { getGuestId } from "@/lib/utils";

const categoriesWithImage = [
  { id: "cotton-sarees", label: "Batik Sarees", image: "https://images.unsplash.com/photo-1583391733958-d15ce69c8c19?w=500&q=80" },
  { id: "batik-shirt", label: "Batik Shirts", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80" },
  { id: "batik-frocks", label: "Batik Frocks", image: "https://images.unsplash.com/photo-1515347619362-d967527b1401?w=500&q=80" },
  { id: "batik-sarongs", label: "Batik Sarongs", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80" },
  { id: "wall-art", label: "Wall Art", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80" },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    const currentUserId = user?.id || getGuestId();

    dispatch(
      addToCart({
        userId: currentUserId,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(currentUserId));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[700px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <div
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                } absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out`}
              >
                <img
                  src={slide?.image}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white p-6 max-w-3xl transform transition-transform duration-1000 scale-105">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-wide drop-shadow-xl text-white">The Art of Heritage</h1>
                    <p className="text-xl md:text-2xl mb-10 font-light drop-shadow-md text-gray-200">Discover Timeless Sri Lankan Batik</p>
                    <Button onClick={() => navigate('/shop/listing')} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-6 rounded-none uppercase tracking-widest font-semibold transition-all">Explore Collection</Button>
                  </div>
                </div>
              </div>
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-serif font-bold text-center mb-12 text-foreground tracking-wide">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {categoriesWithImage.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer group overflow-hidden rounded-none border-0 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-[400px] lg:h-[300px] overflow-hidden">
                  <img src={categoryItem.image} alt={categoryItem.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                    <span className="font-serif text-2xl font-bold text-white drop-shadow-md">{categoryItem.label}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 border-2 border-primary-foreground/30 rounded-none z-0"></div>
              <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80" alt="Batik artisan" className="w-full h-[500px] object-cover relative z-10 shadow-2xl" />
            </div>
          </div>
          <div className="md:w-1/2 max-w-xl">
            <h4 className="uppercase tracking-widest text-sm mb-4 font-bold text-primary-foreground/80">Our Journey</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">Handcrafted in Sri Lanka</h2>
            <p className="text-lg leading-relaxed mb-8 text-primary-foreground/90 font-light">
              Preserving generations of artisanal skill and vibrant tradition. Each piece is meticulously dyed by hand, creating unique patterns that tell a story of our heritage and culture. Experience the luxury of authentic Sri Lankan Batik.
            </p>
            <Button variant="outline" className="text-primary border-primary-foreground bg-primary-foreground hover:bg-transparent hover:text-primary-foreground rounded-none uppercase tracking-widest font-semibold px-8 py-6">Read Our Story</Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-foreground tracking-wide mb-4">
              Signature Collection
            </h2>
            <p className="text-muted-foreground max-w-2xl text-lg font-light">Explore our most sought-after designs, blending traditional motifs with modern elegance.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
