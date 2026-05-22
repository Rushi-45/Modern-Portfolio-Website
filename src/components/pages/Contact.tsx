import { motion, useInView } from "framer-motion";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import HoverDevCards from "@/components/common/HoverFillCards";
import { socialLinks } from "@/constants/social";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const isInView1 = useInView(ref1, { once: true, amount: 0.2 });
  const isInView2 = useInView(ref2, { once: true, amount: 0.2 });

  const validateForm = () => {
    const newErrors = { name: "", email: "", message: "" };
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/rushi.positive@gmail.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setErrors({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message.");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      ref={ref1}
      className="w-full min-h-screen text-white py-16 px-6"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView1 ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
          Let's Connect 🚀
        </h2>
        <p className="text-gray-400 mt-3 text-base sm:text-lg">
          Got a project? Want to collaborate? Drop a message!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto gap-12 p-2 sm:p-8 bg-opacity-30 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center p-2"
        >
          <div className="w-full max-w-4xl p-8 sm:p-10 bg-opacity-30 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
              Send Me a Message 📩
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Your name
                </label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="👤 Hey there! What's your name?"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`w-full px-5 py-3 rounded-lg border bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                      errors.name ? "border-red-500" : "border-gray-500"
                    }`}
                  />
                </motion.div>
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Your email address
                </label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="📧 Drop your best email here!"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full px-5 py-3 rounded-lg border bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                      errors.email ? "border-red-500" : "border-gray-500"
                    }`}
                  />
                </motion.div>
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">
                  Your message
                </label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="💬 Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className={`w-full px-5 py-3 rounded-lg border bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                      errors.message ? "border-red-500" : "border-gray-500"
                    }`}
                  />
                </motion.div>
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={
                  !loading
                    ? {
                        scale: 1.05,
                        boxShadow: "0px 0px 10px rgba(0, 229, 255, 0.8)",
                      }
                    : {}
                }
                whileTap={!loading ? { scale: 0.95 } : {}}
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Sending...
                  </div>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        ref={ref2}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView2 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="flex gap-8 w-full place-content-center text-slate-900 mt-12"
      >
        <div className="p-4">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {socialLinks.map(({ title, subtitle, href, icon: Icon, color }) => (
              <HoverDevCards
                key={href}
                title={title}
                subtitle={subtitle}
                href={href}
                Icon={Icon}
                color={color}
                target="_blank"
                rel="noopener noreferrer"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
