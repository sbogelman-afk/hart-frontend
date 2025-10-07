/***************
 * CONFIG
 ***************/
const EMAILJS_SERVICE_ID = "service_op12pek";
const EMAILJS_TEMPLATE_ID = "template_5amo8ib";
const EMAILJS_PUBLIC_KEY = "9CnCLpzz0nKl_y4gf";

// Initialize EmailJS
document.addEventListener("DOMContentLoaded", () => {
  if (window.emailjs && emailjs.init) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
});

/***************
 * TRANSLATIONS
 ***************/
const t = {
  en: {
    tagline: "Human-AI Relationship & Triage — Intake",
    welcome: "Welcome! Please complete this intake to help us prepare guidance for you.",
    form_id: "Form ID",
    form_date: "Date",
    privacy_note: "We do not collect personal identifiers. We only ask for an email to send your evaluation.",

    emergency_header: "Emergency red flags",
    emergency_note: "If any apply, stop and seek emergency care.",
    rf_chest_pain: "Severe chest pain",
    rf_severe_sob: "Severe shortness of breath",
    rf_stroke: "Facial droop or new weakness",
    rf_bleeding: "Uncontrolled bleeding",
    rf_confusion: "Severe confusion",
    rf_suicidal: "Suicidal thoughts",
    call911_title: "Possible emergency.",
    call911_text: "Please call 911 or go to the nearest emergency department now.",

    sect_symptoms: "Symptoms",
    symptoms_note: "Select all that apply:",
    s_cough: "Cough",
    s_chest_pain: "Chest pain",
    s_sob: "Shortness of breath",
    s_fever: "Fever",
    s_fatigue: "Fatigue",
    s_headache: "Headache",
    s_nausea: "Nausea",
    s_dizziness: "Dizziness",
    s_palpitations: "Palpitations",
    other_symptoms: "Other (optional)",

    sect_followups: "Follow-up Questions",

    /* cough */
    fu_cough_title: "Cough details",
    fu_cough_type_lbl: "Type",
    fu_cough_type_dry: "Dry",
    fu_cough_type_wet: "Wet / productive",
    fu_cough_duration_lbl: "Duration",
    fu_cough_duration_ph: "e.g., 3 days, 2 weeks",
    fu_cough_sputum_lbl: "Mucus present?",
    fu_cough_sputum_clear: "Yes — clear",
    fu_cough_sputum_yellow: "Yes — yellow/green",
    fu_cough_sputum_bloody: "Yes — bloody",
    fu_cough_fever_lbl: "Fever?",
    fu_cough_fever_low: "Low-grade",
    fu_cough_fever_high: "High",

    /* chest pain */
    fu_cp_title: "Chest pain details",
    fu_cp_onset_lbl: "Onset",
    fu_cp_onset_ph: "e.g., sudden, gradual; when did it start?",
    fu_cp_character_lbl: "Character",
    fu_cp_char_pressure: "Pressure",
    fu_cp_char_sharp: "Sharp",
    fu_cp_char_burning: "Burning",
    fu_cp_duration_lbl: "Duration/frequency",
    fu_cp_duration_ph: "seconds? minutes? constant/episodic?",
    fu_cp_exertion_lbl: "Worse with exertion?",
    fu_cp_radiation_lbl: "Radiation",
    fu_cp_rad_none: "None",
    fu_cp_rad_arm: "Left arm",
    fu_cp_rad_jaw: "Jaw",
    fu_cp_rad_back: "Back",
    fu_cp_relief_lbl: "Relieved by rest?",

    /* sob */
    fu_sob_title: "Shortness of breath details",
    fu_sob_onset_lbl: "Onset & duration",
    fu_sob_onset_ph: "when did it start? how long?",
    fu_sob_lying_lbl: "Worse when lying flat?",
    fu_sob_exertion_lbl: "With minimal exertion?",
    fu_sob_wheeze_lbl: "Wheezing present?",

    /* fatigue */
    fu_fatigue_title: "Fatigue details",
    fu_fatigue_duration_lbl: "Duration",
    fu_fatigue_duration_ph: "e.g., days, weeks",
    fu_fatigue_sleep_lbl: "Sleep quality",
    fu_fatigue_sleep_good: "Good",
    fu_fatigue_sleep_poor: "Poor",
    fu_fatigue_weight_lbl: "Recent weight change?",
    fu_fatigue_weight_gain: "Gain",
    fu_fatigue_weight_loss: "Loss",
    fu_fatigue_mood_lbl: "Low mood?",

    fu_fever_title: "Fever details",
    fu_fever_duration_lbl: "Duration",
    fu_fever_duration_ph: "e.g., 1 day, 3 days",
    fu_fever_temp_lbl: "Highest temperature (°F/°C)",
    fu_fever_chills_lbl: "Chills or sweating?",
    fu_fever_other_lbl: "Associated symptoms",

    fu_headache_title: "Headache details",
    fu_headache_onset_lbl: "Onset",
    fu_headache_onset_ph: "sudden or gradual? when did it start?",
    fu_headache_duration_lbl: "Duration/frequency",
    fu_headache_severity_lbl: "Severity (1–10)",
    fu_headache_assoc_lbl: "Associated symptoms",

    fu_nausea_title: "Nausea details",
    fu_nausea_onset_lbl: "When did it start?",
    fu_nausea_vomit_lbl: "Vomiting present?",
    fu_nausea_food_lbl: "Worse after eating?",
    fu_nausea_other_lbl: "Other symptoms",

    fu_dizziness_title: "Dizziness details",
    fu_dizziness_onset_lbl: "Onset",
    fu_dizziness_trigger_lbl: "Triggered by position change?",
    fu_dizziness_assoc_lbl: "Associated symptoms",
    fu_dizziness_duration_lbl: "Duration",

    fu_palp_title: "Palpitations details",
    fu_palp_onset_lbl: "Onset",
    fu_palp_duration_lbl: "Duration/frequency",
    fu_palp_trigger_lbl: "Triggered by stress/exertion?",
    fu_palp_assoc_lbl: "Associated symptoms",

    fu_other_title: "Additional symptom details",
    fu_other_onset_lbl: "When did it start?",
    fu_other_severity_lbl: "Severity (1–10)",
    fu_other_duration_lbl: "Duration/pattern",
    fu_other_description_lbl: "Describe the symptom",

    sect_history: "Medical History",
    history_ph: "Relevant past history…",
    sect_meds: "Current Medications",
    meds_ph: "List any medications…",

    sect_lifestyle: "Lifestyle (optional)",
    smoking_label: "Smoking",
    alcohol_label: "Alcohol",
    exercise_label: "Exercise (hrs/week)",
    yes: "Yes", no: "No", occasional: "Occasional",

    sect_contact: "Contact (email only)",
    email_label: "Your email (to receive evaluation)",
    select_prompt: "Select…",

    submit: "Submit",
    evaluating: "Sending… Please wait.",
    thanks_msg: "Thank you! Your information has been sent. Check your email for next steps.",
    footer_note: "This form does not provide diagnosis. For emergencies, call 911."
  },

  ru: {
    tagline: "Взаимодействие Человек–ИИ и триаж — Анкета",
    welcome: "Добро пожаловать! Пожалуйста, заполните форму, чтобы мы могли подготовить рекомендации.",
    form_id: "Номер формы",
    form_date: "Дата",
    privacy_note: "Мы не собираем личные данные. Нужен только email, чтобы отправить вам результат.",

    emergency_header: "Тревожные симптомы",
    emergency_note: "Если что-то из этого есть — немедленно обратитесь за экстренной помощью.",
    rf_chest_pain: "Сильная боль в груди",
    rf_severe_sob: "Тяжёлая одышка",
    rf_stroke: "Асимметрия лица или слабость",
    rf_bleeding: "Неконтролируемое кровотечение",
    rf_confusion: "Выраженная спутанность",
    rf_suicidal: "Суицидальные мысли",
    call911_title: "Возможная неотложная ситуация.",
    call911_text: "Позвоните 911 или обратитесь в ближайшее отделение неотложной помощи.",

    sect_symptoms: "Симптомы",
    symptoms_note: "Отметьте все подходящее:",
    s_cough: "Кашель",
    s_chest_pain: "Боль в груди",
    s_sob: "Одышка",
    s_fever: "Лихорадка",
    s_fatigue: "Усталость",
    s_headache: "Головная боль",
    s_nausea: "Тошнота",
    s_dizziness: "Головокружение",
    s_palpitations: "Сердцебиение",
    other_symptoms: "Другое (необязательно)",

    sect_followups: "Уточняющие вопросы",

    fu_cough_title: "Подробности кашля",
    fu_cough_type_lbl: "Тип",
    fu_cough_type_dry: "Сухой",
    fu_cough_type_wet: "Влажный / с мокротой",
    fu_cough_duration_lbl: "Длительность",
    fu_cough_duration_ph: "напр., 3 дня, 2 недели",
    fu_cough_sputum_lbl: "Есть ли мокрота?",
    fu_cough_sputum_clear: "Да — прозрачная",
    fu_cough_sputum_yellow: "Да — жёлто-зеленая",
    fu_cough_sputum_bloody: "Да — с кровью",
    fu_cough_fever_lbl: "Температура?",
    fu_cough_fever_low: "Низкая",
    fu_cough_fever_high: "Высокая",

    fu_cp_title: "Подробности боли в груди",
    fu_cp_onset_lbl: "Начало",
    fu_cp_onset_ph: "внезапно/постепенно; когда началось?",
    fu_cp_character_lbl: "Характер",
    fu_cp_char_pressure: "Давящая",
    fu_cp_char_sharp: "Острая",
    fu_cp_char_burning: "Жгучая",
    fu_cp_duration_lbl: "Длительность/частота",
    fu_cp_duration_ph: "сек/мин? постоянная/приступами?",
    fu_cp_exertion_lbl: "Усиливается при нагрузке?",
    fu_cp_radiation_lbl: "Иррадиация",
    fu_cp_rad_none: "Нет",
    fu_cp_rad_arm: "В левую руку",
    fu_cp_rad_jaw: "В челюсть",
    fu_cp_rad_back: "В спину",
    fu_cp_relief_lbl: "Облегчается в покое?",

    fu_sob_title: "Подробности одышки",
    fu_sob_onset_lbl: "Начало и длительность",
    fu_sob_onset_ph: "когда началось? как долго?",
    fu_sob_lying_lbl: "Хуже лёжа?",
    fu_sob_exertion_lbl: "При малой нагрузке?",
    fu_sob_wheeze_lbl: "Хрипы?",

    fu_fatigue_title: "Подробности усталости",
    fu_fatigue_duration_lbl: "Длительность",
    fu_fatigue_duration_ph: "напр., дни, недели",
    fu_fatigue_sleep_lbl: "Качество сна",
    fu_fatigue_sleep_good: "Хорошее",
    fu_fatigue_sleep_poor: "Плохое",
    fu_fatigue_weight_lbl: "Изменение веса?",
    fu_fatigue_weight_gain: "Набор",
    fu_fatigue_weight_loss: "Потеря",
    fu_fatigue_mood_lbl: "Пониженное настроение?",

    fu_fever_title: "Подробности о лихорадке",
    fu_fever_duration_lbl: "Длительность",
    fu_fever_duration_ph: "напр., 1 день, 3 дня",
    fu_fever_temp_lbl: "Максимальная температура (°C/°F)",
    fu_fever_chills_lbl: "Озноб или потливость?",
    fu_fever_other_lbl: "Сопутствующие симптомы",

    fu_headache_title: "Подробности головной боли",
    fu_headache_onset_lbl: "Начало",
    fu_headache_onset_ph: "внезапное или постепенное? когда началось?",
    fu_headache_duration_lbl: "Длительность/частота",
    fu_headache_severity_lbl: "Интенсивность (1–10)",
    fu_headache_assoc_lbl: "Сопутствующие симптомы",

    fu_nausea_title: "Подробности тошноты",
    fu_nausea_onset_lbl: "Когда началось?",
    fu_nausea_vomit_lbl: "Есть рвота?",
    fu_nausea_food_lbl: "Хуже после еды?",
    fu_nausea_other_lbl: "Другие симптомы",

    fu_dizziness_title: "Подробности головокружения",
    fu_dizziness_onset_lbl: "Начало",
    fu_dizziness_trigger_lbl: "Вызывается изменением положения тела?",
    fu_dizziness_assoc_lbl: "Сопутствующие симптомы",
    fu_dizziness_duration_lbl: "Длительность",

    fu_palp_title: "Подробности сердцебиения",
    fu_palp_onset_lbl: "Начало",
    fu_palp_duration_lbl: "Длительность/частота",
    fu_palp_trigger_lbl: "Вызывается стрессом или нагрузкой?",
    fu_palp_assoc_lbl: "Сопутствующие симптомы",

    fu_other_title: "Подробности другого симптома",
    fu_other_onset_lbl: "Когда началось?",
    fu_other_severity_lbl: "Интенсивность (1–10)",
    fu_other_duration_lbl: "Длительность/характер",
    fu_other_description_lbl: "Опишите симптом",

    sect_history: "Медицинский анамнез",
    history_ph: "Ранее перенесённые болезни, операции и т.п.",
    sect_meds: "Текущие лекарства",
    meds_ph: "Перечислите препараты…",

    sect_lifestyle: "Образ жизни (необязательно)",
    smoking_label: "Курение",
    alcohol_label: "Алкоголь",
    exercise_label: "Физ. нагрузка (ч/нед.)",
    yes: "Да", no: "Нет", occasional: "Редко",

    sect_contact: "Контакты (только email)",
    email_label: "Ваш email (для отправки результата)",
    select_prompt: "Выберите…",

    submit: "Отправить",
    evaluating: "Отправка… Пожалуйста, подождите.",
    thanks_msg: "Спасибо! Ваша информация отправлена. Проверьте email.",
    footer_note: "Эта форма не является диагнозом. При неотложных состояниях звоните 911."
  },

  he: {
    tagline: "קשר אדם-בינה וטריאז׳ — טופס קליטה",
    welcome: "ברוכים הבאים! מלאו את הטופס כדי שנוכל להכין הנחיות בשבילכם.",
    form_id: "מס׳ טופס",
    form_date: "תאריך",
    privacy_note: "איננו אוספים פרטים מזהים. נבקש מייל בלבד כדי לשלוח את ההערכה.",

    emergency_header: "אזהרות חירום",
    emergency_note: "אם משהו מהבאים קיים — הפסיקו ופנו לעזרה דחופה.",
    rf_chest_pain: "כאבים חזקים בחזה",
    rf_severe_sob: "קוצר נשימה חמור",
    rf_stroke: "צניחת פנים או חולשה חדשה",
    rf_bleeding: "דימום שאינו נפסק",
    rf_confusion: "בלבול קשה",
    rf_suicidal: "מחשבות אובדניות",
    call911_title: "יתכן מצב חירום.",
    call911_text: "התקשרו 911 או פנו מיד לחדר מיון.",

    sect_symptoms: "תסמינים",
    symptoms_note: "בחרו את כל המתאים:",
    s_cough: "שיעול",
    s_chest_pain: "כאבים בחזה",
    s_sob: "קוצר נשימה",
    s_fever: "חום",
    s_fatigue: "עייפות",
    s_headache: "כאבי ראש",
    s_nausea: "בחילה",
    s_dizziness: "סחרחורת",
    s_palpitations: "דופק מהיר",
    other_symptoms: "אחר (רשות)",

    sect_followups: "שאלות המשך",

    fu_cough_title: "פרטי שיעול",
    fu_cough_type_lbl: "סוג",
    fu_cough_type_dry: "יבש",
    fu_cough_type_wet: "רטוב / עם ליחה",
    fu_cough_duration_lbl: "משך",
    fu_cough_duration_ph: "למשל: 3 ימים, 2 שבועות",
    fu_cough_sputum_lbl: "יש ליחה?",
    fu_cough_sputum_clear: "כן — צלולה",
    fu_cough_sputum_yellow: "כן — צהובה/ירוקה",
    fu_cough_sputum_bloody: "כן — עם דם",
    fu_cough_fever_lbl: "חום?",
    fu_cough_fever_low: "נמוך",
    fu_cough_fever_high: "גבוה",

    fu_cp_title: "פרטי כאבים בחזה",
    fu_cp_onset_lbl: "תחילה",
    fu_cp_onset_ph: "פתאומי/מדורג; מתי התחיל?",
    fu_cp_character_lbl: "אופי",
    fu_cp_char_pressure: "לחץ",
    fu_cp_char_sharp: "דקירה",
    fu_cp_char_burning: "שורף",
    fu_cp_duration_lbl: "משך/תדירות",
    fu_cp_duration_ph: "שניות? דקות? קבוע/התקפי?",
    fu_cp_exertion_lbl: "מחמיר במאמץ?",
    fu_cp_radiation_lbl: "הקרנה",
    fu_cp_rad_none: "אין",
    fu_cp_rad_arm: "לזרוע שמאל",
    fu_cp_rad_jaw: "ללסת",
    fu_cp_rad_back: "לגב",
    fu_cp_relief_lbl: "מוקל במנוחה?",

    fu_sob_title: "פרטי קוצר נשימה",
    fu_sob_onset_lbl: "תחילה ומשך",
    fu_sob_onset_ph: "מתי התחיל? כמה זמן?",
    fu_sob_lying_lbl: "מחמיר בשכיבה?",
    fu_sob_exertion_lbl: "גם במאמץ קל?",
    fu_sob_wheeze_lbl: "עם צפצופים?",

    fu_fatigue_title: "פרטי עייפות",
    fu_fatigue_duration_lbl: "משך",
    fu_fatigue_duration_ph: "ימים, שבועות",
    fu_fatigue_sleep_lbl: "איכות שינה",
    fu_fatigue_sleep_good: "טובה",
    fu_fatigue_sleep_poor: "ירודה",
    fu_fatigue_weight_lbl: "שינוי משקל?",
    fu_fatigue_weight_gain: "עלייה",
    fu_fatigue_weight_loss: "ירידה",
    fu_fatigue_mood_lbl: "מצב רוח ירוד?",

    fu_fever_title: "פרטי חום",
    fu_fever_duration_lbl: "משך",
    fu_fever_duration_ph: "למשל: יום אחד, שלושה ימים",
    fu_fever_temp_lbl: "הטמפרטורה הגבוהה ביותר (°C/°F)",
    fu_fever_chills_lbl: "צמרמורות או הזעה?",
    fu_fever_other_lbl: "תסמינים נלווים",

    fu_headache_title: "פרטי כאב ראש",
    fu_headache_onset_lbl: "תחילה",
    fu_headache_onset_ph: "פתאומי או הדרגתי? מתי התחיל?",
    fu_headache_duration_lbl: "משך/תדירות",
    fu_headache_severity_lbl: "חומרה (1–10)",
    fu_headache_assoc_lbl: "תסמינים נלווים",

    fu_nausea_title: "פרטי בחילה",
    fu_nausea_onset_lbl: "מתי התחיל?",
    fu_nausea_vomit_lbl: "יש הקאות?",
    fu_nausea_food_lbl: "מוחמר אחרי אוכל?",
    fu_nausea_other_lbl: "תסמינים אחרים",

    fu_dizziness_title: "פרטי סחרחורת",
    fu_dizziness_onset_lbl: "תחילה",
    fu_dizziness_trigger_lbl: "נגרם משינוי תנוחה?",
    fu_dizziness_assoc_lbl: "תסמינים נלווים",
    fu_dizziness_duration_lbl: "משך",

    fu_palp_title: "פרטי דפיקות לב",
    fu_palp_onset_lbl: "תחילה",
    fu_palp_duration_lbl: "משך/תדירות",
    fu_palp_trigger_lbl: "נגרם ממאמץ או מתח?",
    fu_palp_assoc_lbl: "תסמינים נלווים",

    fu_other_title: "פרטי תסמין נוסף",
    fu_other_onset_lbl: "מתי התחיל?",
    fu_other_severity_lbl: "חומרה (1–10)",
    fu_other_duration_lbl: "משך/דפוס",
    fu_other_description_lbl: "תארו את התסמין",

    sect_history: "היסטוריה רפואית",
    history_ph: "מחלות רקע, ניתוחים…",
    sect_meds: "תרופות נוכחיות",
    meds_ph: "רשימת התרופות…",

    sect_lifestyle: "אורח חיים (רשות)",
    smoking_label: "עישון",
    alcohol_label: "אלכוהול",
    exercise_label: "פעילות (ש׳/שבוע)",
    yes: "כן", no: "לא", occasional: "לעיתים",

    sect_contact: "יצירת קשר (מייל בלבד)",
    email_label: "המייל שלך (לקבלת הערכה)",
    select_prompt: "בחרו…",

    submit: "שליחה",
    evaluating: "שולח… אנא המתינו.",
    thanks_msg: "תודה! המידע נשלח. בדקו את תיבת המייל.",
    footer_note: "טופס זה אינו אבחון. במקרה חירום — חייגו 911."
  }
};

