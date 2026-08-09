import { Card, CardContent } from "@/components/ui/card";

function OurStoryPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold text-foreground mb-6">Our Story</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
          The art of Batik is a journey of patience, precision, and passion. We preserve the heritage of Sri Lankan handloom by crafting timeless pieces that tell a story.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80" 
            alt="Batik Crafting" 
            className="rounded-none shadow-2xl w-full h-[500px] object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-foreground">Handcrafted with Heritage</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every piece we create is meticulously dyed by hand, utilizing techniques that have been passed down through generations. Our artisans dedicate hours to waxing and dyeing fabrics, ensuring each pattern is vibrant, unique, and authentically Sri Lankan.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From the deep terracotta reds to the intricate floral motifs, our designs draw inspiration from the natural beauty and rich culture of our island.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 order-2 md:order-1">
          <h2 className="text-3xl font-serif font-bold text-foreground">A Commitment to Quality</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We use only the finest cotton and handloom fabrics to ensure that our garments are not only visually stunning but also luxuriously comfortable and durable. 
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            By choosing us, you are not just buying a piece of clothing; you are supporting a community of artisans and helping to keep a beautiful tradition alive.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <img 
            src="https://images.unsplash.com/photo-1583391733958-d15ce69c8c19?w=800&q=80" 
            alt="Batik Fabric" 
            className="rounded-none shadow-2xl w-full h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default OurStoryPage;
