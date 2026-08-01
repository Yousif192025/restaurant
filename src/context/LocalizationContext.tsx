import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LocalizationContextType {
  locale: 'ar' | 'en';
  setLocale: (locale: 'ar' | 'en') => void;
  currency: string;
  currencySymbol: string;
  formatPrice: (amount: number) => string;
  formatDate: (date: Date) => string;
  isRTL: boolean;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');

  const formatPrice = (amount: number): string => {
    if (locale === 'ar') {
      return `${amount} ر.س`;
    }
    return `SAR ${amount}`;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isRTL = locale === 'ar';

  return (
    <LocalizationContext.Provider value={{
      locale,
      setLocale,
      currency: 'SAR',
      currencySymbol: 'ر.س',
      formatPrice,
      formatDate,
      isRTL
    }}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LocalizationContext.Provider>
  );
};