/***************
 * HELPERS
 ***************/
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function genFormId(){
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth()+1).padStart(2,"0");
  const d = String(now.getDate()).padStart(2,"0");
  const rand = Math.random().toString(36).slice(2,8).toUpperCase();
  return `HART-${y}${m}${d}-${rand}`;
}
function todayStr(){
  const now = new Date();
  return now.toLocaleDateString();
}

function setRTL(lang){
  if (lang === "he"){
    document.documentElement.setAttribute("dir","rtl");
    document.body.classList.add("rtl");
  } else {
    document.documentElement.setAttribute("dir","ltr");
    document.body.classList.remove("rtl");
  }
}

function applyTranslations(lang){
  setRTL(lang);
  // texts
  $$("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if (t[lang][key] !== undefined) el.textContent = t[lang][key];
  });
  // placeholders
  $$("[data-ph]").forEach(el=>{
    const key = el.getAttribute("data-ph");
    if (t[lang][key] !== undefined) el.setAttribute("placeholder", t[lang][key]);
  });
  // select prompts
  $$("option[data-i18n='select_prompt']").forEach(opt=>{
    opt.textContent = t[lang]["select_prompt"];
  });
}

/***************
 * EMERGENCY LOGIC
 ***************/
function updateEmergencyState(){
  const anyChecked = Array.from($$(".rf")).some(cb => cb.checked);
  const banner = $("#emergencyBanner");
  const submit = $("#submitBtn");
  if (anyChecked){
    banner.classList.remove("hidden");
    submit.disabled = true;
  } else {
    banner.classList.add("hidden");
    submit.disabled = false;
  }
}

