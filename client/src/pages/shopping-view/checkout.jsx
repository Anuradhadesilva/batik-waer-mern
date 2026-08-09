import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getGuestId } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const currentUserId = user?.id || getGuestId();

  // Form State
  const [formData, setFormData] = useState({
    email: user?.email || "",
    newsOffers: false,
    country: "Sri Lanka",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    saveInfo: false,
  });

  // Try to load saved form data for returning guests
  useEffect(() => {
    const savedCheckoutInfo = localStorage.getItem("checkoutInfo");
    if (savedCheckoutInfo) {
      try {
        const parsed = JSON.parse(savedCheckoutInfo);
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse saved checkout info");
      }
    }
  }, []);

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const shippingCost = 290.0;
  const grandTotal = totalCartAmount + shippingCost;

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleInitiatePaypalPayment() {
    if (cartItems.items?.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    
    // Simple Validation
    if (!formData.email || !formData.email.includes("@")) {
      toast({ title: "Please enter a valid email.", variant: "destructive" });
      return;
    }
    if (!formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.phone) {
      toast({ title: "Please fill in all required delivery fields.", variant: "destructive" });
      return;
    }

    if (formData.saveInfo) {
      localStorage.setItem("checkoutInfo", JSON.stringify(formData));
    } else {
      localStorage.removeItem("checkoutInfo");
    }

    const orderData = {
      userId: currentUserId,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: "flat-form-" + Date.now(), // Generate a fake ID since we aren't saving to address DB
        address: formData.address,
        city: formData.city,
        pincode: formData.postalCode,
        phone: formData.phone,
        notes: `Name: ${formData.firstName} ${formData.lastName}, Company: ${formData.company}`,
        email: formData.email,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: grandTotal,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "sangam");
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left Column - Contact & Delivery */}
      <div className="w-full md:w-[55%] lg:w-[60%] p-6 md:p-12 lg:pl-24 xl:pl-32 border-r border-gray-200">
        
        {/* Contact Section */}
        <div className="mb-10 mt-4 max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Contact</h2>
            {!user && (
              <span className="text-sm">
                Already have an account? <a href="/auth/login" className="text-blue-600 hover:underline">Log in</a>
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="h-12 border-gray-300 focus-visible:ring-black rounded-md"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="newsOffers" 
                name="newsOffers"
                checked={formData.newsOffers}
                onCheckedChange={(checked) => handleInputChange({ target: { name: 'newsOffers', type: 'checkbox', checked } })}
                className="rounded-sm border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" 
              />
              <Label htmlFor="newsOffers" className="text-sm font-normal text-gray-700 cursor-pointer">
                Email me with news and offers
              </Label>
            </div>
          </div>
        </div>

        {/* Delivery Section */}
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Delivery</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Label className="absolute top-2 left-3 text-xs text-gray-500">Country/Region</Label>
                <Input
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="h-14 pt-6 pb-2 border-gray-300 bg-gray-50/50 cursor-not-allowed rounded-md"
                  disabled
                />
              </div>
            </div>

            <div>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                className="h-12 border-gray-300 focus-visible:ring-black rounded-md"
              />
            </div>
            <div>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                className="h-12 border-gray-300 focus-visible:ring-black rounded-md"
              />
            </div>

            <div className="md:col-span-2">
              <Input
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company (optional)"
                className="h-12 border-gray-300 focus-visible:ring-black rounded-md"
              />
            </div>

            <div className="md:col-span-2">
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="h-12 border-gray-300 focus-visible:ring-black rounded-md"
              />
            </div>

            <div>
              <Input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="h-12 border-gray-300 focus-visible:ring-black rounded-md"
              />
            </div>
            <div>
              <Input
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="Postal code (optional)"
                className="h-12 border-gray-300 focus-visible:ring-black rounded-md"
              />
            </div>

            <div className="md:col-span-2">
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="h-12 border-gray-300 focus-visible:ring-black rounded-md"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox 
              id="saveInfo" 
              name="saveInfo"
              checked={formData.saveInfo}
              onCheckedChange={(checked) => handleInputChange({ target: { name: 'saveInfo', type: 'checkbox', checked } })}
              className="rounded-sm border-gray-400" 
            />
            <Label htmlFor="saveInfo" className="text-sm font-normal text-gray-700 cursor-pointer">
              Save this information for next time
            </Label>
          </div>
        </div>

        {/* Shipping Method */}
        <div className="mb-8 max-w-2xl">
          <h2 className="text-xl font-bold mb-4">Shipping method</h2>
          <div className="p-4 border border-blue-600 bg-[#f4f8fd] rounded-md flex justify-between items-center">
            <span className="text-sm text-gray-700">Standard Shipping</span>
            <span className="text-sm font-bold">Rs {shippingCost.toFixed(2)}</span>
          </div>
        </div>

      </div>

      {/* Right Column - Order Summary */}
      <div className="w-full md:w-[45%] lg:w-[40%] bg-[#fafafa] p-6 md:p-12 lg:pr-24 xl:pr-32 border-l border-gray-200 shadow-inner">
        <div className="max-w-md">
          {/* Cart Items List */}
          <div className="space-y-4 mb-6">
            {cartItems?.items?.length > 0 ? (
              cartItems.items.map((item) => (
                <div key={item.productId} className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-md border border-gray-300 overflow-hidden bg-white">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    Rs {((item?.salePrice > 0 ? item?.salePrice : item?.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}
          </div>

          <div className="py-4 border-t border-b border-gray-200 space-y-3 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">Rs {totalCartAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">Rs {shippingCost.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold">Total</span>
            <div className="flex items-end gap-2">
              <span className="text-sm text-gray-500 mb-1">LKR</span>
              <span className="text-2xl font-bold">Rs {grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <Button 
            onClick={handleInitiatePaypalPayment} 
            className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            disabled={isPaymentStart}
          >
            {isPaymentStart ? "Processing..." : "Pay now"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
