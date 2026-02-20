"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollAnimation = () => {
  const pathname = usePathname();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          entry.target.classList.add("visible");
          // Once revealed, we can stop observing this element
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observeElements = () => {
      const revealElements = document.querySelectorAll(".reveal:not(.visible)");
      revealElements.forEach(el => observer.observe(el));
    };

    // Initial check
    observeElements();

    // Use MutationObserver to detect when new content is added to the DOM
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldCheck = false;
      for (const mutation of mutations) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          shouldCheck = true;
          break;
        }
      }
      if (shouldCheck) {
        observeElements();
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Fallback: Check again after a short delay
    const timer = setTimeout(observeElements, 500);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
};

export default ScrollAnimation;