/***************
 * FOLLOW-UPS (DYNAMIC)
 ***************/
const symptomToBlock = {
  "cough": "fu-cough",
  "chest_pain": "fu-chest_pain",
  "sob": "fu-sob",
  "fatigue": "fu-fatigue",
  "fever": "fu-fever",
  "headache": "fu-headache",
  "nausea": "fu-nausea",
  "dizziness": "fu-dizziness",
  "palpitations": "fu-palpitations",
  "other": "fu-other"
};

function refreshFollowups() {
  console.log("Refreshing follow-ups…");
  console.log("Found fu-cough?", !!document.getElementById("fu-cough"));
  console.log("Found fu-chest_pain?", !!document.getElementById("fu-chest_pain"));
  const selected = Array.from(document.querySelectorAll("input[name='symptom']:checked"))
    .map(x => x.value);
  console.log("Selected:", selected);

  Object.entries(symptomToBlock).forEach(([sym, id]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (selected.includes(sym)) {
      el.style.display = "block";
      el.classList.remove("hidden");
      console.log("Showing:", id);
    } else {
      el.style.display = "none";
      el.classList.add("hidden");
    }
  });
}

/***************
 * SPEECH-TO-TEXT
 ***************/
let activeRecog = null;
function setupMicButtons(){
  $$(".mic-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const targetId = btn.getAttribute("data-target");
      const field = $("#"+targetId);
      if (!("webkitSpeechRecognition" in window)){
        field.value += (field.value ? "\n" : "") + "[Speech recognition not supported in this browser]";
        return;
      }
      if (activeRecog){
        activeRecog.stop();
        activeRecog = null;
        btn.classList.remove("recording");
        return;
      }
      const rec = new webkitSpeechRecognition(); // eslint-disable-line no-undef
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = (document.body.classList.contains("rtl")) ? "he-IL" : "en-US";
      rec.onresult = (e)=>{
        let tx = "";
        for (let i=e.resultIndex; i<e.results.length; i++){
          tx += e.results[i][0].transcript;
        }
        field.value = tx;
      };
      rec.onend = ()=>{ activeRecog=null; btn.classList.remove("recording"); };
      rec.start();
      activeRecog = rec;
      btn.classList.add("recording");
    });
  });
}

