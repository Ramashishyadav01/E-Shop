// Valid Base64-encoded SVG Data URIs (render 100% reliably in all browsers without decoding issues)
export const NO_IMAGE_PLACEHOLDER = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgMzAwIDMwMCI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Y2EzYWYiPk5vIEltYWdlIEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=`;

export const NO_IMAGE_PLACEHOLDER_SM = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM5Y2EzYWYiPk5vIEltZzwvdGV4dD48L3N2Zz4=`;

const getBackendBaseUrl = () => {
  const rawUrl = import.meta.env.VITE_BACK_END_URL || import.meta.env.VITE_API_BASE_URL || 'https://e-shop-4fgk.onrender.com';
  return rawUrl.replace(/\/+$/, '').replace(/\/api$/, '');
};

export const getImageUrl = (image) => {
  if (!image) return NO_IMAGE_PLACEHOLDER;

  if (typeof image === "string") {
    // If image is a Base64 Data URI, return it as-is
    if (image.startsWith("data:")) {
      return image;
    }

    const backendBase = getBackendBaseUrl(); // e.g. "https://e-shop-4fgk.onrender.com"

    // Match localhost or 127.0.0.1 on ANY port (8000, 8080, 3000, etc.)
    if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(image)) {
      return image.replace(/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i, backendBase);
    }

    // Absolute URLs (http:// or https://)
    if (image.startsWith("http://") || image.startsWith("https://")) {
      // Upgrade HTTP to HTTPS if the frontend page is running over HTTPS
      if (typeof window !== "undefined" && window.location.protocol === "https:" && image.startsWith("http://")) {
        return image.replace(/^http:\/\//i, "https://");
      }
      return image;
    }

    // Relative paths (e.g. "bf322204-1ee9-42aa-ad8c-a3c93265466a.jpeg" or "images/...")
    const cleanImg = image.replace(/^\/+/, "");
    if (cleanImg.startsWith("images/")) {
      return `${backendBase}/${cleanImg}`;
    }
    return `${backendBase}/images/${cleanImg}`;
  }

  return NO_IMAGE_PLACEHOLDER;
};
