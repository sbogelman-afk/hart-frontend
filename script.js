// ===== Config =====
const API_URL = "https://hart-eval-backend-48887cb98881.herokuapp.com/evaluate";
const API_TOKEN = "hart-backend-secret-2025"; // using backend bearer, OK for testing

// ===== Translations (EN, RU, HE) =====
const t = {
  en: {
    welcome: "Welcome! Please complete this intake to help us prepare your visit.",
    emergency_header: "Emergency red flags",
    emergency_note: "If any of these apply, stop and seek emergency care.",
    rf_chest_pain: "Severe chest pain",
    rf_severe_sob: "Severe shortness of breath",
    rf_stroke: "Facial droop or new weakness",
    rf_bleeding: "Uncontrolled bleeding",
    rf_confusion: "Severe confusion",
    rf_suicidal: "Suicidal thoughts",
    call911_title: "Possible emergency.",
    call911_text: "Please call 911 or go to the nearest emergency department now.",

    sect_patient: "Patient Information",
    name_label: "Name*",
    age_label: "Age*",
    gender_label: "Gender*",
    gender_m: "Male",
    gender_f: "Female",
    gender_o: "Other",
    email_label: "Email (optional)",
    phone_label: "Phone (optional)",
    select_prompt: "Select…",

    sect_symptoms: "Symptoms",
    symptoms_note: "Select all that apply:",
    s_fever: "Fever",
    s_cough: "Cough",
    s_sob: "Shortness of breath",
    s_chest_pain: "Chest pain",
    s_fatigue: "Fatigue",
    s_headache: "Headache",
    s_nausea: "Nausea",
    s_dizziness: "Dizziness",
    s_palpitations: "Palpitations",
    other_symptoms: "Other (optional)",

    sect_history: "Medical History",
    history_ph: "Relevant past medical history...",

    sect_meds: "Current Medications",
    meds_ph: "List any medications currently taken...",

    sect_lifestyle: "Lifestyle (optional)",
    smoking_label: "Smoking",
    alcohol_label: "Alcohol",
    exercise_label: "Exercise (hours/week)",
    yes: "Yes", no: "No", occasional: "Occasional",

    submit: "Submit",
    export_pdf: "Export PDF",
    evaluating: "Evaluating… Please wait.",
    footer_note: "This form does not provide medical diagnosis. For emergencies, call 911."
  },
  ru: {
    welcome: "Добро пожаловать! Пожалуйста, заполните форму, чтобы мы могли подготовиться к визиту.",
    emergency_header: "Тревожные симптомы (неотложные)",
    emergency_note: "Если что-то из этого присутствует, немедленно обратитесь за экстренной помощью.",
    rf_chest_pain: "Сильная боль в груди",
    rf_severe_sob: "Сильная одышка",
    rf_stroke: "Асимметрия лица или внезапная слабость",
    rf_bleeding: "Неконтролируемое кровотечение",
    rf_confusion: "Выраженная спутанность сознания",
    rf_suicidal: "Суицидальные мысли",
    call911_title: "Возможная неотложная ситуация.",
    call911_text: "Позвоните 911 или обратитесь в ближайшее отделение неотложной помощи.",

    sect_patient: "Информация о пациенте",
    name_label: "Имя*",
    age_label: "Возраст*",
    gender_label: "Пол*",
    gender_m: "Мужской",
    gender_f: "Женский",
    gender_o: "Другое",
    email_label: "Эл. почта (необязательно)",
    phone_label: "Телефон (необязательно)",
    select_prompt: "Выберите…",

    sect_symptoms: "Симптомы",
    symptoms_note: "Отметьте все подходящее:",
    s_fever: "Лихорадка",
    s_cough: "Кашель",
    s_sob: "Одышка",
    s_chest_pain: "Боль в груди",
    s_fatigue: "Усталость",
    s_headache: "Головная боль",
    s_nausea: "Тошнота",
    s_dizziness: "Головокружение",
    s_palpitations: "Серцебиение",
    other_symptoms: "Другое (необязательно)",

    sect_history: "Медицинский анамнез",
    history_ph: "Ранее перенесенные заболевания, операции и т.д.",

    sect_meds: "Текущие лекарства",
    meds_ph: "Перечислите все принимаемые препараты…",

    sect_lifestyle: "Образ жизни (необязательно)",
    smoking_label: "Курение",
    alcohol_label: "Алкоголь",
    exercise_label: "Физ. нагрузка (часов/нед.)",
    yes: "Да", no: "Нет", occasional: "Редко",

    submit: "Отправить",
    export_pdf: "PDF отчет",
    evaluating: "Оценка… Пожалуйста, подождите.",
    footer_note: "Эта форма не является диагнозом. При неотложных состояниях звоните 911."
  },
  he: {
    welcome: "ברוכים הבאים! אנא מלאו את הטופס כדי שנוכל להיערך לביקור.",
    emergency_header: "אזהרות חרום",
    emergency_note: "אם אחד מאלה קיים – הפסיקו ופנו לעזרה דחופה.",
    rf_chest_pain: "כאבים חזקים בחזה",
    rf_severe_sob: "קוצר נשימה חמור",
    rf_stroke: "צניחת פנים או חולשה חדשה",
    rf_bleeding: "דימום שאינו נפסק",
    rf_confusion: "בלבול קשה",
    rf_suicidal: "מחשבות אובדניות",
    call911_title: "יתכן מצב חירום.",
    call911_text: "התקשרו 911 או פנו לחדר מיון הקרוב.",

    sect_patient: "פרטי מטופל",
    name_label: "שם*",
    age_label: "גיל*",
    gender_label: "מין*",
    gender_m: "זכר",
    gender_f: "נקבה",
    gender_o: "אחר",
    email_label: "אימייל (רשות)",
    phone_label: "טלפון (רשות)",
    select_prompt: "בחרו…",

    sect_symptoms: "תסמינים",
    symptoms_note: "בחרו את כל המתאים:",
    s_fever: "חום",
    s_cough: "שיעול",
    s_sob: "קוצר נשימה",
    s_chest_pain: "כאבים בחזה",
    s_fatigue: "עייפות",
    s_headache: "כאבי ראש",
    s_nausea: "בחילה",
    s_dizziness: "סחרחורת",
    s_palpitations: "דופק מהיר",
    other_symptoms: "אחר (רשות)",

    sect_history: "היסטוריה רפואית",
    history_ph: "מחלות רקע, ניתוחים וכו׳",

    sect_meds: "תרופות נוכחיות",
    meds_ph: "רשימת התרופות שאתם נוטלים…",

    sect_lifestyle: "אורח חיים (רשות)",
    smoking_label: "עישון",
    alcohol_label: "אלכוהול",
    exercise_label: "פעילות גופנית (ש׳ בשבוע)",
    yes: "כן", no: "לא", occasional: "לעיתים",

    submit: "שליחה",
    export_pdf: "יצוא PDF",
    evaluating: "מעריך… אנא המתינו.",
    footer_note: "טופס זה אינו מהווה אבחון. בחירום – חייגו 911."
  }
};

