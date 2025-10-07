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

    /* added follow-ups placeholders */
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
    yes: "Yes", no: "No", occasional: "Occasional",

    sect_contact: "Contact (email only)",
    email_label: "Your email (to receive evaluation)",
    select_prompt: "Select…",

    submit: "Submit",
    evaluating: "Sending… Please wait.",
    thanks_msg: "Thank you! Your information has been sent. Check your email for next steps.",
    footer_note: "This form does not provide diagnosis. For emergencies, call 911."
  },

  // (ru and he dictionaries unchanged; append the placeholder keys there as shown earlier)
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

/***************
 * TRANSLATION APPLY (with fallback)
 ***************/
function tr(lang, key){
  return (t[lang] && t[lang][key] != null) ? t[lang][key] : (t.en[key] ?? "");
}

function applyTranslations(lang){
  setRTL(lang);
  $$("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    const val = tr(lang, key);
    if (val) el.textContent = val;
  });
  $$("[data-ph]").forEach(el=>{
    const key = el.getAttribute("data-ph");
    const val = tr(lang, key);
    if (val) el.setAttribute("placeholder", val);
  });
  $$("option[data-i18n='select_prompt']").forEach(opt=>{
    opt.textContent = tr(lang, "select_prompt");
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

  // hide all
  Object.values(symptomToBlock).forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.classList.add("hidden");
  });

  const selected = Array.from(document.querySelectorAll("input[name='symptom']:checked"))
    .map(x=>x.value);
  console.log("Selected symptoms:", selected);

  selected.forEach(sym=>{
    const id=symptomToBlock[sym];
    const el=id && document.getElementById(id);
    if(el) el.classList.remove("hidden");
  });

  // show generic "Other" if user typed text
  const otherText = $("#otherSymptoms")?.value.trim();
  const otherFU = document.getElementById("fu-other");
  if (otherFU) {
    if (otherText) otherFU.classList.remove("hidden");
    else if (!selected.includes("other")) otherFU.classList.add("hidden");
  }
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
      const currentLang = window.currentLang || "en";
      rec.lang = (currentLang === "he") ? "he-IL" : (currentLang === "ru") ? "ru-RU" : "en-US";
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
 * EMAIL (EmailJS)
 ***************/
function buildEmailText(lang){
  const formId=$("#formId").textContent.trim();
  const formDate=$("#formDate").textContent.trim();
  const email=$("#email").value.trim();

  const syms=Array.from($$("input[name='symptom']:checked")).map(x=>"• "+x.closest("label").innerText.trim());
  const other=$("#otherSymptoms").value.trim();
  if(other) syms.push("• Other: "+other);

  const fuLines=[];
  if(!$("#fu-cough").classList.contains("hidden")){
    fuLines.push("— Cough:",
      `   Type: ${$("#fuCoughType").value||"-"}`,
      `   Duration: ${$("#fuCoughDuration").value||"-"}`,
      `   Mucus: ${$("#fuCoughSputum").value||"-"}`,
      `   Fever: ${$("#fuCoughFever").value||"-"}`);
  }
  if(!$("#fu-chest_pain").classList.contains("hidden")){
    fuLines.push("— Chest pain:",
      `   Onset: ${$("#fuCpOnset").value||"-"}`,
      `   Character: ${$("#fuCpCharacter").value||"-"}`,
      `   Duration: ${$("#fuCpDuration").value||"-"}`,
      `   Worse w/ exertion: ${$("#fuCpExertion").value||"-"}`,
      `   Radiation: ${$("#fuCpRadiation").value||"-"}`,
      `   Relief at rest: ${$("#fuCpRelief").value||"-"}`);
  }
  if(!$("#fu-sob").classList.contains("hidden")){
    fuLines.push("— Shortness of breath:",
      `   Onset & duration: ${$("#fuSobOnset").value||"-"}`,
      `   Worse lying flat: ${$("#fuSobLying").value||"-"}`,
      `   With minimal exertion: ${$("#fuSobExertion").value||"-"}`,
      `   Wheezing: ${$("#fuSobWheeze").value||"-"}`);
  }
  if(!$("#fu-fatigue").classList.contains("hidden")){
    fuLines.push("— Fatigue:",
      `   Duration: ${$("#fuFatigueDuration").value||"-"}`,
      `   Sleep quality: ${$("#fuFatigueSleep").value||"-"}`,
      `   Weight change: ${$("#fuFatigueWeight").value||"-"}`,
      `   Low mood: ${$("#fuFatigueMood").value||"-"}`);
  }

  const history=$("#history").value.trim()||"-";
  const meds=$("#meds").value.trim()||"-";
  const smoking=$("#smoking").value||"-";
  const alcohol=$("#alcohol").value||"-";
  const exercise=$("#exercise").value||"-";

  const emFlags=Array.from($$(".rf:checked")).map(cb=>"• "+cb.closest("label").innerText.trim());

  return [
    `HART Intake (Form: ${formId}, Date: ${formDate})`,
    "",
    `Language: ${lang.toUpperCase()}`,
    `Patient email: ${email||"(not provided)"}`,
    "",
    "Symptoms:",
    ...(syms.length?syms:["• –"]),
    "",
    "Follow-up details:",
    ...(fuLines.length?fuLines:["— –"]),
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
    ...(emFlags.length?emFlags:["• none selected"]),
    "",
    "— End of intake —"
  ].join("\n");
}

async function sendEmail(formattedText,toEmail){
  const params={
    to_email:"hart.intake.central@gmail.com",
    patient_email:toEmail||"(not provided)",
    message:formattedText
  };
  return emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,params);
}

/***************
 * SUBMIT
 ***************/
async function onSubmit(){
  const anyEmergency=Array.from($$(".rf")).some(cb=>cb.checked);
  if(anyEmergency)return;

  const email=$("#email").value.trim();
  const lang=currentLang;
  const loading=$("#loading");
  const thanks=$("#thanks");

  loading.classList.remove("hidden");
  thanks.classList.add("hidden");

  try{
    const text=buildEmailText(lang);
    await sendEmail(text,email);
    thanks.classList.remove("hidden");
  }catch(err){
    alert("Failed to send. Please try again.\n"+(err?.text||err?.message||err));
  }finally{
    loading.classList.add("hidden");
  }
}

/***************
 * LANGUAGE SWITCH BAR
 ***************/
let currentLang="en";
function setActiveLangButton(lang){
  $$(".lang-btn").forEach(btn=>btn.classList.toggle("active",btn.dataset.lang===lang));
}
function handleLangSwitch(e){
  const lang=e.target.dataset.lang;
  if(!lang)return;
  currentLang=lang;
  setActiveLangButton(lang);
  applyTranslations(lang);
}

/***************
 * INIT
 ***************/
document.addEventListener("DOMContentLoaded",()=>{
  $("#formId").textContent=genFormId();
  $("#formDate").textContent=todayStr();
  applyTranslations("en");
  setActiveLangButton("en");

  $$(".rf").forEach(cb=>cb.addEventListener("change",updateEmergencyState));
  $$("input[name='symptom']").forEach(cb=>cb.addEventListener("change",refreshFollowups));
  $("#otherSymptoms")?.addEventListener("input",refreshFollowups);
  refreshFollowups();

  setupMicButtons();
  $("#submitBtn").addEventListener("click",onSubmit);
  $$(".lang-btn").forEach(btn=>btn.addEventListener("click",handleLangSwitch));
});
