import { motion } from "framer-motion";
import Image from "next/image";
import classNames from "classnames";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { projects } from "@/constants/projects";
import { useCarousel, FALLBACK_WIDTH } from "@/hooks/useCarousel";
import ShinyButton from "./ShinyButton";

const MotionImage = motion(Image);

const START_INDEX = 1;

interface CarouselProps {
  projectEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  projectLeave: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Carousel: React.FC<CarouselProps> = ({ projectEnter, projectLeave }) => {
  const {
    containerRef,
    itemsRef,
    activeSlide,
    animatedX,
    canScrollPrev,
    canScrollNext,
    goToSlide,
    goToPrev,
    goToNext,
    handleDragStart,
    handleDragSnap,
  } = useCarousel({ itemCount: projects.length, startIndex: START_INDEX });

  return (
    <>
      <div className="text-center">
        <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-4">
          Projects
        </h2>
      </div>
      <div className="flex flex-col gap-8 h-auto">
        <div className="relative w-full lg:w-2/3 lg:mx-auto">
          <button
            onClick={goToPrev}
            disabled={!canScrollPrev}
            className={classNames(
              "absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10",
              "bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3",
              "transition-all duration-300 flex items-center justify-center",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              "text-white hover:text-blue-400",
              "lg:hidden"
            )}
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={goToNext}
            disabled={!canScrollNext}
            className={classNames(
              "absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10",
              "bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3",
              "transition-all duration-300 flex items-center justify-center",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              "text-white hover:text-blue-400",
              "lg:hidden"
            )}
            aria-label="Next slide"
          >
            <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="group container mx-4 sm:mx-6">
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label="Projects carousel"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  goToPrev();
                } else if (e.key === "ArrowRight") {
                  e.preventDefault();
                  goToNext();
                }
              }}
              className="relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg"
              onMouseEnter={projectEnter}
              onMouseLeave={projectLeave}
            >
              <div className="sr-only" aria-live="polite" aria-atomic="true">
                Slide {activeSlide + 1} of {projects.length}:{" "}
                {projects[activeSlide]?.title}
              </div>
              <motion.ul
                ref={containerRef}
                className="flex cursor-none items-start"
                style={{ x: animatedX }}
                drag="x"
                dragConstraints={{
                  left: -(FALLBACK_WIDTH * (projects.length - 1)),
                  right: FALLBACK_WIDTH,
                }}
                onDragStart={handleDragStart}
                onDragEnd={handleDragSnap}
              >
                {projects.map((article, index) => {
                  const active = index === activeSlide;
                  return (
                    <motion.li
                      key={article.title}
                      ref={(el) => {
                        itemsRef.current[index] = el;
                      }}
                      className={classNames(
                        "group relative shrink-0 select-none px-2 sm:px-3 transition-opacity duration-300",
                        "basis-full sm:basis-1/2 lg:basis-1/3 max-w-full",
                        !active && "opacity-30"
                      )}
                      style={{ willChange: "transform" }}
                      transition={{
                        ease: "easeInOut",
                        duration: 0.5,
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <div className="block" tabIndex={0} draggable={false}>
                        <div className="relative grid place-content-center overflow-hidden rounded-lg bg-[#2D3748]/90 mx-auto h-60 w-60 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
                          <MotionImage
                            src={article.logo}
                            alt={`${article.title} project logo`}
                            className="h-40 sm:h-48 lg:h-60 w-auto object-cover"
                            width={300}
                            height={225}
                            loading="lazy"
                            placeholder="blur"
                            sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 300px"
                          />
                          <div className="absolute inset-0 opacity-0 cursor-grab pointer-events-auto"></div>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-4 sm:mt-6 lg:hidden">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="w-11 h-11 flex items-center justify-center"
                aria-label={`Go to slide ${index + 1}`}
              >
                <span
                  className={classNames(
                    "block transition-all duration-300 rounded-full",
                    index === activeSlide
                      ? "w-8 h-2 sm:w-10 sm:h-2.5 bg-blue-500"
                      : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/30 hover:bg-white/50"
                  )}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="w-full ">
          <div className="w-full flex lg:justify-center">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="w-full lg:max-w-2xl bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg
               text-left lg:text-center border border-neutral-800"
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                {projects[activeSlide].title}
              </h3>

              <p className="mt-2 sm:mt-4 text-sm sm:text-lg leading-relaxed text-gray-300">
                {projects[activeSlide].description}
              </p>

              <div
                className="mt-4 sm:mt-6 flex flex-wrap
                    justify-start lg:justify-center gap-2"
              >
                {projects[activeSlide].technologies.map((tech) => (
                  <ShinyButton key={tech} title={tech} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
