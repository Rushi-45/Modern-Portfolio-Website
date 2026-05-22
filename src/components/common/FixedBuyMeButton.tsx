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
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.6, type: "spring" }}
        className="fixed bottom-6 right-6 z-50 group flex flex-row-reverse items-center h-12 rounded-full overflow-hidden bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-cyan-400/40 shadow-lg hover:shadow-cyan-500/20 transition-[background-color,border-color,box-shadow] duration-300 cursor-pointer"
        aria-label="Buy me a coffee or chai"
      >
        <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
          <motion.span
            aria-hidden="true"
            className="absolute top-2 left-1/2 -translate-x-1/2 w-[3px] h-2 rounded-full bg-cyan-300/70 blur-[1px]"
            animate={{ y: [0, -6, -12], opacity: [0, 0.7, 0], scaleY: [0.6, 1, 1.2] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute top-2 left-1/2 -translate-x-1/2 w-[3px] h-2 rounded-full bg-cyan-200/60 blur-[1px] -ml-1.5"
            animate={{ y: [0, -6, -12], opacity: [0, 0.5, 0], scaleY: [0.6, 1, 1.2] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute top-2 left-1/2 -translate-x-1/2 w-[3px] h-2 rounded-full bg-cyan-200/50 blur-[1px] ml-1.5"
            animate={{ y: [0, -6, -12], opacity: [0, 0.5, 0], scaleY: [0.6, 1, 1.2] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.9 }}
          />
          <motion.div
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <FiCoffee className="text-xl text-cyan-300" />
          </motion.div>
        </div>
        <span className="max-w-0 group-hover:max-w-[200px] overflow-hidden whitespace-nowrap transition-[max-width] duration-300 ease-out text-white font-medium text-sm">
          <span className="pl-5 pr-1">Buy me a coffee</span>
        </span>
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