// ===== Helpers: i18n & RTL =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function applyTranslations(lang){
  // Toggle RTL for Hebrew
  if (lang === "he") {
    document.documentElement.setAttribute("dir", "rtl");
    document.body.classList.add("rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    document.body.classList.remove("rtl");
  }

  // All text nodes with data-i18n
  $$("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[lang][key] !== undefined) el.textContent = t[lang][key];
  });

  // Placeholders using data-ph keys on inputs/textareas
  $$("[data-ph]").forEach(el => {
    const key = el.getAttribute("data-ph");
    if (t[lang][key] !== undefined) el.setAttribute("placeholder", t[lang][key]);
  });

  // Also update the default "Select…" options
  $$("option[data-i18n='select_prompt']").forEach(opt => {
    opt.textContent = t[lang]["select_prompt"];
  });
}

// ===== Emergency red flags logic =====
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

// ===== Speech recognition (simple toggle per textarea) =====
let activeRecog = null;
function setupMicButtons(){
  $$(".mic-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetName = btn.getAttribute("data-target");
      const field = document.querySelector(`textarea[name='${targetName}']`);
      if (!("webkitSpeechRecognition" in window)) {
        field.value += (field.value ? "\n" : "") + "[Speech recognition not supported in this browser]";
        return;
      }
      if (activeRecog){
        activeRecog.stop();
        activeRecog = null;
        btn.classList.remove("recording");
        return;
      }
      const rec = new webkitSpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = (document.documentElement.getAttribute("dir") === "rtl") ? "he-IL" : "en-US";
      rec.onresult = (e) => {
        let tx = "";
        for (let i=e.resultIndex; i<e.results.length; i++){
          tx += e.results[i][0].transcript;
        }
        field.value = tx;
      };
      rec.onend = () => { activeRecog = null; btn.classList.remove("recording"); };
      rec.start();
      activeRecog = rec;
      btn.classList.add("recording");
    });
  });
}

