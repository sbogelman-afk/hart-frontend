// === EmailJS init (your public key) ===
emailjs.init("9CnCLpzz0nKl_y4gf");

// === Simple i18n dictionary (EN, RU, HE) ===
const I18N = {
  en: {
    tagline:"Human + AI Health Interpreter",
    intro:"Please complete this short intake (no personal data—email only so we can return your AI evaluation).",
    emerg_title:"Emergency Red Flags",
    emerg_note:"If any of these apply, stop and seek emergency care.",
    rf_chest:"Severe chest pain",
    rf_sob:"Severe shortness of breath",
    rf_stroke:"Facial droop or new weakness",
    rf_bleed:"Uncontrolled bleeding",
    rf_confusion:"Severe confusion",
    rf_suicide:"Suicidal thoughts",
    call911_title:"Possible emergency.",
    call911_text:"Please call 911 or go to the nearest emergency department now.",
    contact_title:"Contact",
    email_label:"Email*",
    symptoms_title:"Symptoms",
    symptoms_note:"Select all that apply:",
    s_cough:"Cough",
    s_chest:"Chest pain",
    s_sob:"Shortness of breath",
    s_fever:"Fever",
    s_fatigue:"Fatigue",
    s_headache:"Headache",
    s_nausea:"Nausea",
    s_dizziness:"Dizziness",
    s_palpitations:"Palpitations",
    other_label:"Other (optional)",
    follow_title:"Follow-up Details",
    select_prompt:"Select…",
    // cough
    fu_cough_h:"Cough details",
    cough_type:"Type",
    cough_dry:"Dry",
    cough_wet:"Wet (productive)",
    cough_duration:"How long (days)?",
    cough_sputum:"Mucus color (if any)",
    cough_worse_when:"Worse at night or exertion?",
    // chest pain
    fu_chest_h:"Chest pain details",
    chest_location:"Location",
    chest_quality:"Quality (pressure, sharp, burning…)",
    chest_duration:"Duration (minutes)",
    chest_triggers:"Triggers/relief",
    chest_radiation:"Radiation (arm, jaw, back?)",
    // SOB
    fu_sob_h:"Shortness of breath details",
    sob_when:"When does it occur (rest, exertion, lying)?",
    sob_onset:"Onset (sudden/gradual)",
    sob_associated:"Associated symptoms (wheeze, edema)",
    // Fever
    fu_fever_h:"Fever details",
    fever_temp:"Highest temperature (°F/°C)",
    fever_days:"How many days?",
    fever_other:"Other symptoms (chills, sore throat…)",
    // Free text
    free_text_title:"Anything else we should know?",
    // Actions
    submit:"Send to HART",
    loading:"Sending…",
    footer_note:"This form does not provide medical diagnosis. For emergencies, call 911.",
    // result
    sent_ok:"✅ Intake sent to HART. You will receive your evaluation by email.",
    sent_fail:"❌ Failed to send. Please try again later."
  },
  ru: {
    tagline:"Человек + ИИ: медицинский переводчик",
    intro:"Заполните короткую анкету (без персональных данных — только email для ответа).",
    emerg_title:"Неотложные симптомы",
    emerg_note:"При наличии — немедленно обратитесь за экстренной помощью.",
    rf_chest:"Сильная боль в груди",
    rf_sob:"Сильная одышка",
    rf_stroke:"Асимметрия лица или внезапная слабость",
    rf_bleed:"Неконтролируемое кровотечение",
    rf_confusion:"Выраженная спутанность",
    rf_suicide:"Суицидальные мысли",
    call911_title:"Возможная неотложная ситуация.",
    call911_text:"Позвоните 911 или обратитесь в ближайший стационар.",
    contact_title:"Контакты",
    email_label:"Email*",
    symptoms_title:"Симптомы",
    symptoms_note:"Отметьте все подходящее:",
    s_cough:"Кашель",
    s_chest:"Боль в груди",
    s_sob:"Одышка",
    s_fever:"Лихорадка",
    s_fatigue:"Усталость",
    s_headache:"Головная боль",
    s_nausea:"Тошнота",
    s_dizziness:"Головокружение",
    s_palpitations:"Сердцебиение",
    other_label:"Другое (необязательно)",
    follow_title:"Уточняющие вопросы",
    select_prompt:"Выберите…",
    // cough
    fu_cough_h:"Подробности о кашле",
    cough_type:"Тип",
    cough_dry:"Сухой",
    cough_wet:"Влажный (с мокротой)",
    cough_duration:"Сколько дней?",
    cough_sputum:"Цвет мокроты (если есть)",
    cough_worse_when:"Хуже ночью или при нагрузке?",
    // chest pain
    fu_chest_h:"Подробности о боли в груди",
    chest_location:"Локализация",
    chest_quality:"Характер (давящая, острая, жгучая…)",
    chest_duration:"Длительность (мин)",
    chest_triggers:"Провоцирующие/облегчающие факторы",
    chest_radiation:"Иррадиация (рука, челюсть, спина?)",
    // SOB
    fu_sob_h:"Подробности об одышке",
    sob_when:"Когда возникает (покой, нагрузка, лежа)?",
    sob_onset:"Начало (внезапно/постепенно)",
    sob_associated:"Сопровождается свистом, отеками?",
    // Fever
    fu_fever_h:"Подробности о лихорадке",
    fever_temp:"Макс. температура (°F/°C)",
    fever_days:"Сколько дней?",
    fever_other:"Другие симптомы (озноб, боль в горле…)",
    // Free text
    free_text_title:"Что еще важно сообщить?",
    // Actions
    submit:"Отправить в HART",
    loading:"Отправка…",
    footer_note:"Форма не является диагнозом. При неотложных состояниях звоните 911.",
    // result
    sent_ok:"✅ Анкета отправлена. Вы получите ответ на email.",
    sent_fail:"❌ Не удалось отправить. Повторите позже."
  },
  he: {
    tagline:"מתורגמן בריאות אדם+בינה",
    intro:"מלאו טופס קצר (ללא פרטים אישיים — רק אימייל לקבלת ההערכה).",
    emerg_title:"אזהרות חירום",
    emerg_note:"אם אחד מאלה קיים — פנו מיד לעזרה דחופה.",
    rf_chest:"כאבים חזקים בחזה",
    rf_sob:"קוצר נשימה חמור",
    rf_stroke:"צניחת פנים או חולשה חדשה",
    rf_bleed:"דימום שאינו נפסק",
    rf_confusion:"בלבול קשה",
    rf_suicide:"מחשבות אובדניות",
    call911_title:"ייתכן מצב חירום.",
    call911_text:"התקשרו 911 או פנו למיון.",
    contact_title:"פרטי קשר",
    email_label:"אימייל*",
    symptoms_title:"תסמינים",
    symptoms_note:"בחרו את כל המתאים:",
    s_cough:"שיעול",
    s_chest:"כאבים בחזה",
    s_sob:"קוצר נשימה",
    s_fever:"חום",
    s_fatigue:"עייפות",
    s_headache:"כאבי ראש",
    s_nausea:"בחילה",
    s_dizziness:"סחרחורת",
    s_palpitations:"דופק מהיר",
    other_label:"אחר (רשות)",
    follow_title:"שאלות המשך",
    select_prompt:"בחרו…",
    // cough
    fu_cough_h:"פרטי השיעול",
    cough_type:"סוג",
    cough_dry:"יבש",
    cough_wet:"ליחתי",
    cough_duration:"כמה ימים?",
    cough_sputum:"צבע ליחה (אם יש)",
    cough_worse_when:"מחמיר בלילה או במאמץ?",
    // chest pain
    fu_chest_h:"פרטי כאב בחזה",
    chest_location:"מיקום",
    chest_quality:"אופי (לחץ, חד, שורף…)",
    chest_duration:"משך (דקות)",
    chest_triggers:"גורמים/הקלה",
    chest_radiation:"הקרנה (יד, לסת, גב?)",
    // SOB
    fu_sob_h:"פרטי קוצר נשימה",
    sob_when:"מתי קורה (מנוחה, מאמץ, שכיבה)?",
    sob_onset:"התחלה (פתאומי/הדרגתי)",
    sob_associated:"תסמינים נלווים (צפצופים, בצקות)",
    // Fever
    fu_fever_h:"פרטי חום",
    fever_temp:"טמפרטורה מקסימלית (°F/°C)",
    fever_days:"כמה ימים?",
    fever_other:"סימפטומים נוספים (צמרמורות, כאב גרון…)",
    // Free text
    free_text_title:"עוד משהו שכדאי לדעת?",
    // Actions
    submit:"שליחה ל-HART",
    loading:"שולח…",
    footer_note:"טופס זה איננו אבחנה רפואית. בחירום — חייגו 911.",
    // result
    sent_ok:"✅ הטופס נשלח. ההערכה תתקבל באימייל.",
    sent_fail:"❌ השליחה נכשלה. נסו שוב."
  }
};

