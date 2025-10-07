/***************
 * CONFIG
 ***************/
const EMAILJS_SERVICE_ID = "service_op12pek";
const EMAILJS_TEMPLATE_ID = "template_5amo8ib";
const EMAILJS_PUBLIC_KEY = "9CnCLpzz0nKl_y4gf";

document.addEventListener("DOMContentLoaded", () => {
  if (window.emailjs && emailjs.init) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
});

/***************
 * TRANSLATIONS
 ***************/
const t = {
  /* ---------------- ENGLISH ---------------- */
  en: {
    tagline: "Human-AI Relationship & Triage — Intake",
    welcome: "Welcome! Please complete this intake to help us prepare guidance for you.",
    form_id: "Form ID",
    form_date: "Date",
    privacy_note:
      "We do not collect personal identifiers. We only ask for an email to send your evaluation.",
    emergency_header: "Emergency red flags",
    emergency_note: "If any apply, stop and seek emergency care.",
    rf_chest_pain: "Severe chest pain",
    rf_severe_sob: "Severe shortness of breath",
    rf_stroke: "Facial droop or new weakness",
    rf_bleeding: "Uncontrolled bleeding",
    rf_confusion: "Severe confusion",
    rf_suicidal: "Suicidal thoughts",
    call911_title: "Possible emergency.",
    call911_text:
      "Please call 911 or go to the nearest emergency department now.",
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

    /* follow-up placeholders */
    fu_cough_duration_ph: "e.g., 3 days, 2 weeks",
    fu_cp_onset_ph: "e.g., sudden, gradual; when did it start?",
    fu_cp_duration_ph: "seconds? minutes? constant/episodic?",
    fu_sob_onset_ph: "when did it start? how long?",
    fu_fatigue_duration_ph: "e.g., days, weeks",
    fu_fever_duration_ph: "e.g., 1 day, 3 days",
    fu_fever_temp_ph: "e.g., 101°F or 38.5°C",
    fu_fever_other_ph: "e.g., sore throat, cough",
    fu_headache_onset_ph: "sudden or gradual? when did it start?",
    fu_headache_duration_ph: "constant or intermittent?",
    fu_headache_assoc_ph: "e.g., nausea, vision changes",
    fu_nausea_onset_ph: "e.g., 2 days ago",
    fu_nausea_other_ph: "e.g., abdominal pain, diarrhea",
    fu_dizziness_onset_ph: "sudden or gradual?",
    fu_dizziness_duration_ph: "seconds, minutes, hours?",
    fu_dizziness_assoc_ph: "e.g., nausea, palpitations",
    fu_palp_onset_ph: "when did it start?",
    fu_palp_duration_ph: "how long do episodes last?",
    fu_palp_assoc_ph: "e.g., dizziness, chest pain",
    fu_other_onset_ph: "e.g., 2 days ago",
    fu_other_duration_ph: "constant or comes and goes?",
    fu_other_description_ph: "brief description",

    sect_history: "Medical History",
    history_ph: "Relevant past history…",
    sect_meds: "Current Medications",
    meds_ph: "List any medications…",
    sect_lifestyle: "Lifestyle (optional)",
    smoking_label: "Smoking",
    alcohol_label: "Alcohol",
    exercise_label: "Exercise (hrs/week)",
    yes: "Yes",
    no: "No",
    occasional: "Occasional",
    sect_contact: "Contact (email only)",
    email_label: "Your email (to receive evaluation)",
    select_prompt: "Select…",
    submit: "Submit",
    evaluating: "Sending… Please wait.",
    thanks_msg:
      "Thank you! Your information has been sent. Check your email for next steps.",
    footer_note:
      "This form does not provide diagnosis. For emergencies, call 911.",
  },

  /* ---------------- RUSSIAN ---------------- */
  ru: {
    tagline: "Взаимодействие Человек–ИИ и триаж — Анкета",
    welcome:
      "Добро пожаловать! Пожалуйста, заполните форму, чтобы мы могли подготовить рекомендации.",
    form_id: "Номер формы",
    form_date: "Дата",
    privacy_note:
      "Мы не собираем личные данные. Нужен только email, чтобы отправить вам результат.",
    emergency_header: "Тревожные симптомы",
    emergency_note:
      "Если что-то из этого есть — немедленно обратитесь за экстренной помощью.",
    rf_chest_pain: "Сильная боль в груди",
    rf_severe_sob: "Тяжёлая одышка",
    rf_stroke: "Асимметрия лица или слабость",
    rf_bleeding: "Неконтролируемое кровотечение",
    rf_confusion: "Выраженная спутанность",
    rf_suicidal: "Суицидальные мысли",
    call911_title: "Возможная неотложная ситуация.",
    call911_text: "Позвоните 911 или обратитесь в ближайшее отделение помощи.",
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
    fu_fever_duration_ph: "напр., 1 день, 3 дня",
    fu_fever_temp_ph: "напр., 38.5°C",
    fu_headache_duration_ph: "постоянная или приступами?",
    fu_headache_assoc_ph: "напр., тошнота, зрение",
    fu_nausea_onset_ph: "напр., 2 дня назад",
    fu_dizziness_duration_ph: "секунды, минуты, часы?",
    fu_palp_duration_ph: "как долго длятся эпизоды?",
    fu_other_description_ph: "краткое описание",
    sect_history: "Медицинский анамнез",
    history_ph: "Ранее перенесённые болезни, операции и т.п.",
    sect_meds: "Текущие лекарства",
    meds_ph: "Перечислите препараты…",
    sect_lifestyle: "Образ жизни (необязательно)",
    smoking_label: "Курение",
    alcohol_label: "Алкоголь",
    exercise_label: "Физ. нагрузка (ч/нед.)",
    yes: "Да",
    no: "Нет",
    occasional: "Редко",
    sect_contact: "Контакты (только email)",
    email_label: "Ваш email (для отправки результата)",
    select_prompt: "Выберите…",
    submit: "Отправить",
    evaluating: "Отправка… Пожалуйста, подождите.",
    thanks_msg: "Спасибо! Ваша информация отправлена. Проверьте email.",
    footer_note:
      "Эта форма не является диагнозом. При неотложных состояниях звоните 911.",
  },

  /* ---------------- HEBREW ---------------- */
  he: {
    tagline: "קשר אדם-בינה וטריאז׳ — טופס קליטה",
    welcome: "ברוכים הבאים! מלאו את הטופס כדי שנוכל להכין הנחיות בשבילכם.",
    form_id: "מס׳ טופס",
    form_date: "תאריך",
    privacy_note:
      "איננו אוספים פרטים מזהים. נבקש מייל בלבד כדי לשלוח את ההערכה.",
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
    fu_fever_duration_ph: "למשל: יום אחד, שלושה ימים",
    fu_fever_temp_ph: "לדוגמה: 38.5°C",
    fu_headache_duration_ph: "קבוע או התקפי?",
    fu_headache_assoc_ph: "למשל: בחילה, ראייה מטושטשת",
    fu_nausea_onset_ph: "למשל: לפני יומיים",
    fu_dizziness_duration_ph: "שניות, דקות, שעות?",
    fu_palp_duration_ph: "כמה זמן נמשכים הפרקים?",
    fu_other_description_ph: "תיאור קצר",
    sect_history: "היסטוריה רפואית",
    history_ph: "מחלות רקע, ניתוחים…",
    sect_meds: "תרופות נוכחיות",
    meds_ph: "רשימת התרופות…",
    sect_lifestyle: "אורח חיים (רשות)",
    smoking_label: "עישון",
    alcohol_label: "אלכוהול",
    exercise_label: "פעילות (ש׳/שבוע)",
    yes: "כן",
    no: "לא",
    occasional: "לעיתים",
    sect_contact: "יצירת קשר (מייל בלבד)",
    email_label: "המייל שלך (לקבלת הערכה)",
    select_prompt: "בחרו…",
    submit: "שליחה",
    evaluating: "שולח… אנא המתינו.",
    thanks_msg: "תודה! המידע נשלח. בדקו את תיבת המייל.",
    footer_note: "טופס זה אינו אבחון. במקרה חירום — חייגו 911.",
  },
};