// ===== PDF export (simple structured report) =====
async function exportPDF(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const name = $("input[name='name']").value || "-";
  const age = $("input[name='age']").value || "-";
  const gender = $("select[name='gender']").value || "-";

  const symptoms = Array.from($$("input[name='symptoms']:checked")).map(i=>i.value);
  const symptomsOther = $("input[name='symptoms_other']").value?.trim();
  if (symptomsOther) symptoms.push(symptomsOther);

  const history = $("textarea[name='history']").value || "-";
  const meds = $("textarea[name='medications']").value || "-";

  const smoking = $("select[name='smoking']").value || "-";
  const alcohol = $("select[name='alcohol']").value || "-";
  const exercise = $("input[name='exercise']").value || "-";

  doc.setFontSize(16);
  doc.text("HART Intake Report", 14, 18);
  doc.setFontSize(11);
  doc.text(`Name: ${name}`, 14, 28);
  doc.text(`Age: ${age}`, 14, 34);
  doc.text(`Gender: ${gender}`, 14, 40);

  doc.text("Symptoms:", 14, 50);
  doc.text(`• ${symptoms.join(", ") || "-"}`, 20, 56, { maxWidth: 170 });

  doc.text("Medical History:", 14, 70);
  doc.text(history || "-", 20, 76, { maxWidth: 170 });

  doc.text("Medications:", 14, 92);
  doc.text(meds || "-", 20, 98, { maxWidth: 170 });

  doc.text("Lifestyle:", 14, 114);
  doc.text(`Smoking: ${smoking} | Alcohol: ${alcohol} | Exercise (hrs/wk): ${exercise}`, 20, 120, { maxWidth: 170 });

  doc.save(`HART_Intake_${name.replace(/\s+/g,'_')}.pdf`);
}

// ===== Submit handler =====
async function submitForm(e){
  e.preventDefault();

  // If any emergency flag checked, keep disabled and block submission
  if (!$("#submitBtn").disabled && !$("#emergencyBanner").classList.contains("hidden")) {
    return;
  }

  const loading = $("#loading");
  const resultEl = $("#result");
  loading.classList.remove("hidden");
  resultEl.textContent = "";

  // Gather required fields & build payload for backend schema
  const name = $("input[name='name']").value?.trim();
  const ageRaw = $("input[name='age']").value;
  const age = ageRaw ? parseInt(ageRaw, 10) : ageRaw;
  const gender = $("select[name='gender']").value;

  const symptoms = Array.from($$("input[name='symptoms']:checked")).map(i=>i.value);
  const other = $("input[name='symptoms_other']").value?.trim();
  if (other) symptoms.push(other);

  const history = $("textarea[name='history']").value?.trim() || "";
  const medications = $("textarea[name='medications']").value?.trim() || "";

  // Optional data (we fold into history so backend receives one combined field)
  const smoking = $("select[name='smoking']").value;
  const alcohol = $("select[name='alcohol']").value;
  const exercise = $("input[name='exercise']").value;

  let combinedHistory = history;
  const lifestyleBits = [];
  if (smoking) lifestyleBits.push(`Smoking: ${smoking}`);
  if (alcohol) lifestyleBits.push(`Alcohol: ${alcohol}`);
  if (exercise) lifestyleBits.push(`Exercise hours/week: ${exercise}`);
  if (lifestyleBits.length){
    combinedHistory += (combinedHistory ? "\n" : "") + "Lifestyle: " + lifestyleBits.join("; ");
  }

  // Build payload (exactly what backend expects)
  const payload = {
    name,
    age,
    gender,
    symptoms,
    history: combinedHistory,
    medications
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`Backend error: ${res.status}`);

    const data = await res.json();
    resultEl.textContent = JSON.stringify(data, null, 2);
  } catch (err){
    resultEl.textContent = "Error: " + err.message;
  } finally {
    loading.classList.add("hidden");
  }
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  // Default language EN
  applyTranslations("en");

  // Language switch
  const langSelect = document.getElementById("langSelect");
  langSelect.addEventListener("change", (e) => applyTranslations(e.target.value));

  // Emergency events
  $$(".rf").forEach(cb => cb.addEventListener("change", updateEmergencyState));

  // Mic buttons
  setupMicButtons();

  // Form submit
  document.getElementById("intakeForm").addEventListener("submit", submitForm);

  // PDF export
  document.getElementById("pdfBtn").addEventListener("click", exportPDF);
});
