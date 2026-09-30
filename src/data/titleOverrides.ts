// src/data/titleOverrides.ts
// Manual overrides for synced portfolio items to prevent artist promotion
// Maps platform-specific IDs or titles to professional Persian descriptions

export const TITLE_OVERRIDES: Record<string, string> = {
  // TikTok items
  '#فوریو #سجادشاهی #سجاد_شاهی': 'تایپوگرافی لیریک — سبک دارک سینمایی',
  '#سجادشاهی #فوریووو #fyp #foryou #fypシ': 'تایپوگرافی لیریک — سبک دارک سینمایی',
  '#فوریو #حسین_تی_ام #tiem': 'تایپوگرافی لیریک — ریتمیک و مدرن',
  '#فوریو #بیگ_شگی': 'ادیت ویدیو + تایپوگرافی لیریک',
  'big shaggy': 'ادیت ویدیو + تایپوگرافی لیریک',
  '#فوریو #شایان_یو': 'تایپوگرافی لیریک — سبک احساسی و ترپ',
  '#فوریو #پوری #گادپوری': 'تایپوگرافی لیریک — سبک رپ و اکشن',
  '#فوریو #مهیار': 'تایپوگرافی لیریک — استایل مینیمال',
  '#فوریو #دورچی': 'تایپوگرافی لیریک — تمپوی ملایم',
  '#دورچی #ادیت #تایپوگرافی #دلتنگی #fyp': 'تایپوگرافی لیریک — تمپوی ملایم',
  '💔#دورچی #ادیت #fyp #فوریووو #دپ': 'تایپوگرافی لیریک — تمپوی ملایم',
  'وِلت نکردم. #dorcci #foru #فوریو': 'تایپوگرافی لیریک — تمپوی ملایم',
  'وِلت نکردم. #dorcci #foru #فوریو ': 'تایپوگرافی لیریک — تمپوی ملایم',
  'نمیخواستم بِکشِ قفس دورم! #ادیت #تایپوگرافی #hoodadk4': 'تایپوگرافی لیریک و موشن',
  'نمیخواستم بِکشِ قفس دورم! #ادیت #تایپوگرافی #hoodadk4 ': 'تایپوگرافی لیریک و موشن',
  'خراب کردی... #شایان_اشراقی #فوریو': 'تایپوگرافی لیریک موزیک',
  'خراب کردی... #شایان_اشراقی #فوریو ': 'تایپوگرافی لیریک موزیک',
  '#fyp #فوریووو #دپ #fypシ #دلتنگی': 'تایپوگرافی لیریک — سبک احساسی',
  '#فوریو': 'تایپوگرافی لیریک موزیک',
  '#فوریو ': 'تایپوگرافی لیریک موزیک',
  '❤️‍🩹🩸': 'تایپوگرافی لیریک موزیک',
  'Tiem🤘🏻': 'تایپوگرافی لیریک — ریتمیک',
  '..❤️‍🩹 #کیارش': 'تایپوگرافی لیریک — سبک دارک',
  '..❤️‍🩹 #کیارش ': 'تایپوگرافی لیریک — سبک دارک',
  '🩻 #دورچی #فوریو #dorcci #foru': 'تایپوگرافی لیریک موزیک',
  '🩻 #دورچی #فوریو #dorcci #foru ': 'تایپوگرافی لیریک موزیک',
  '#capcut #ucl #arsenal #realmadrid #fyp': 'ادیت ویدیو و ریتم‌سینک',
  '#capcut #ucl #arsenal #realmadrid #fyp ': 'ادیت ویدیو و ریتم‌سینک',
  '#CapCut #messi #goat #barcelona #fyp': 'ادیت ویدیو و ریتم‌سینک',
  '#CapCut #messi #goat #barcelona #fyp ': 'ادیت ویدیو و ریتم‌سینک',
  'ایران تسلیت. #iran': 'تایپوگرافی ویدیویی',
  'ایران تسلیت. #iran ': 'تایپوگرافی ویدیویی',

  // Instagram items
  'موزیک ریلز • Tiem': 'تایپوگرافی لیریک — ریتمیک و مدرن',
  'ادیت ریلز • Hossein Tiem': 'تایپوگرافی لیریک — ریتمیک و مدرن',
  'تایپوگرافی لیریک • Dorcci': 'تایپوگرافی لیریک — تمپوی ملایم',
  'موزیک ویدیو و لیریک • Yxngzi': 'موزیک ویدیو و تایپوگرافی لیریک',
  'تایپوگرافی موزیک • Elnnaazi': 'تایپوگرافی لیریک موزیک',
  'تایپوگرافی سینمایی | موزیک ریلز': 'تایپوگرافی سینمایی | موزیک ریلز',

  // YouTube items
  '#فوریو #مهیاد #mahyad': 'تایپوگرافی لیریک — سبک ریتمیک',
};

// Helper function to get display title
export function getDisplayTitle(rawTitle: string, platform: string): string {
  if (!rawTitle) {
    const fallbacks: Record<string, string> = {
      'youtube': 'ویدیو یوتیوب — تایپوگرافی لیریک',
      'instagram': 'ریلز اینستاگرام — تایپوگرافی لیریک',
      'tiktok': 'ویدیو تیکتاک — تایپوگرافی لیریک',
    };
    return fallbacks[platform] || 'تایپوگرافی لیریک موزیک';
  }

  const trimmed = rawTitle.trim();

  // First try exact match
  if (TITLE_OVERRIDES[rawTitle]) {
    return TITLE_OVERRIDES[rawTitle];
  }
  if (TITLE_OVERRIDES[trimmed]) {
    return TITLE_OVERRIDES[trimmed];
  }

  // If the title starts with hashtags like # or contains purely hashtags, don't show raw platform tags
  if (trimmed.startsWith('#')) {
    const fallbacks: Record<string, string> = {
      'youtube': 'ویدیو یوتیوب — تایپوگرافی لیریک',
      'instagram': 'ریلز اینستاگرام — تایپوگرافی لیریک',
      'tiktok': 'ویدیو تیکتاک — تایپوگرافی لیریک',
    };
    return fallbacks[platform] || 'تایپوگرافی لیریک موزیک';
  }

  // Fallback: generic professional titles by platform
  const fallbacks: Record<string, string> = {
    'youtube': 'ویدیو یوتیوب — تایپوگرافی لیریک',
    'instagram': 'ریلز اینستاگرام — تایپوگرافی لیریک',
    'tiktok': 'ویدیو تیکتاک — تایپوگرافی لیریک',
  };

  return fallbacks[platform] || 'تایپوگرافی لیریک موزیک';
}
