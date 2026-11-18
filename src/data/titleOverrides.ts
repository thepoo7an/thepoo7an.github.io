// src/data/titleOverrides.ts
// Manual curated bilingual overrides for synced portfolio items
// Maps platform-specific titles/captions to clean Persian & English editorial titles

export interface BilingualTitle {
  fa: string;
  en: string;
}

export const BILINGUAL_TITLE_OVERRIDES: Record<string, BilingualTitle> = {
  // TikTok items
  '#فوریو #سجادشاهی #سجاد_شاهی': {
    fa: 'تایپوگرافی لیریک — سبک دارک سینمایی',
    en: 'Dark Cinematic Lyric Typography',
  },
  '#سجادشاهی #فوریووو #fyp #foryou #fypシ': {
    fa: 'تایپوگرافی لیریک — سبک دارک سینمایی',
    en: 'Dark Cinematic Lyric Typography',
  },
  '#فوریو #حسین_تی_ام #tiem': {
    fa: 'تایپوگرافی لیریک — ریتمیک و مدرن',
    en: 'Rhythmic Modern Lyric Typography',
  },
  '#فوریو #بیگ_شگی': {
    fa: 'ادیت ویدیو + تایپوگرافی لیریک',
    en: 'Video Edit + Lyric Typography',
  },
  'big shaggy': {
    fa: 'ادیت ویدیو + تایپوگرافی لیریک',
    en: 'Video Edit + Lyric Typography',
  },
  '#فوریو #شایان_یو': {
    fa: 'تایپوگرافی لیریک — سبک احساسی و ترپ',
    en: 'Melodic & Trap Lyric Typography',
  },
  '#فوریو #پوری #گادپوری': {
    fa: 'تایپوگرافی لیریک — سبک رپ و اکشن',
    en: 'High-Tempo Rap Lyric Typography',
  },
  '#فوریو #مهیار': {
    fa: 'تایپوگرافی لیریک — استایل مینیمال',
    en: 'Minimal Lyric Typography Style',
  },
  '#فوریو #دورچی': {
    fa: 'تایپوگرافی لیریک — تمپوی ملایم',
    en: 'Mid-Tempo Lyric Typography • Dorcci',
  },
  '#دورچی #ادیت #تایپوگرافی #دلتنگی #fyp': {
    fa: 'تایپوگرافی لیریک — تمپوی ملایم',
    en: 'Mid-Tempo Lyric Typography • Dorcci',
  },
  '💔#دورچی #ادیت #fyp #فوریووو #دپ': {
    fa: 'تایپوگرافی لیریک — تمپوی ملایم',
    en: 'Atmospheric Lyric Typography • Dorcci',
  },
  'وِلت نکردم. #dorcci #foru #فوریو': {
    fa: 'تایپوگرافی لیریک — تمپوی ملایم',
    en: 'Lyric Typography • Dorcci',
  },
  'نمیخواستم بِکشِ قفس دورم! #ادیت #تایپوگرافی #hoodadk4': {
    fa: 'تایپوگرافی لیریک و موشن',
    en: 'Lyric Typography & Motion • Hoodadk4',
  },
  'خراب کردی... #شایان_اشراقی #فوریو': {
    fa: 'تایپوگرافی لیریک موزیک',
    en: 'Lyric Typography • Shayan Eshraghi',
  },
  '#fyp #فوریووو #دپ #fypシ #دلتنگی': {
    fa: 'تایپوگرافی لیریک — سبک احساسی',
    en: 'Atmospheric Melodic Lyric Edit',
  },
  '#فوریو': {
    fa: 'تایپوگرافی لیریک موزیک',
    en: 'Music Lyric Typography Reel',
  },
  '❤️‍🩹🩸': {
    fa: 'تایپوگرافی لیریک موزیک',
    en: 'Music Lyric Typography',
  },
  'Tiem🤘🏻': {
    fa: 'تایپوگرافی لیریک — ریتمیک',
    en: 'Rhythmic Lyric Typography • Tiem',
  },
  '..❤️‍🩹 #کیارش': {
    fa: 'تایپوگرافی لیریک — سبک دارک',
    en: 'Dark Lyric Typography • Kiarash',
  },
  '🩻 #دورچی #فوریو #dorcci #foru': {
    fa: 'تایپوگرافی لیریک موزیک',
    en: 'Lyric Typography • Dorcci',
  },
  '#capcut #ucl #arsenal #realmadrid #fyp': {
    fa: 'ادیت ویدیو و ریتم‌سینک',
    en: 'Video Edit & Beat-Sync',
  },
  '#CapCut #messi #goat #barcelona #fyp': {
    fa: 'ادیت ویدیو و ریتم‌سینک',
    en: 'Video Edit & Beat-Sync',
  },
  'ایران تسلیت. #iran': {
    fa: 'تایپوگرافی ویدیویی',
    en: 'Editorial Video Typography',
  },

  // Instagram items
  'موزیک ریلز • Tiem': {
    fa: 'تایپوگرافی لیریک — ریتمیک و مدرن',
    en: 'Music Reel • Tiem',
  },
  'ادیت ریلز • Hossein Tiem': {
    fa: 'تایپوگرافی لیریک — ریتمیک و مدرن',
    en: 'Reel Edit • Hossein Tiem',
  },
  'تایپوگرافی لیریک • Dorcci': {
    fa: 'تایپوگرافی لیریک — تمپوی ملایم',
    en: 'Lyric Typography • Dorcci',
  },
  'موزیک ویدیو و لیریک • Yxngzi': {
    fa: 'موزیک ویدیو و تایپوگرافی لیریک',
    en: 'Music Video & Lyric • Yxngzi',
  },
  'تایپوگرافی موزیک • Elnnaazi': {
    fa: 'تایپوگرافی لیریک موزیک',
    en: 'Music Typography • Elnnaazi',
  },
  'تایپوگرافی سینمایی | موزیک ریلز': {
    fa: 'تایپوگرافی سینمایی | موزیک ریلز',
    en: 'Cinematic Music Reel Typography',
  },

  // YouTube items
  '#فوریو #مهیاد #mahyad': {
    fa: 'تایپوگرافی لیریک — سبک ریتمیک',
    en: 'Rhythmic Lyric Typography • Mahyad',
  },
  '#فوریو #samilone #سمی_لون': {
    fa: 'موزیک ریلز و تایپوگرافی • سمی لون',
    en: 'Music Reel & Typography • Samilone',
  },
  '#ادیت #تایپو #تایپوگرافی #هیپهاپولوژیست #مامان #مادر': {
    fa: 'تایپوگرافی لیریک و ادیت سینمایی • هیپهاپولوژیست',
    en: 'Lyric Typography & Cinematic Edit • Hiphopologist',
  },
  'ترند این روزا✨#تایپوگرافی #ادیت #ترند': {
    fa: 'تایپوگرافی لیریک — ترند ریتمیک',
    en: 'Trending Rhythmic Lyric Typography',
  },
  '❤️‍🩹🩸#مهیار #ادیت #تایپوگرافی': {
    fa: 'تایپوگرافی احساسی لیریک • مهیار',
    en: 'Emotional Lyric Typography • Mahyar',
  },
  '#فوریو #متین_فتاحی': {
    fa: 'تایپوگرافی لیریک • متین فتاحی',
    en: 'Lyric Typography • Matin Fattahi',
  },
  '#فوریو #vayne': {
    fa: 'تایپوگرافی لیریک و موشن • Vayne',
    en: 'Lyric Typography & Motion • Vayne',
  },
  '#فوریو #سجاد_شاهی': {
    fa: 'تایپوگرافی لیریک — سبک دارک سینمایی',
    en: 'Dark Cinematic Lyric Typography',
  },
  '#فوریو #مسین': {
    fa: 'تایپوگرافی لیریک و ادیت ریتمیک',
    en: 'Rhythmic Lyric Typography • Messin',
  },
  '#ادیت #تایپوگرافی #دورچی': {
    fa: 'تایپوگرافی لیریک • دورچی',
    en: 'Lyric Typography • Dorcci',
  },
  '#ادیت #تایپوگرافی': {
    fa: 'تایپوگرافی و ادیت ریتمیک موزیک',
    en: 'Rhythmic Music Edit & Typography',
  },
  'قفلیع شایانو شنیدین؟؟✨ #شایان_یو #shayanyo': {
    fa: 'تایپوگرافی لیریک • شایان یو',
    en: 'Melodic Trap Lyric Edit • Shayan Yo',
  },
};