/***************
 * HELPERS
 ***************/
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function genFormId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `HART-${y}${m}${d}-${rand}`;
}
function todayStr() {
  return new Date().toLocaleDateString();
}

function setRTL(lang) {
  if (lang === "he") {
    document.documentElement.setAttribute("dir", "rtl");
    document.body.classList.add("rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    document.body.classList.remove("rtl");
  }
}

/***************
 * TRANSLATION LOGIC
 ***************/
function tr(lang, key) {
  return (t[lang] && t[lang][key] != null) ? t[lang][key] : (t.en[key] ?? "");
}

function applyTranslations(lang) {
  setRTL(lang);
  $$("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = tr(lang, key);
    if (val) el.textContent = val;
  });
  $$("[data-ph]").forEach((el) => {
    const key = el.getAttribute("data-ph");
    const val = tr(lang, key);
    if (val) el.setAttribute("placeholder", val);
  });
  $$("option[data-i18n='select_prompt']").forEach((opt) => {
    opt.textContent = tr(lang, "select_prompt");
  });
}

/***************
 * FOLLOW-UPS
 ***************/
const symptomToBlock = {
  cough: "fu-cough",
  chest_pain: "fu-chest_pain",
  sob: "fu-sob",
  fatigue: "fu-fatigue",
  fever: "fu-fever",
  headache: "fu-headache",
  nausea: "fu-nausea",
  dizziness: "fu-dizziness",
  palpitations: "fu-palpitations",
  other: "fu-other",
};