// Helpers
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// Language & RTL handling
let currentLang = "en";
function setLang(lang){
  currentLang = lang;
  const dict = I18N[lang] || I18N.en;

  // RTL toggle
  if (lang === "he"){
    document.documentElement.setAttribute("dir","rtl");
    document.body.classList.add("rtl");
  } else {
    document.documentElement.setAttribute("dir","ltr");
    document.body.classList.remove("rtl");
  }

  // text nodes
  $$("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(dict[key] !== undefined) el.textContent = dict[key];
  });

  // placeholders / options
  $$("option[data-i18n='select_prompt']").forEach(opt=>{
    opt.textContent = dict.select_prompt;
  });

  // update buttons active
  $$(".lang-btn").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

// Emergency detection
function updateEmergency(){
  const any = Array.from($$(".rf")).some(cb=>cb.checked);
  const banner = $("#emergencyBanner");
  const submit = $("#submitBtn");
  if (any){
    banner.classList.remove("hidden");
    submit.disabled = true;
  } else {
    banner.classList.add("hidden");
    submit.disabled = false;
  }
}

// Show/hide follow-ups
function updateFollowups(){
  const selected = Array.from($$("input[name='symptom']:checked")).map(i=>i.value);
  const ids = ["cough","chest_pain","shortness_of_breath","fever"];
  ids.forEach(id=>{
    const el = $(`#fu_${id}`);
    if (!el) return;
    if (selected.includes(id)){
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  });
}

// Build payload for email
function buildIntake(){
  const email = $("input[name='email']").value.trim();

  const symptoms = Array.from($$("input[name='symptom']:checked")).map(i=>i.value);
  const other = $("input[name='symptom_other']").value.trim();
  if (other) symptoms.push(`other:${other}`);

  const followups = {};

  // cough
  if (symptoms.includes("cough")){
    followups.cough = {
      type: $("select[name='cough_type']").value || "",
      duration_days: $("input[name='cough_days']").value || "",
      sputum: $("input[name='cough_sputum']").value || "",
      worse: $("input[name='cough_worse']").value || ""
    };
  }
  // chest pain
  if (symptoms.includes("chest_pain")){
    followups.chest_pain = {
      location: $("input[name='chest_location']").value || "",
      quality: $("input[name='chest_quality']").value || "",
      duration_min: $("input[name='chest_duration']").value || "",
      triggers: $("input[name='chest_triggers']").value || "",
      radiation: $("input[name='chest_radiation']").value || ""
    };
  }
  // SOB
  if (symptoms.includes("shortness_of_breath")){
    followups.shortness_of_breath = {
      when: $("input[name='sob_when']").value || "",
      onset: $("input[name='sob_onset']").value || "",
      associated: $("input[name='sob_assoc']").value || ""
    };
  }
  // Fever
  if (symptoms.includes("fever")){
    followups.fever = {
      highest_temp: $("input[name='fever_temp']").value || "",
      days: $("input[name='fever_days']").value || "",
      other_symptoms: $("input[name='fever_other']").value || ""
    };
  }

  const freeText = $("textarea[name='free_text']").value.trim();

  return {
    form_id: `HART-${Date.now()}`,
    date: new Date().toLocaleString(),
    language: currentLang,
    email,
    symptoms,
    followups,
    free_text: freeText
  };
}

// Send via EmailJS (uses your Service/Template IDs)
async function sendEmail(intake){
  const intake_json = JSON.stringify(intake, null, 2);

  // We send both a JSON blob and structured fields. Extra fields are ignored if not used in the template.
  const params = {
    // For the JSON-style template
    intake_id: intake.form_id,
    date: intake.date,
    patient_email: intake.email || "N/A",
    intake_json,

    // For a structured template (optional)
    form_id: intake.form_id,
    language: intake.language,
    summary: intake.free_text || "",
    symptoms: intake.symptoms.join(", ")
  };

  // Your IDs
  const SERVICE_ID = "service_op12pek";
  const TEMPLATE_ID = "template_5amo8ib";

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, params);
}