/***************
 * EMAIL (EmailJS) — formatted text
 ***************/
function buildEmailText(lang){
  const get = (id)=> $(id) ? $(id).value : "";

  // basics
  const formId = $("#formId").textContent.trim();
  const formDate = $("#formDate").textContent.trim();
  const email = $("#email").value.trim();

  // symptoms
  const syms = Array.from($$("input[name='symptom']:checked")).map(x=>{
    const label = x.closest("label").innerText.trim();
    return `• ${label}`;
  });
  const other = $("#otherSymptoms").value.trim();
  if (other) syms.push(`• Other: ${other}`);

  // follow-ups values
  const fuLines = [];

  // cough
  if (!$("#fu-cough").classList.contains("hidden")){
    fuLines.push(
      "— Cough:",
      `   Type: ${$("#fuCoughType").value || "-"}`,
      `   Duration: ${$("#fuCoughDuration").value || "-"}`,
      `   Mucus: ${$("#fuCoughSputum").value || "-"}`,
      `   Fever: ${$("#fuCoughFever").value || "-"}`
    );
  }
  // chest pain
  if (!$("#fu-chest_pain").classList.contains("hidden")){
    fuLines.push(
      "— Chest pain:",
      `   Onset: ${$("#fuCpOnset").value || "-"}`,
      `   Character: ${$("#fuCpCharacter").value || "-"}`,
      `   Duration: ${$("#fuCpDuration").value || "-"}`,
      `   Worse w/ exertion: ${$("#fuCpExertion").value || "-"}`,
      `   Radiation: ${$("#fuCpRadiation").value || "-"}`,
      `   Relief at rest: ${$("#fuCpRelief").value || "-"}`
    );
  }
  // SOB
  if (!$("#fu-sob").classList.contains("hidden")){
    fuLines.push(
      "— Shortness of breath:",
      `   Onset & duration: ${$("#fuSobOnset").value || "-"}`,
      `   Worse lying flat: ${$("#fuSobLying").value || "-"}`,
      `   With minimal exertion: ${$("#fuSobExertion").value || "-"}`,
      `   Wheezing: ${$("#fuSobWheeze").value || "-"}`
    );
  }
  // Fatigue
  if (!$("#fu-fatigue").classList.contains("hidden")){
    fuLines.push(
      "— Fatigue:",
      `   Duration: ${$("#fuFatigueDuration").value || "-"}`,
      `   Sleep quality: ${$("#fuFatigueSleep").value || "-"}`,
      `   Weight change: ${$("#fuFatigueWeight").value || "-"}`,
      `   Low mood: ${$("#fuFatigueMood").value || "-"}`
    );
  }

  // history/meds
  const history = $("#history").value.trim() || "-";
  const meds = $("#meds").value.trim() || "-";

  // lifestyle
  const smoking = $("#smoking").value || "-";
  const alcohol = $("#alcohol").value || "-";
  const exercise = $("#exercise").value || "-";

  // emergency flags
  const emFlags = Array.from($$(".rf:checked")).map(cb=>{
    const text = cb.closest("label").innerText.trim();
    return `• ${text}`;
  });

  return [
    `HART Intake (Form: ${formId}, Date: ${formDate})`,
    "",
    `Language: ${lang.toUpperCase()}`,
    `Patient email: ${email || "(not provided)"}`,
    "",
    "Symptoms:",
    ...(syms.length ? syms : ["• –"]),
    "",
    "Follow-up details:",
    ...(fuLines.length ? fuLines : ["— –"]),
    "",
    "Medical History:",
    history,
    "",
    "Current Medications:",
    meds,
    "",
    "Lifestyle:",
    `• Smoking: ${smoking}`,
    `• Alcohol: ${alcohol}`,
    `• Exercise (hrs/wk): ${exercise}`,
    "",
    "Emergency red flags selected:",
    ...(emFlags.length ? emFlags : ["• none selected"]),
    "",
    "— End of intake —"
  ].join("\n");
}