function refreshFollowups() {
  Object.values(symptomToBlock).forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });

  const selected = Array.from(
    document.querySelectorAll("input[name='symptom']:checked")
  ).map((x) => x.value);

  selected.forEach((sym) => {
    const id = symptomToBlock[sym];
    const el = id && document.getElementById(id);
    if (el) el.classList.remove("hidden");
  });

  // show generic "Other" if user typed text
  const otherText = $("#otherSymptoms")?.value.trim();
  const otherFU = document.getElementById("fu-other");
  const chk = $("#chkOther");
  if (chk) chk.checked = !!otherText;
  if (otherFU) {
    if (otherText) otherFU.classList.remove("hidden");
    else if (!selected.includes("other")) otherFU.classList.add("hidden");
  }
}

/***************
 * EMERGENCY & MIC & EMAIL
 ***************/
function updateEmergencyState() {
  const anyChecked = Array.from($$(".rf")).some((cb) => cb.checked);
  const banner = $("#emergencyBanner");
  const submit = $("#submitBtn");
  if (anyChecked) {
    banner.classList.remove("hidden");
    submit.disabled = true;
  } else {
    banner.classList.add("hidden");
    submit.disabled = false;
  }
}

let activeRecog = null;
function setupMicButtons() {
  $$(".mic-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const field = $("#" + targetId);
      if (!("webkitSpeechRecognition" in window)) {
        field.value +=
          (field.value ? "\n" : "") +
          "[Speech recognition not supported in this browser]";
        return;
      }
      if (activeRecog) {
        activeRecog.stop();
        activeRecog = null;
        btn.classList.remove("recording");
        return;
      }
      const rec = new webkitSpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      const currentLang = window.currentLang || "en";
      rec.lang =
        currentLang === "he"
          ? "he-IL"
          : currentLang === "ru"
          ? "ru-RU"
          : "en-US";
      rec.onresult = (e) => {
        let tx = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          tx += e.results[i][0].transcript;
        }
        field.value = tx;
      };
      rec.onend = () => {
        activeRecog = null;
        btn.classList.remove("recording");
      };
      rec.start();
      activeRecog = rec;
      btn.classList.add("recording");
    });
  });
}

/***************
 * SUBMIT + EMAIL
 ***************/
async function sendEmail(formattedText, toEmail) {
  const params = {
    to_email: "hart.intake.central@gmail.com",
    patient_email: toEmail || "(not provided)",
    message: formattedText,
  };
  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
}

async function onSubmit() {
  if (Array.from($$(".rf")).some((cb) => cb.checked)) return;
  const email = $("#email").value.trim();
  const lang = currentLang;
  const loading = $("#loading");
  const thanks = $("#thanks");

  loading.classList.remove("hidden");
  thanks.classList.add("hidden");

  try {
    const text = buildEmailText(lang);
    await sendEmail(text, email);
    thanks.classList.remove("hidden");
  } catch (err) {
    alert("Failed to send. Please try again.\n" + (err?.text || err?.message));
  } finally {
    loading.classList.add("hidden");
  }
}

/***************
 * LANGUAGE SWITCH BAR
 ***************/
let currentLang = "en";
function setActiveLangButton(lang) {
  $$(".lang-btn").forEach((btn) =>
    btn.classList.toggle("active", btn.dataset.lang === lang)
  );
}
function handleLangSwitch(e) {
  const lang = e.target.dataset.lang;
  if (!lang) return;
  currentLang = lang;
  setActiveLangButton(lang);
  applyTranslations(lang);
}

/***************
 * INIT
 ***************/
document
