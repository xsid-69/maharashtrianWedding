export type EventId = "sakharpuda" | "halad" | "sangeet" | "seemant" | "vivah" | "reception";

export const googleMapsSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const pexelsImage = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`;

export const photography = {
  hero: "/images/hero-couple.jpg",
  coupleAtNight: "/images/groom-onkar.jpg",
  celebration: "/images/ceremony-reception.jpg",
  bridalPortrait: "/images/bride-samruddhi.jpg",
  ceremony: "/images/ceremony-vivah.jpg",
  ritualDetail: "/images/ceremony-sakharpuda.jpg",
  haldiCeremony: "/images/ceremony-halad.jpg",
  rings: "/images/ceremony-sakharpuda.jpg",
} as const;

export type WeddingEvent = {
  id: EventId;
  /** मराठी नाव */
  name: string;
  /** विधी / उपशीर्षक */
  subTitle: string;
  /** विधीचे थोडक्यात वर्णन */
  ritual: string;
  displayDate: string;
  isoDate: string;
  day: string;
  month: string;
  weekday: string;
  time: string;
  until: string;
  venue: string;
  city: string;
  dressCode: string;
  description: string;
  image: string;
  fallback: string;
  grade: string;
  featured?: boolean;
};

export type StoryChapter = {
  year: string;
  chapter: string;
  place: string;
  title: string;
  copy: string;
  image: string;
  fallback: string;
};

export type GalleryImage = {
  id: number;
  src: string;
  fallback: string;
  alt: string;
  aspect: "portrait" | "landscape" | "square" | "tall";
};

export const wedding = {
  bride: "समृद्धी",
  brideFull: "चि. सौ. कां. समृद्धी",
  brideSurname: "देशपांडे",
  brideParents: "सौ. सुमित्रा व श्री. विलास देशपांडे",
  groom: "ओंकार",
  groomFull: "चि. ओंकार",
  groomSurname: "कुलकर्णी",
  groomParents: "सौ. अनिता व श्री. प्रकाश कुलकर्णी",
  kicker: "॥ श्री गणेशाय नमः ॥",
  kulswamini: "॥ श्री कुलस्वामिनी प्रसन्न ॥",
  dateMarathi: "२१ नोव्हेंबर २०२६",
  numericDate: "२१ • ११ • २०२६",
  muhurat: "सकाळी ११:२१ वा. (शुभ वृश्चिक लग्न)",
  isoDate: "2026-11-21T11:21:00+05:30",
  location: "पुणे, महाराष्ट्र",
  venue: "राजमुद्रा लॉन्स व बँक्वेट",
  venueAddress: "राजमुद्रा लॉन्स, सिंहगड रस्ता, वडगाव बुद्रुक, पुणे - ४११०४१",
  time: "सकाळी ११:२१ वा.",
  mapUrl: googleMapsSearch("Rajmudra Lawns Sinhagad Road Pune Maharashtra"),
} as const;

export const heroVideo = {
  webm: "/videos/hero-petals.webm",
  mp4: "/videos/hero-petals.mp4",
  poster: "/videos/hero-petals-poster.jpg",
} as const;

export const musicTrack = {
  title: "सानई चौघडा व मंगलाष्टक सूर",
  subtitle: "पारंपरिक महाराष्ट्रीयन विवाह मंगलधुन",
  src: "/music/sanai-sohala.wav",
} as const;

export const musicTracks = [
  musicTrack,
  {
    title: "मंगल वाद्यवृंद व तानपुरा",
    subtitle: "रागाधारित कल्याण व भूप विवाह सूर",
    src: "/music/mangalashtak-ambient.wav",
  },
  {
    title: "ब्यूटिफुल इन व्हाईट (सुमधुर धून)",
    subtitle: "आधुनिक सुरेल वायलिन",
    src: "/music/beautiful-in-white.mp3",
  },
] as const;

export const imageFallbacks = {
  hero: photography.coupleAtNight,
  bride: photography.celebration,
  groom: photography.coupleAtNight,
  wedding: photography.hero,
  venue: photography.celebration,
} as const;

export const events: WeddingEvent[] = [
  {
    id: "sakharpuda",
    name: "साखरपुडा समारंभ",
    subTitle: "वाङ्निश्चय व अंगठी सोहळा",
    ritual: "साखर वाटप आणि नवनात्याची गोड सुरुवात",
    displayDate: "१८ नोव्हेंबर २०२६",
    isoDate: "2026-11-18T17:00:00+05:30",
    day: "१८",
    month: "नोव्हें",
    weekday: "बुधवार",
    time: "सायंकाळी ०५:००",
    until: "रात्री ०८:३०",
    venue: "यशश्री बँक्वेट हॉल",
    city: "कोथरूड, पुणे",
    dressCode: "पारंपरिक पैठणी कुर्ता व काठपदराची साडी",
    description:
      "दोन जीवांचे मनोमिलन, साखर वाटप, अंगठी परिधान आणि दोन्ही परिवारांचा सुमधुर सस्नेह मेळावा.",
    image: "/images/ceremony-sakharpuda.jpg",
    fallback: "/images/ceremony-sakharpuda.jpg",
    grade: "oklch(0.42 0.14 140)", // Emerald Green / Paithani Kantha
  },
  {
    id: "halad",
    name: "हळदी समारंभ",
    subTitle: "मंगळस्नान व हळद लेपन",
    ritual: "सोनेरी हळद, सख्यांचा आनंद व मंगळगीते",
    displayDate: "१९ नोव्हेंबर २०२६",
    isoDate: "2026-11-19T10:00:00+05:30",
    day: "१९",
    month: "नोव्हें",
    weekday: "गुरुवार",
    time: "सकाळी १०:००",
    until: "दुपारी ०१:३०",
    venue: "अमराई प्रांगण (सिंहगड पायथा)",
    city: "पुणे",
    dressCode: "चमचमणारा हळदी पिवळा रंग",
    description:
      "उटी चंदनाची, लेप हळदीचा, साने-चौघड्यांच्या सुरात वधू-वरांना सुवासिनींच्या आशीर्वादाने माखू द्या सोनेरी रंगात!",
    image: "/images/ceremony-halad.jpg",
    fallback: "/images/ceremony-halad.jpg",
    grade: "oklch(0.66 0.17 78)", // Halad Golden Yellow
  },
  {
    id: "sangeet",
    name: "संगीत व संज्योत्सव",
    subTitle: "नाद, ताल आणि आनंदाचा जल्लोष",
    ritual: "पारंपरिक गोंधळ, लावणी व संगीतमय मैफल",
    displayDate: "२० नोव्हेंबर २०२६",
    isoDate: "2026-11-20T18:30:00+05:30",
    day: "२०",
    month: "नोव्हें",
    weekday: "शुक्रवार",
    time: "सायंकाळी ०६:३०",
    until: "रात्री ११:००",
    venue: "राजमुद्रा ग्रँड एरिना",
    city: "पुणे",
    dressCode: "इण्डो-वेस्टर्न किंवा पेशवाई थाट",
    description:
      "ढोल-ताशांचा गजर, जुन्या-नवीन गाण्यांची सुरेल बरसात आणि दोन्ही घराण्यांचा रंगीबेरंगी उत्साहवर्धक नृत्यसोहळा.",
    image: "/images/ceremony-sangeet.jpg",
    fallback: "/images/ceremony-sangeet.jpg",
    grade: "oklch(0.42 0.18 340)", // Rani Pink / Magenta
  },
  {
    id: "seemant",
    name: "सीमांत पूजन व रुखवत",
    subTitle: "वर पक्षाचे स्वागत व रुखवत दर्शन",
    ritual: "गौरहर पूजन आणि समोरासमोर व्याहीभोजन",
    displayDate: "२१ नोव्हेंबर २०२६",
    isoDate: "2026-11-21T08:30:00+05:30",
    day: "२१",
    month: "नोव्हें",
    weekday: "शनिवार",
    time: "सकाळी ०८:३०",
    until: "सकाळी १०:३०",
    venue: "राजमुद्रा लॉन्स, मुख्य दालन",
    city: "पुणे",
    dressCode: "पारंपरिक महाराष्ट्रीयन पोषाख",
    description:
      "वर पक्षाचे पारंपरिक अत्तर-गुलाब व पाद्यपूजनाने स्वागत, कलात्मक रुखवताची मांडणी व वधूकडून कुलदेवता गौरहर पूजन.",
    image: "/images/ceremony-seemant.jpg",
    fallback: "/images/ceremony-seemant.jpg",
    grade: "oklch(0.48 0.12 60)", // Chandani Sandalwood / Zari
  },
  {
    id: "vivah",
    name: "शुभ विवाह सोहळा",
    subTitle: "मंगलाष्टके, अंतरपाट व सप्तपदी",
    ritual: "शुभमंगल सावधान! सात पावले, सात जन्म",
    displayDate: "२१ नोव्हेंबर २०२६",
    isoDate: wedding.isoDate,
    day: "२१",
    month: "नोव्हें",
    weekday: "शनिवार",
    time: "सकाळी ११:२१",
    until: "दुपारी ०३:००",
    venue: "राजमुद्रा मुख्य विवाह मंडप",
    city: "पुणे",
    dressCode: "शाही नऊवारी पैठणी व पेशवाई फेटा",
    description:
      "शुभमंगल सावधान! अंतरपाट दूर होताच अक्षतांचा वर्षाव, मंगळसूत्र बंधन, सप्तपदी आणि अग्नीच्या साक्षीने जीवनसाथीचा पवित्र संकल्प.",
    image: "/images/ceremony-vivah.jpg",
    fallback: "/images/hero-couple.jpg",
    grade: "oklch(0.34 0.16 22)", // Royal Kumkum Crimson
    featured: true,
  },
  {
    id: "reception",
    name: "स्वागत समारंभ व स्नेहभोजन",
    subTitle: "सत्यनारायण महापूजा व पंगत",
    ritual: "आशीर्वाद, सत्कार व पारंपरिक स्नेहभोजन",
    displayDate: "२२ नोव्हेंबर २०२६",
    isoDate: "2026-11-22T19:00:00+05:30",
    day: "२२",
    month: "नोव्हें",
    weekday: "रविवार",
    time: "सायंकाळी ०७:००",
    until: "रात्री १०:३०",
    venue: "द ग्रँड पॅलेस बॉलरूम",
    city: "सेनापती बापट रोड, पुणे",
    dressCode: "रॉयल इव्हनिंग वेअर किंवा सिल्क साडी",
    description:
      "नवदांपत्याला शुभाशीर्वाद देण्यासाठी आयोजित सस्नेह मेळावा आणि अस्सल महाराष्ट्रीयन पुरणपोळी, मसालेभात व बासुंदीची पंगत.",
    image: "/images/ceremony-reception.jpg",
    fallback: "/images/ceremony-reception.jpg",
    grade: "oklch(0.32 0.1 230)", // Royal Peacock Midnight
  },
];

export const scheduleMeta = {
  kicker: "॥ शुभ सोहळा • विवाह विधी ॥",
  title: "सहा पारंपरिक सोहळे.\nएक मंगल पर्व.",
  lede:
    "प्रत्येक सोहळ्याची आपली एक वेळ, आपले वैशिष्ट्य आणि परंपरा आहे. संपूर्ण विवाह सोहळ्याची रूपरेषा येथे दिली आहे.",
  closing: {
    heading: "परगावाहून येणाऱ्या पाहुण्यांसाठी विशेष सोय",
    copy: "कृपया आपल्या उपस्थितीची आगाऊ नोंद (RSVP) करावी, जेणेकरून निवास आणि प्रवासाची उत्तम व्यवस्था करता येईल.",
  },
} as const;

export const story: StoryChapter[] = [
  {
    year: "२०२०",
    chapter: "पहिली ओळख",
    place: "फर्ग्युसन कॉलेज रस्ता, पुणे",
    title: "पावसात उमललेली एक साधी भेट",
    copy: "एक हलकीशी पावसाची सर, वाफाळलेला चहा आणि सहज सुरू झालेला संवाद... ज्याने नंतर आमच्या आयुष्याला नवा अर्थ दिला.",
    image: "/images/story-pune-monsoon.jpg",
    fallback: "/images/story-pune-monsoon.jpg",
  },
  {
    year: "२०२२",
    chapter: "सहवास व प्रवास",
    place: "सह्याद्रीच्या कुशीत, सिंहगड",
    title: "मैत्रीचे रेशीमबंध अधिक घट्ट झाले",
    copy: "सह्याद्रीच्या वाटांवर भटकंती करताना, एकमेकांचे विचार, मूल्ये आणि स्वप्ने समजली. विश्वास अधिक दृढ होत गेला.",
    image: "/images/story-sinhagad.jpg",
    fallback: "/images/story-sinhagad.jpg",
  },
  {
    year: "२०२४",
    chapter: "मनाचा कौल",
    place: "चांदण्यांच्या साक्षीने",
    title: "एक गोड प्रश्न, आनंदाश्रू आणि होकार",
    copy: "मनात आधीपासूनच असलेले स्थान एका शब्दाने अमर झाले. दोन्ही कुटुंबांच्या संमतीने आमच्या प्रवासाला नवसंजीवनी मिळाली.",
    image: "/images/bride-samruddhi.jpg",
    fallback: "/images/bride-samruddhi.jpg",
  },
  {
    year: "२०२६",
    chapter: "शुभमंगल सावधान",
    place: "पुणे, संपूर्ण आप्तेष्टांच्या साक्षीत",
    title: "सप्तपदी आणि अखंड सहजीवन",
    copy: "आता प्रत्येक पाऊल एकत्र टाकणार आहोत. मंगलाष्टकांच्या पवित्र सुरात, आपल्या सर्वांच्या आशीर्वादाने नवा संसार सुरू होत आहे.",
    image: "/images/ceremony-vivah.jpg",
    fallback: "/images/hero-couple.jpg",
  },
];

export const gallery: GalleryImage[] = [
  {
    id: 1,
    src: "/images/hero-couple.jpg",
    fallback: "/images/hero-couple.jpg",
    alt: "वधू-वरांचे विवाह मंडपातील मंगलाष्टक क्षणांचे सुरेख छायाचित्र",
    aspect: "tall",
  },
  {
    id: 2,
    src: "/images/bride-samruddhi.jpg",
    fallback: "/images/bride-samruddhi.jpg",
    alt: "पारंपरिक नऊवारी पैठणी, नाकात मोत्याची नथ आणि चंद्रकोर परिधान केलेली वधू",
    aspect: "portrait",
  },
  {
    id: 3,
    src: "/images/ceremony-sangeet.jpg",
    fallback: "/images/ceremony-sangeet.jpg",
    alt: "तुतारी, ढोल-ताशा आणि पारंपारिक गोंधळ संगीतोत्सव",
    aspect: "landscape",
  },
  {
    id: 4,
    src: "/images/ceremony-seemant.jpg",
    fallback: "/images/ceremony-seemant.jpg",
    alt: "पारंपरिक रुखवत, मोदक आणि सीमांत पूजन सोहळा",
    aspect: "landscape",
  },
  {
    id: 5,
    src: "/images/ceremony-halad.jpg",
    fallback: "/images/ceremony-halad.jpg",
    alt: "हळदी समारंभातील कुटुंब आणि आप्तेष्टांचा मनसोक्त आनंद",
    aspect: "portrait",
  },
  {
    id: 6,
    src: "/images/ceremony-sakharpuda.jpg",
    fallback: "/images/ceremony-sakharpuda.jpg",
    alt: "साखरपुडा समारंभातील वाङ्निश्चय व अंगठी सोहळा",
    aspect: "square",
  },
  {
    id: 7,
    src: "/images/groom-onkar.jpg",
    fallback: "/images/groom-onkar.jpg",
    alt: "वर चि. ओंकार - पेशवाई फेटा व राजेशाही पोषाख",
    aspect: "portrait",
  },
  {
    id: 8,
    src: "/images/ceremony-vivah.jpg",
    fallback: "/images/ceremony-vivah.jpg",
    alt: "सप्तपदी विधी आणि अग्नीच्या साक्षीने चाललेला पवित्र विवाह सोहळा",
    aspect: "landscape",
  },
];

export const blessings = [
  "॥ श्री गणेशाय नमः ॥",
  "॥ शुभमंगल सावधान ॥",
  "॥ सस्नेह निमंत्रण ॥",
  "॥ अक्षतांचा वर्षाव ॥",
  "॥ सात पावले सात जन्म ॥",
  "॥ अखंड सौभाग्यवती भव ॥",
  "॥ नातं रेशीमगाठीचं ॥",
  "॥ आनंदाचा सोहळा ॥",
];