async function sendEmail(formattedText, toEmail){
  const params = {
    // Your EmailJS template variables:
    to_email: "hart.intake.central@gmail.com",
    patient_email: toEmail || "(not provided)",
    message: formattedText
  };
  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
}

/***************
 * SUBMIT
 ***************/
async function onSubmit(){
  // if emergency — block
  const anyEmergency = Array.from($$(".rf")).some(cb=>cb.checked);
  if (anyEmergency) return;

  const email = $("#email").value.trim();
  const lang = currentLang;
  const loading = $("#loading");
  const thanks = $("#thanks");

  loading.classList.remove("hidden");
  thanks.classList.add("hidden");

  try{
    const text = buildEmailText(lang);
    await sendEmail(text, email);
    thanks.classList.remove("hidden");
    // Optionally reset form except language:
    // document.querySelector("form")?.reset(); (we have no single <form>, so skip)
  }catch(err){
    alert("Failed to send. Please try again.\n" + (err?.text || err?.message || err));
  }finally{
    loading.classList.add("hidden");
  }
}

/***************
 * LANGUAGE SWITCH BAR
 ***************/
let currentLang = "en";
function setActiveLangButton(lang){
  $$(".lang-btn").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}
function handleLangSwitch(e){
  const lang = e.target.dataset.lang;
  if (!lang) return;
  currentLang = lang;
  setActiveLangButton(lang);
  applyTranslations(lang);
}

