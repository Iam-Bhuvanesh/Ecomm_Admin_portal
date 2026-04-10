import { MessageCircle } from "lucide-react";

// You can change this to your actual WhatsApp number
const WHATSAPP_NUMBER = "911234567890"; 

const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 md:bottom-8 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={30} className="text-white" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366]"></span>
      </span>
    </a>
  );
};

export default WhatsAppButton;