// Submit handler
async function onSubmit(e){
  e.preventDefault();

  // block if emergency
  if (!$("#emergencyBanner").classList.contains("hidden")){
    return;
  }

  // basic validation
  const email = $("input[name='email']").value.trim();
  if (!email){
    $("input[name='email']").focus();
    return;
  }

  const loading = $("#loading");
  const result = $("#result");
  loading.classList.remove("hidden");
  result.classList.add("hidden");

  try{
    const intake = buildIntake();
    await sendEmail(intake);
    result.textContent = I18N[currentLang].sent_ok;
    result.classList.remove("hidden");
    // optionally reset form
    // document.querySelector("form")?.reset();
  }catch(err){
    console.error(err);
    result.textContent = I18N[currentLang].sent_fail;
    result.classList.remove("hidden");
  }finally{
    loading.classList.add("hidden");
  }
}

// Init
document.addEventListener("DOMContentLoaded", ()=>{
  // language switch buttons
  $$(".lang-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      setLang(btn.dataset.lang);
    });
  });

  // default EN
  setLang("en");

  // emergency & followups
  $$(".rf").forEach(cb => cb.addEventListener("change", updateEmergency));
  $$("input[name='symptom']").forEach(cb => cb.addEventListener("change", updateFollowups));

  // submit
  $("#submitBtn").addEventListener("click", onSubmit);
});
