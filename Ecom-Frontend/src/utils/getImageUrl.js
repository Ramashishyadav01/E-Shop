export const getImageUrl = (image) => {
  if (!image) return "https://via.placeholder.com/300x300?text=No+Image";

  if (typeof image === "string") {
    if (image.startsWith("http://localhost:8080") || image.startsWith("http://127.0.0.1:8080")) {
      return image.replace(/^http:\/\/(localhost|127\.0\.0\.1):8080/, "https://e-shop-4fgk.onrender.com");
    }
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }
    const cleanImg = image.replace(/^\/+/, "");
    return `https://e-shop-4fgk.onrender.com/images/${cleanImg}`;
  }

  return "https://via.placeholder.com/300x300?text=No+Image";
};
