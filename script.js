/**** CONFIG ****/
const EMAILJS_PUBLIC_KEY = "";         // e.g. "w9x_your_public_key"
const EMAILJS_SERVICE_ID = "";         // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "";        // e.g. "template_def456"
const HART_EMAIL = "hart.intake.central@gmail.com"; // where to send

// i18n strings
const t = {
  en: {
    welcome: "Welcome! Please complete the intake below. Do not include any personal identifiers.",
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

    sect_intake: "Guided Intake",
    email_label: "Your email (to receive the result)*",
    age_label: "Age*",
    gender_label: "Gender",
    gender_m: "Male", gender_f: "Female", gender_o: "Other",
    select_prompt: "Select…",

    symptoms_label: "What symptoms are you experiencing? (check all that apply)",
    s_cough: "Cough", s_chest_pain: "Chest pain", s_sob: "Shortness of breath",
    s_fever: "Fever", s_palpitations: "Palpitations", s_headache: "Headache",
    s_nausea: "Nausea", s_dizziness: "Dizziness",

    submit: "Submit",
    evaluating: "Preparing your submission…",
    result_header: "Submission prepared",
    result_note: "Your intake has been prepared. We will email your AI evaluation shortly.",
    send_email: "Send to HART",
    download_json: "Download JSON",
    copy_json: "Copy JSON",
    footer_note: "This form does not provide medical diagnosis. For emergencies, call 911."
  },
  ru: {
    welcome: "Добро пожаловать! Пожалуйста, заполните форму. Личные данные не указывайте.",
    emergency_header: "Тревожные симптомы",
    emergency_note: "Если что-то из этого присутствует — обратитесь за экстренной помощью.",
    rf_chest_pain: "Сильная боль в груди",
    rf_severe_sob: "Сильная одышка",
    rf_stroke: "Асимметрия лица или внезапная слабость",
    rf_bleeding: "Неконтролируемое кровотечение",
    rf_confusion: "Выраженная спутанность сознания",
    rf_suicidal: "Суицидальные мысли",
    call911_title: "Возможная неотложная ситуация.",
    call911_text: "Позвоните 911 или обратитесь в ближайшее отделение неотложной помощи.",

    sect_intake: "Умная анкета",
    email_label: "Ваш e-mail (для отправки результата)*",
    age_label: "Возраст*",
    gender_label: "Пол",
    gender_m: "Мужской", gender_f: "Женский", gender_o: "Другое",
    select_prompt: "Выберите…",

    symptoms_label: "Какие симптомы вы испытываете? (можно несколько)",
    s_cough: "Кашель", s_chest_pain: "Боль в груди", s_sob: "Одышка",
    s_fever: "Лихорадка", s_palpitations: "Сердцебиение", s_headache: "Головная боль",
    s_nausea: "Тошнота", s_dizziness: "Головокружение",

    submit: "Отправить",
    evaluating: "Подготовка данных…",
    result_header: "Заявка подготовлена",
    result_note: "Мы отправим вам AI-оценку по e-mail.",
    send_email: "Отправить в HART",
    download_json: "Скачать JSON",
    copy_json: "Копировать JSON",
    footer_note: "Эта форма не является диагнозом. При неотложных состояниях звоните 911."
  },
  he: {
    welcome: "ברוכים הבאים! אנא מלאו את הטופס. אין להזין פרטים מזהים.",
    emergency_header: "אזהרות חירום",
    emergency_note: "אם אחד מאלה קיים – פנו לעזרה דחופה.",
    rf_chest_pain: "כאבים חזקים בחזה",
    rf_severe_sob: "קוצר נשימה חמור",
    rf_stroke: "צניחת פנים או חולשה חדשה",
    rf_bleeding: "דימום שאינו נפסק",
    rf_confusion: "בלבול קשה",
    rf_suicidal: "מחשבות אובדניות",
    call911_title: "יתכן מצב חירום.",
    call911_text: "התקשרו 911 או פנו למיון הקרוב.",

    sect_intake: "טופס חכם",
    email_label: "אימייל (לקבלת התוצאה)*",
    age_label: "גיל*",
    gender_label: "מין",
    gender_m: "זכר", gender_f: "נקבה", gender_o: "אחר",
    select_prompt: "בחרו…",

    symptoms_label: "אילו תסמינים קיימים? (ניתן לבחור כמה)",
    s_cough: "שיעול", s_chest_pain: "כאבים בחזה", s_sob: "קוצר נשימה",
    s_fever: "חום", s_palpitations: "דופק מהיר", s_headache: "כאבי ראש",
    s_nausea: "בחילה", s_dizziness: "סחרחורת",

    submit: "שליחה",
    evaluating: "מכין נתונים…",
    result_header: "השליחה הוכנה",
    result_note: "נשלח אליכם דו״ח AI למייל.",
    send_email: "שלח ל-HART",
    download_json: "הורד JSON",
    copy_json: "העתק JSON",
    footer_note: "טופס זה אינו אבחון רפואי. בחירום חייגו 911."
  }
};

