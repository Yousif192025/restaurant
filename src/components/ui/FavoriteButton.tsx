import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/features/favorites/favoritesStore";

interface FavoriteButtonProps {
  productId: string;
  size?: "sm" | "lg";
}

export function FavoriteButton({ productId, size = "sm" }: FavoriteButtonProps) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(productId));
  const toggle = useFavoritesStore((s) => s.toggle);
  const dims = size === "lg" ? "h-11 w-11" : "h-9 w-9";
  const iconDims = size === "lg" ? "h-5 w-5" : "h-4 w-4";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`flex ${dims} items-center justify-center rounded-full bg-parchment-100/90 dark:bg-forest-950/80 backdrop-blur transition-transform active:scale-90`}
    >
      <Heart
        className={`${iconDims} transition-colors ${isFavorite ? "fill-ember-500 text-ember-500" : "text-forest-900 dark:text-parchment-100"}`}
      />
    </button>
  );
}
