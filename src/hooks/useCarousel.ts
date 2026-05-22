import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, type PanInfo } from "framer-motion";

const DRAG_THRESHOLD = 150;
export const FALLBACK_WIDTH = 509;

interface UseCarouselOptions {
  itemCount: number;
  startIndex?: number;
}

export function useCarousel({ itemCount, startIndex = 0 }: UseCarouselOptions) {
  const containerRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = useState(startIndex);
  const [isDragging, setIsDragging] = useState(false);
  const offsetX = useMotionValue(0);
  const animatedX = useSpring(offsetX, { damping: 20, stiffness: 150 });

  const canScrollPrev = activeSlide > 0;
  const canScrollNext = activeSlide < itemCount - 1;

  const calculateActiveSlideFromOffset = (offset: number) => {
    if (!containerRef.current || itemsRef.current.length === 0) return;
    const containerWidth = containerRef.current.offsetWidth;
    const isMobile = window.innerWidth < 768;
    const offsetAdjustment = isMobile ? -30 : 0;
    let accumulatedWidth = 0;
    let closestIndex = 0;
    let closestDistance = Infinity;
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      const itemWidth = item.offsetWidth;
      const itemCenter = accumulatedWidth + itemWidth / 2 + offset;
      const containerCenter = containerWidth / 2 + offsetAdjustment;
      const distance = Math.abs(itemCenter - containerCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
      accumulatedWidth += itemWidth;
    });
    setActiveSlide((prev) => (closestIndex !== prev ? closestIndex : prev));
  };

  const goToSlide = (index: number) => {
    if (index < 0 || index >= itemCount) return;
    if (!containerRef.current || !itemsRef.current[index]) return;
    const item = itemsRef.current[index]!;
    const containerWidth = containerRef.current.offsetWidth;
    const itemWidth = item.offsetWidth;
    const isMobile = window.innerWidth < 768;
    const offsetAdjustment = isMobile ? -30 : 0;
    const newOffset =
      -(itemWidth * index) +
      (containerWidth - itemWidth) / 2 +
      offsetAdjustment;
    offsetX.set(newOffset);
    setActiveSlide(index);
  };

  const goToPrev = () => {
    if (canScrollPrev) goToSlide(activeSlide - 1);
  };
  const goToNext = () => {
    if (canScrollNext) goToSlide(activeSlide + 1);
  };

  const handleDragStart = () => {
    containerRef.current?.setAttribute("data-dragging", "true");
    setIsDragging(true);
  };

  const handleDragSnap = (
    _: MouseEvent | TouchEvent | PointerEvent,
    { offset: { x: dragOffset } }: PanInfo
  ) => {
    setIsDragging(false);
    containerRef.current?.removeAttribute("data-dragging");
    animatedX.stop();

    const currentOffset = offsetX.get();

    if (
      Math.abs(dragOffset) < DRAG_THRESHOLD ||
      (!canScrollPrev && dragOffset > 0) ||
      (!canScrollNext && dragOffset < 0)
    ) {
      animatedX.set(currentOffset);
      calculateActiveSlideFromOffset(currentOffset);
      return;
    }

    let offsetWidth = 0;
    let newActiveSlide = activeSlide;

    for (
      let i = activeSlide;
      dragOffset > 0 ? i >= 0 : i < itemsRef.current.length;
      dragOffset > 0 ? i-- : i++
    ) {
      const item = itemsRef.current[i];
      if (item === null) continue;
      const itemOffset = item.offsetWidth;
      const prevItemWidth =
        itemsRef.current[i - 1]?.offsetWidth ?? FALLBACK_WIDTH;
      const nextItemWidth =
        itemsRef.current[i + 1]?.offsetWidth ?? FALLBACK_WIDTH;

      if (
        (dragOffset > 0 && dragOffset > offsetWidth + itemOffset && i > 1) ||
        (dragOffset < 0 &&
          dragOffset < offsetWidth + -itemOffset &&
          i < itemsRef.current.length - 2)
      ) {
        dragOffset > 0
          ? (offsetWidth += prevItemWidth)
          : (offsetWidth -= nextItemWidth);
        continue;
      }

      if (dragOffset > 0) {
        offsetX.set(currentOffset + offsetWidth + prevItemWidth);
        newActiveSlide = i - 1;
      } else {
        offsetX.set(currentOffset + offsetWidth - nextItemWidth);
        newActiveSlide = i + 1;
      }
      break;
    }

    setActiveSlide(newActiveSlide);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (itemsRef.current[startIndex] && containerRef.current) {
        const startItem = itemsRef.current[startIndex]!;
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = startItem.offsetWidth;
        const isMobile = window.innerWidth < 768;
        const offsetAdjustment = isMobile ? -30 : 0;
        const initialOffset =
          -(itemWidth * startIndex) +
          (containerWidth - itemWidth) / 2 +
          offsetAdjustment;
        offsetX.set(initialOffset);
        setActiveSlide(startIndex);
      }
    }, 100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let pending: ReturnType<typeof setTimeout> | null = null;
    const unsubscribe = animatedX.on("change", (latest) => {
      if (isDragging) return;
      if (pending) clearTimeout(pending);
      pending = setTimeout(() => {
        calculateActiveSlideFromOffset(latest);
        pending = null;
      }, 200);
    });
    return () => {
      if (pending) clearTimeout(pending);
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  return {
    containerRef,
    itemsRef,
    activeSlide,
    isDragging,
    animatedX,
    canScrollPrev,
    canScrollNext,
    goToSlide,
    goToPrev,
    goToNext,
    handleDragStart,
    handleDragSnap,
  };
}