const $ = (s)=>document.querySelector(s);
const $$ = (s)=>document.querySelectorAll(s);

let currentLang = "en";
let currentFormId = null;
let currentPayload = null;

/*** i18n + RTL ***/
function applyTranslations(lang){
  currentLang = lang;
  document.documentElement.setAttribute("lang", lang);
  if (lang === "he"){
    document.documentElement.setAttribute("dir","rtl");
    document.body.classList.add("rtl");
  } else {
    document.documentElement.setAttribute("dir","ltr");
    document.body.classList.remove("rtl");
  }
  // text nodes
  $$("[data-i18n]").forEach(el=>{
    const k = el.getAttribute("data-i18n");
    if (t[lang][k] !== undefined) el.textContent = t[lang][k];
  });
  // select prompts
  $$("option[data-i18n='select_prompt']").forEach(opt=>{
    opt.textContent = t[lang].select_prompt;
  });
  // activate button state
  $$(".lang-btn").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.lang===lang);
  });
}

/*** emergency flags ***/
function updateEmergencyState(){
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

/*** dynamic follow-ups ***/
const followUpsDict = {
  cough: [
    { key:"cough_type", label:{en:"Is it dry or wet?",ru:"Кашель сухой или влажный?",he:"שיעול יבש או לח?"}, type:"select", options:["Dry","Wet","Unsure"] },
    { key:"cough_duration", label:{en:"When did it start?",ru:"Когда началось?",he:"מתי התחיל?"}, type:"select", options:["<48 hours","3–7 days","1–3 weeks",">3 weeks"] },
    { key:"cough_mucus", label:{en:"Does it produce mucus?",ru:"Есть ли мокрота?",he:"האם יש ליחה?"}, type:"select", options:["No","Clear","Yellow/Green","Blood-streaked"] },
    { key:"cough_triggers", label:{en:"Any triggers?",ru:"Есть провоцирующие факторы?",he:"גורמים מעוררים?"}, type:"text" }
  ],
  chest_pain: [
    { key:"cp_location", label:{en:"Where is the pain located?",ru:"Где локализуется боль?",he:"היכן ממוקם הכאב?"}, type:"text" },
    { key:"cp_quality", label:{en:"Describe the pain (pressure, sharp, burning…)",ru:"Характер боли (давящая, колющая…)",he:"תארו את הכאב (לחץ/חד/שורף…)"}, type:"text" },
    { key:"cp_duration", label:{en:"How long does it last?",ru:"Как долго длится?",he:"כמה זמן נמשך?"}, type:"select", options:["Seconds","Minutes","Hours","Constant"] },
    { key:"cp_exertion", label:{en:"Worse with exertion?",ru:"Усиливается при нагрузке?",he:"מוחמר במאמץ?"}, type:"select", options:["Yes","No","Unsure"] },
    { key:"cp_radiation", label:{en:"Does it radiate (arm/jaw/back)?",ru:"Иррадиирует (рука/челюсть/спина)?",he:"האם מקרין (יד/לסת/גב)?"}, type:"select", options:["No","Arm","Jaw","Back","Multiple"] }
  ],
  shortness_of_breath: [
    { key:"sob_context", label:{en:"At rest or with activity?",ru:"В покое или при нагрузке?",he:"במנוחה או במאמץ?"}, type:"select", options:["Rest","Activity","Both"] },
    { key:"sob_orthopnea", label:{en:"Worse when lying flat?",ru:"Хуже лёжа?",he:"מוחמר בשכיבה?"}, type:"select", options:["Yes","No","Unsure"] },
    { key:"sob_onset", label:{en:"Onset speed",ru:"Скорость начала",he:"מהירות התחלה"}, type:"select", options:["Sudden","Gradual"] }
  ],
  fever: [
    { key:"fever_temp", label:{en:"Highest temperature",ru:"Максимальная температура",he:"חום מקסימלי"}, type:"text" },
    { key:"fever_duration", label:{en:"How long?",ru:"Сколько длится?",he:"כמה זמן?"}, type:"select", options:["<24 hours","1–3 days","4–7 days",">7 days"] }
  ],
  palpitations: [
    { key:"palp_rate", label:{en:"How fast? (estimate bpm)",ru:"Насколько часто? (примерно уд/мин)",he:"עד כמה מהיר? (משוער פעימות לדקה)"}, type:"text" },
    { key:"palp_duration", label:{en:"Duration pattern",ru:"Длительность",he:"משך"}, type:"select", options:["Seconds","Minutes","Hours","Constant"] },
    { key:"palp_triggers", label:{en:"Triggers (caffeine, stress…)?",ru:"Провокаторы (кофеин, стресс…)?",he:"גורמים (קפאין, מתח…)?"},
      type:"text" }
  ],
  headache: [
    { key:"ha_location", label:{en:"Location",ru:"Локализация",he:"מיקום"}, type:"text" },
    { key:"ha_character", label:{en:"Character (throbbing, pressure…)",ru:"Характер (пульсирующая…)",he:"אופי (פועם/לחץ…)"}, type:"text" },
    { key:"ha_redflags", label:{en:"Any red flags (worst ever, fever, neck stiffness)?",ru:"Есть «красные флаги» (самая сильная, жар, ригидность шеи)?",he:"דגלים אדומים (הכי חזק, חום, נוקשות צוואר)?"}, type:"text" }
  ],
  nausea: [
    { key:"nausea_vomit", label:{en:"Vomiting present?",ru:"Есть рвота?",he:"האם יש הקאות?"}, type:"select", options:["No","Occasional","Frequent","With blood"] },
    { key:"nausea_triggers", label:{en:"Food triggers or sick contacts?",ru:"Пищевые триггеры/контакт с больными?",he:"גורמי מזון/מגע עם חולים?"}, type:"text" }
  ],
  dizziness: [
    { key:"dizzy_type", label:{en:"Spinning vs lightheaded?",ru:"Кружится или предобморок?",he:"סחרחורת סיבובית או חולשה?"}, type:"select", options:["Spinning","Lightheaded","Unsure"] },
    { key:"dizzy_triggers", label:{en:"Triggers (position changes…)?",ru:"Триггеры (смена положения…)?",he:"גורמים (שינוי תנוחה…)?"},
      type:"text" }
  ]
};

function renderFollowups(){
  const mount = $("#followups");
  const lang = currentLang;
  mount.innerHTML = "";
  const checked = Array.from($$("input[name='symptom']:checked")).map(i=>i.value);

  checked.forEach(sym => {
    const items = followUpsDict[sym] || [];
    if (!items.length) return;
    const block = document.createElement("div");
    block.className = "card";
    const title = document.createElement("h3");
    title.textContent = {
      cough: {en:"Cough details",ru:"Подробности кашля",he:"פרטי שיעול"},
      chest_pain: {en:"Chest pain details",ru:"Боль в груди: детали",he:"פרטי כאב חזה"},
      shortness_of_breath: {en:"Shortness of breath details",ru:"Одышка: детали",he:"פרטי קוצר נשימה"},
      fever: {en:"Fever details",ru:"Лихорадка: детали",he:"פרטי חום"},
      palpitations: {en:"Palpitations details",ru:"Сердцебиение: детали",he:"פרטי דופק מהיר"},
      headache: {en:"Headache details",ru:"Головная боль: детали",he:"פרטי כאב ראש"},
      nausea: {en:"Nausea details",ru:"Тошнота: детали",he:"פרטי בחילה"},
      dizziness: {en:"Dizziness details",ru:"Головокружение: детали",he:"פרטי סחרחורת"}
    }[sym][lang] || sym;
    block.appendChild(title);

    items.forEach(q=>{
      const field = document.createElement("div");
      field.className = "field";
      const lab = document.createElement("label");
      lab.textContent = q.label[lang] || q.label.en;
      field.appendChild(lab);
      if (q.type==="select"){
        const sel = document.createElement("select");
        sel.name = q.key;
        const blank = document.createElement("option");
        blank.value = ""; blank.textContent = t[lang].select_prompt;
        sel.appendChild(blank);
        q.options.forEach(opt=>{
          const o = document.createElement("option");
          o.value = opt; o.textContent = opt;
          sel.appendChild(o);
        });
        field.appendChild(sel);
      } else {
        const inp = document.createElement("input");
        inp.type = "text"; inp.name = q.key;
        field.appendChild(inp);
      }
      block.appendChild(field);
    });

    mount.appendChild(block);
  });
}

/*** utilities ***/
function makeFormId(){
  const ts = new Date().toISOString().replace(/[-:.TZ]/g,"").slice(0,14);
  const rnd = Math.random().toString(36).slice(2,7).toUpperCase();
  return `HART-${ts}-${rnd}`;
}
function collectData(){
  const email = $("#email").value.trim();
  const age = $("#age").value ? Number($("#age").value) : null;
  const gender = $("#gender").value || "";

  const symptoms = Array.from($$("input[name='symptom']:checked")).map(i=>i.value);

  // collect follow-ups
  const followups = {};
  Object.values(followUpsDict).flat().forEach(q=>{
    const el = document.querySelector(`[name="${q.key}"]`);
    if (el && el.value) followups[q.key] = el.value;
  });

  return {
    form_id: currentFormId,
    language: currentLang,
    email,
    age,
    gender,
    symptoms,
    followups
  };
}
function showResultPanel(payload){
  const panel = $("#resultCard");
  const box = $("#result");
  panel.classList.remove("hidden");
  box.textContent = JSON.stringify(payload, null, 2);
}

/*** EmailJS send (client-side) ***/
async function sendEmailViaEmailJS(payload){
  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID){
    alert("EmailJS is not configured yet. Use Download/Copy JSON for now. When ready, add your EmailJS keys at the top of script.js.");
    return;
  }
  // init
  // eslint-disable-next-line
  emailjs.init(EMAILJS_PUBLIC_KEY);

  const variables = {
    to_email: HART_EMAIL,
    subject: `HART Intake ${payload.form_id}`,
    message: JSON.stringify(payload, null, 2)
  };

  await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, variables);
  alert("Submitted to HART inbox. Thank you!");
}

