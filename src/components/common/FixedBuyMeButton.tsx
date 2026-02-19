import { motion } from "framer-motion";
import { FiCoffee } from "react-icons/fi";
import { BuyMeSupportModal, useBuyMeSupport } from "./BuyMeSupport";

const CHAI_URL = "https://buymeachai.ezee.li/rushi45";
const COFFEE_URL = "https://buymeacoffee.com/rushi45";

const FixedBuyMeButton = () => {
  const { isOpen, open, close } = useBuyMeSupport();

  return (
    <>
      <motion.button
        onClick={open}
        className="fixed bottom-6 right-6 z-9999 flex items-center gap-2 px-5 py-3 bg-primary border border-gray-600 text-secondary-light font-semibold rounded-full shadow-lg opacity-90 hover:opacity-100 hover:bg-primary-light hover:border-secondary-light/50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        aria-label="Buy me a coffee or chai"
        style={{ position: "fixed" }}
      >
        <FiCoffee className="text-lg" />
        <span className="hidden sm:inline">Buy me a coffee</span>
      </motion.button>
      <BuyMeSupportModal
        open={isOpen}
        onClose={close}
        chaiUrl={CHAI_URL}
        coffeeUrl={COFFEE_URL}
      />
    </>
  );
};

export default FixedBuyMeButton;
