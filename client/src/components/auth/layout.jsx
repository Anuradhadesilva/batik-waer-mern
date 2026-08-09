import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background font-sans">
      {/* Left side - Image */}
      <div className="hidden lg:flex flex-col w-1/2 relative bg-black">
        <img 
          src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=80" 
          alt="Batik Art" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12">
          <h1 className="text-5xl font-serif font-extrabold text-white mb-4">
            Anoma Batiks
          </h1>
          <p className="text-xl font-light text-gray-200">
            Handcrafted heritage, directly to you.
          </p>
        </div>
      </div>
      
      {/* Right side - Auth Form */}
      <div className="flex flex-1 flex-col w-full lg:w-1/2">
        <div className="p-8 pb-0">
          <h2 className="text-3xl font-bold text-foreground">Account details</h2>
        </div>
        <div className="flex flex-1 items-center justify-center p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