/*** Downloads / copy ***/
function downloadJSON(payload){
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `${payload.form_id}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
async function copyJSON(payload){
  try{
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    alert("Copied JSON to clipboard.");
  }catch{
    alert("Copy failed. Please use Download JSON.");
  }
}

/*** submit ***/
async function submitForm(e){
  e.preventDefault();

  // block if emergency
  const anyEmergency = Array.from($$(".rf")).some(cb=>cb.checked);
  if (anyEmergency){
    return; // submit disabled; banner visible
  }

  // basic required
  if (!$("#email").value || !$("#age").value){
    alert("Please enter your email and age.");
    return;
  }

  $("#loading").classList.remove("hidden");

  try{
    currentPayload = collectData();
    showResultPanel(currentPayload);
    // (No backend call here; we email or download instead)
  }catch(err){
    alert("Error preparing submission.");
  }finally{
    $("#loading").classList.add("hidden");
  }
}

/*** init ***/
document.addEventListener("DOMContentLoaded", ()=>{
  // language buttons
  $$(".lang-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      applyTranslations(btn.dataset.lang);
    });
  });
  applyTranslations("en");

  // emergency checkboxes
  $$(".rf").forEach(cb=>cb.addEventListener("change", updateEmergencyState));

  // symptom dynamic follow-ups
  $$(".chips input[type='checkbox']").forEach(cb=>{
    cb.addEventListener("change", renderFollowups);
  });

  // form id
  currentFormId = makeFormId();

  // submit
  $("#intakeForm").addEventListener("submit", submitForm);

  // actions: email / download / copy
  $("#emailSendBtn").addEventListener("click", async ()=>{
    if (!currentPayload) currentPayload = collectData();
    await sendEmailViaEmailJS(currentPayload);
  });
  $("#downloadBtn").addEventListener("click", ()=>{
    if (!currentPayload) currentPayload = collectData();
    downloadJSON(currentPayload);
  });
  $("#copyBtn").addEventListener("click", ()=>{
    if (!currentPayload) currentPayload = collectData();
    copyJSON(currentPayload);
  });
});
