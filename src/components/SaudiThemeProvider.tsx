import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SaudiSEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const SaudiSEO: React.FC<SaudiSEOProps> = ({
  title = 'مطعمي - أشهى الأطباق السعودية والعالمية',
  description = 'اكتشف أشهى الأطباق السعودية والعالمية في مطعمي. نقدم لكم تجربة طعام فريدة مع أجواء عربية أصيلة وخدمة توصيل سريعة.',
  image = '/images/saudi-restaurant-og.jpg',
  url = 'https://restaurant-rose-phi-29.vercel.app'
}) => {
  return (
    <Helmet>
      <html lang="ar" dir="rtl" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="ar_SA" />
      <meta property="og:site_name" content="مطعمي" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          "name": "مطعمي",
          "description": "مطعم يقدم أشهى الأطباق السعودية والعالمية",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "SA",
            "addressRegion": "الرياض"
          },
          "servesCuisine": "سعودي، عالمي",
          "priceRange": "$$",
          "telephone": "+966-12-345-6789",
          "openingHours": "Mo-Su 06:00-23:00"
        })}
      </script>
    </Helmet>
  );
};
