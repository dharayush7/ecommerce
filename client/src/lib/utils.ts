import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shareOnWhatsApp = (productId: string, productName: string) => {
  // Construct your product URL
  const productUrl = `${window.location.origin}/product/${productId}`;

  // Create the WhatsApp share URL
  const whatsappUrl = `https://wa.me/?text=Check out this product: ${productName} - ${encodeURIComponent(
    productUrl
  )}`;

  // Open in a new tab
  window.open(whatsappUrl, "_blank");
};

export const shareOnInstagram = (productId: string, productName: string) => {
  const productUrl = `${window.location.origin}/products/${productId}`;
  const message = `Check out this product: ${productName} - ${productUrl}`;

  // For mobile devices - opens Instagram app with pre-filled caption
  if (
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    window.open(
      `instagram://library?AssetPath=${encodeURIComponent(
        productUrl
      )}&InstagramCaption=${encodeURIComponent(message)}`,
      "_blank"
    );
  }
  // For desktop - opens Instagram web in new tab
  else {
    window.open(
      `https://www.instagram.com/?url=${encodeURIComponent(productUrl)}`,
      "_blank"
    );
  }
};

export const shareOnFacebook = (productId: string, productName: string) => {
  const productUrl = `${window.location.origin}/products/${productId}`;

  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      productUrl
    )}&quote=${encodeURIComponent(`Check out ${productName}`)}`,
    "facebook-share-dialog",
    "width=626,height=436"
  );
  return false;
};

export const calcTotal = (prices: number[]) => {
  let total = 0;
  prices.forEach((e) => {
    total += e;
  });
  return total;
};
