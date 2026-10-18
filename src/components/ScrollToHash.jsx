import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// react-router doesn't scroll to an in-page #hash or reset scroll on its own
// when the route changes - without this, navigating from a detail page back
// to "/#services" lands you wherever the previous page had scrolled to.
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a tick for the target section to exist post-navigation.
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