export const TITLE_OVERRIDES: Record<string, string> = Object.fromEntries(
  Object.entries(BILINGUAL_TITLE_OVERRIDES).map(([key, val]) => [key, val.fa])
);

const PLATFORM_FALLBACKS: Record<string, BilingualTitle> = {
  youtube: {
    fa: 'ویدیو یوتیوب — تایپوگرافی لیریک',
    en: 'YouTube Shorts — Lyric Typography',
  },
  instagram: {
    fa: 'ریلز اینستاگرام — تایپوگرافی لیریک',
    en: 'Instagram Reel — Lyric Typography',
  },
  tiktok: {
    fa: 'ویدیو تیک‌تاک — تایپوگرافی لیریک',
    en: 'TikTok Release — Lyric Typography',
  },
};

const DEFAULT_FALLBACK: BilingualTitle = {
  fa: 'تایپوگرافی لیریک موزیک',
  en: 'Music Lyric Typography',
};

function hasPersianScript(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

export function getBilingualDisplayTitle(rawTitle: string, platform: string): BilingualTitle {
  const platformFallback = PLATFORM_FALLBACKS[platform] || DEFAULT_FALLBACK;
  if (!rawTitle) {
    return platformFallback;
  }

  const trimmed = rawTitle.trim();
  const matched = BILINGUAL_TITLE_OVERRIDES[rawTitle] || BILINGUAL_TITLE_OVERRIDES[trimmed];
  if (matched) {
    return matched;
  }

  const cleanText = trimmed.replace(/#\S+/g, '').trim();
  if (cleanText.length >= 4 && !/^Video #\d+$/i.test(cleanText)) {
    return {
      fa: cleanText,
      // Avoid leaking raw Persian caption strings into English UI when no EN override exists
      en: hasPersianScript(cleanText) ? platformFallback.en : cleanText,
    };
  }

  return platformFallback;
}

export function getDisplayTitle(rawTitle: string, platform: string): string {
  return getBilingualDisplayTitle(rawTitle, platform).fa;
}