/***************
 * INIT
 ***************/
document.addEventListener("DOMContentLoaded", ()=>{
  // IDs & date
  $("#formId").textContent = genFormId();
  $("#formDate").textContent = todayStr();

  // Default language EN
  applyTranslations("en");
  setActiveLangButton("en");

  // Emergency listeners
  $$(".rf").forEach(cb=> cb.addEventListener("change", updateEmergencyState));

  // Symptom follow-ups
  $$("input[name='symptom']").forEach(cb => 
    cb.addEventListener("change", refreshFollowups)
  );
  refreshFollowups(); // ensure hidden on first load

  // Mic
  setupMicButtons();

  // Submit
  $("#submitBtn").addEventListener("click", onSubmit);

  // Lang bar
  $$(".lang-btn").forEach(btn => btn.addEventListener("click", handleLangSwitch));
});

function refreshFollowups() {
  console.log("Refreshing follow-ups…");

  // Hide all follow-up blocks
  Object.values(symptomToBlock).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add("hidden");
    }
  });

  // Collect selected symptoms
  const selected = Array.from(document.querySelectorAll("input[name='symptom']:checked"))
    .map(x => x.value);
  console.log("Selected symptoms:", selected);

  // Show matching blocks
  selected.forEach(sym => {
    const id = symptomToBlock[sym];
    const el = id && document.getElementById(id);
    console.log("Block to show:", id);
    if (el) {
      el.classList.remove("hidden");
      console.log("After toggle classes:", el.classList);
    } else {
      console.warn("No follow-up block found for:", sym);
    }
  });
}

