export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "",
    placeholder: "Username or email address *Required",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "",
    placeholder: "Password *Required",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "cotton-sarees", label: "Cotton Batik Sarees" },
      { id: "handloom-sarees", label: "Handloom Sarees" },
      { id: "batik-lungi", label: "Batik Lungi" },
      { id: "batik-shirt", label: "Batik Shirt" },
      { id: "batik-tops", label: "Batik Tops" },
      { id: "batik-sarongs", label: "Batik Sarongs" },
      { id: "batik-couple-kits", label: "Batik Couple Kits" },
      { id: "batik-frocks", label: "Batik Frocks" },
      { id: "wall-art", label: "Wall Art" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "HOME",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "SHOP",
    path: "/shop/listing",
  },
  {
    id: "categories",
    label: "CATEGORIES",
    path: "/shop/listing",
    isDropdown: true,
    children: [
      { id: "cotton-sarees", label: "Cotton Batik Sarees", path: "/shop/listing" },
      { id: "handloom-sarees", label: "Handloom Sarees", path: "/shop/listing" },
      { id: "batik-lungi", label: "Batik Lungi", path: "/shop/listing" },
      { id: "batik-shirt", label: "Batik Shirt", path: "/shop/listing" },
      { id: "batik-tops", label: "Batik Tops", path: "/shop/listing" },
      { id: "batik-sarongs", label: "Batik Sarongs", path: "/shop/listing" },
      { id: "batik-couple-kits", label: "Batik Couple Kits", path: "/shop/listing" },
      { id: "batik-frocks", label: "Batik Frocks", path: "/shop/listing" },
      { id: "wall-art", label: "Wall Art", path: "/shop/listing" },
    ],
  },
  {
    id: "pre-order",
    label: "PRE-ORDER",
    path: "/shop/pre-order",
  },
  {
    id: "our-story",
    label: "OUR STORY",
    path: "/shop/our-story",
  },
  {
    id: "search",
    label: "SEARCH",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  "cotton-sarees": "Cotton Batik Sarees",
  "handloom-sarees": "Handloom Sarees",
  "batik-lungi": "Batik Lungi",
  "batik-shirt": "Batik Shirt",
  "batik-tops": "Batik Tops",
  "batik-sarongs": "Batik Sarongs",
  "batik-couple-kits": "Batik Couple Kits",
  "batik-frocks": "Batik Frocks",
  "wall-art": "Wall Art",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "cotton-sarees", label: "Cotton Batik Sarees" },
    { id: "handloom-sarees", label: "Handloom Sarees" },
    { id: "batik-lungi", label: "Batik Lungi" },
    { id: "batik-shirt", label: "Batik Shirt" },
    { id: "batik-tops", label: "Batik Tops" },
    { id: "batik-sarongs", label: "Batik Sarongs" },
    { id: "batik-couple-kits", label: "Batik Couple Kits" },
    { id: "batik-frocks", label: "Batik Frocks" },
    { id: "wall-art", label: "Wall Art" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

export const guestCheckoutFormControls = [
  {
    label: "Email",
    name: "email",
    componentType: "input",
    type: "email",
    placeholder: "Enter your email address",
  },
  ...addressFormControls
];
