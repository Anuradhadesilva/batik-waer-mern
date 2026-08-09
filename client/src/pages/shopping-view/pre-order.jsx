import CommonForm from "@/components/common/form";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { filterOptions } from "@/config";

function PreOrderPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    category: "",
    designDetails: "",
  });

  const preOrderFormControls = [
    {
      name: "fullName",
      label: "Full Name",
      placeholder: "Enter your full name",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email address",
      componentType: "input",
      type: "email",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      componentType: "input",
      type: "text",
    },
    {
      name: "category",
      label: "Category",
      placeholder: "Select a category",
      componentType: "select",
      options: filterOptions.category,
    },
    {
      name: "designDetails",
      label: "Design Details",
      placeholder: "Describe your color preferences, size, or upload inspiration...",
      componentType: "textarea",
    },
  ];

  function handlePreOrderSubmit(event) {
    event.preventDefault();
    
    // Format the message for WhatsApp
    const message = `*New Custom Pre-Order!*%0A%0A*Name:* ${formData.fullName}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phoneNumber}%0A*Category:* ${formData.category}%0A*Details:* ${formData.designDetails}`;
    
    // WhatsApp API URL (target number: 94702537147)
    const whatsappUrl = `https://wa.me/94702537147?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  }

  const isFormValid = formData.fullName && formData.phoneNumber && formData.category && formData.designDetails;

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Card className="shadow-lg border-0 bg-background/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-4xl font-serif font-bold text-foreground mb-4">
            Custom Batik Pre-Order
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Design your own Batik dress, saree, sarong, or wall art! Fill out your preferences below and we'll reach out to confirm.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CommonForm
            formControls={preOrderFormControls}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handlePreOrderSubmit}
            buttonText="Send via WhatsApp"
            isBtnDisabled={!isFormValid}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default PreOrderPage;
