// ===== Config =====
const API_URL = "https://hart-eval-backend-48887cb98881.herokuapp.com/evaluate";
const API_TOKEN = "hart-backend-secret-2025"; // using backend bearer, OK for testing
let lastEvaluation = null; // store last AI evaluation for PDF export

// ===== Translations (EN, RU, HE) =====
const t = { /* … keep your translations exactly as you pasted … */ };

// ===== Helpers: i18n & RTL =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function applyTranslations(lang){
  if (lang === "he") {
    document.documentElement.setAttribute("dir", "rtl");
    document.body.classList.add("rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    document.body.classList.remove("rtl");
  }

  $$("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[lang][key] !== undefined) el.textContent = t[lang][key];
  });

  $$("[data-ph]").forEach(el => {
    const key = el.getAttribute("data-ph");
    if (t[lang][key] !== undefined) el.setAttribute("placeholder", t[lang][key]);
  });

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

// ===== Speech recognition =====
let activeRecog = null;
function setupMicButtons(){ /* unchanged as in your code */ }

// ===== Show AI Evaluation nicely =====
function showEvaluation(result) {
  lastEvaluation = result; // save for PDF

  $("#result").innerHTML = `
    <div class="evaluation-report">
      <h2>AI Evaluation Report</h2>
      <h3>Chief Complaint</h3>
      <p>${result.chief_complaint}</p>
      <h3>History Summary</h3>
      <p>${result.history_summary}</p>
      <h3>Risk Flags</h3>
      <ul>${Object.entries(result.risk_flags).map(([k,v]) => `<li><b>${k}:</b> ${v}</li>`).join("")}</ul>
      <h3>Recommended Follow-ups</h3>
      <ul>${result.recommended_followups.map(item => `<li>${item}</li>`).join("")}</ul>
      <h3>Differential Considerations</h3>
      <ul>${result.differential_considerations.map(item => `<li>${item}</li>`).join("")}</ul>
      <h3>Patient-Friendly Summary</h3>
      <p>${result.patient_friendly_summary}</p>
      <h3>Emergency Guidance</h3>
      <p class="emergency">🚨 ${result.emergency_guidance} 🚨</p>
      <button id="pdfButton">Download PDF</button>
    </div>
  `;

  // Attach PDF button event
  document.getElementById("pdfButton").addEventListener("click", downloadPDF);
}

// ===== PDF export (calls backend) =====
async function downloadPDF() {
  try {
    const response = await fetch(`${API_URL.replace("/evaluate","")}/export-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify(lastEvaluation)
    });

    if (!response.ok) throw new Error("Failed to export PDF");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "HART_Report.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert("Error exporting PDF: " + err.message);
  }
}

// ===== Submit handler =====
async function submitForm(e){
  e.preventDefault();
  if (!$("#submitBtn").disabled && !$("#emergencyBanner").classList.contains("hidden")) {
    return;
  }

  const loading = $("#loading");
  const resultEl = $("#result");
  loading.classList.remove("hidden");
  resultEl.textContent = "";

  const name = $("input[name='name']").value?.trim();
  const ageRaw = $("input[name='age']").value;
  const age = ageRaw ? parseInt(ageRaw, 10) : ageRaw;
  const gender = $("select[name='gender']").value;

  const symptoms = Array.from($$("input[name='symptoms']:checked")).map(i=>i.value);
  const other = $("input[name='symptoms_other']").value?.trim();
  if (other) symptoms.push(other);

  const history = $("textarea[name='history']").value?.trim() || "";
  const medications = $("textarea[name='medications']").value?.trim() || "";

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

  const payload = { name, age, gender, symptoms, history: combinedHistory, medications };

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
    showEvaluation(data);

  } catch (err){
    resultEl.textContent = "Error: " + err.message;
  } finally {
    loading.classList.add("hidden");
  }
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  applyTranslations("en");

  // New language bar instead of dropdown
  document.querySelectorAll("#langSwitcher button").forEach(btn => {
    btn.addEventListener("click", () => {
      applyTranslations(btn.dataset.lang);
    });
  });

  $$(".rf").forEach(cb => cb.addEventListener("change", updateEmergencyState));
  setupMicButtons();
  document.getElementById("intakeForm").addEventListener("submit", submitForm);
});
