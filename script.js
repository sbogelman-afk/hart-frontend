// ===== Config =====
const API_URL = "https://hart-eval-backend-48887cb98881.herokuapp.com/evaluate";
const API_TOKEN = "hart-backend-secret-2025"; // backend bearer (ok for testing)
let lastEvaluation = null; // store last AI evaluation for PDF export

// ===== Translations (keep yours) =====
const t = window.t || {}; // if your t object is already defined elsewhere, use it

// ===== Helpers =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function applyTranslations(lang){
  if (!t[lang]) return; // no-op if translations missing

  // RTL for Hebrew
  if (lang === "he") {
    document.documentElement.setAttribute("dir", "rtl");
    document.body.classList.add("rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    document.body.classList.remove("rtl");
  }

  // Any element with data-i18n
  $$("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[lang][key] !== undefined) el.textContent = t[lang][key];
  });

  // Placeholders
  $$("[data-ph]").forEach(el => {
    const key = el.getAttribute("data-ph");
    if (t[lang][key] !== undefined) el.setAttribute("placeholder", t[lang][key]);
  });

  // Default "Select…" options
  $$("option[data-i18n='select_prompt']").forEach(opt => {
    opt.textContent = t[lang]["select_prompt"];
  });
}

// ===== Emergency red flags =====
function updateEmergencyState(){
  const anyChecked = Array.from($$(".rf")).some(cb => cb.checked);
  const banner = $("#emergencyBanner");
  const submit = $("#submitBtn");

  if (banner) banner.classList.toggle("hidden", !anyChecked);
  if (submit) submit.disabled = anyChecked; // only if the button exists
}

// ===== Speech recognition =====
let activeRecog = null;
function setupMicButtons(){
  const micButtons = $$(".mic-btn");
  if (!micButtons.length) return;

  micButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetName = btn.getAttribute("data-target");
      const field = document.querySelector(`textarea[name='${targetName}']`);
      if (!field) return;

      if (!("webkitSpeechRecognition" in window)) {
        field.value += (field.value ? "\n" : "") + "[Speech recognition not supported]";
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

// ===== Nicely render AI Evaluation =====
function showEvaluation(result) {
  lastEvaluation = result;

  const container = $("#result");
  if (!container) return;

  container.innerHTML = `
    <div class="evaluation-report">
      <h2>AI Evaluation Report</h2>
      <h3>Chief Complaint</h3>
      <p>${result.chief_complaint ?? "-"}</p>
      <h3>History Summary</h3>
      <p>${result.history_summary ?? "-"}</p>
      <h3>Risk Flags</h3>
      <ul>
        ${Object.entries(result.risk_flags || {}).map(([k,v]) => `<li><b>${k}:</b> ${v}</li>`).join("")}
      </ul>
      <h3>Recommended Follow-ups</h3>
      <ul>${(result.recommended_followups || []).map(item => `<li>${item}</li>`).join("")}</ul>
      <h3>Differential Considerations</h3>
      <ul>${(result.differential_considerations || []).map(item => `<li>${item}</li>`).join("")}</ul>
      <h3>Patient-Friendly Summary</h3>
      <p>${result.patient_friendly_summary ?? "-"}</p>
      <h3>Emergency Guidance</h3>
      <p class="emergency">🚨 ${result.emergency_guidance ?? "-"} 🚨</p>
      <button id="pdfButton" type="button">Download PDF</button>
    </div>
  `;

  const pdfBtn = $("#pdfButton");
  if (pdfBtn) pdfBtn.addEventListener("click", downloadPDF);
}

// ===== PDF export (backend) =====
async function downloadPDF() {
  try {
    const base = API_URL.replace("/evaluate","");
    const response = await fetch(`${base}/export-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify(lastEvaluation || {})
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
  if (e) e.preventDefault();

  // Always block if emergency banner is visible
  const banner = $("#emergencyBanner");
  if (banner && !banner.classList.contains("hidden")) {
    alert("Emergency red flag(s) selected. Please call 911 or go to the ER.");
    return;
  }

  const loading = $("#loading");
  const resultEl = $("#result");
  if (loading) loading.classList.remove("hidden");
  if (resultEl) resultEl.textContent = "";

  // Collect fields
  const name = $("input[name='name']")?.value?.trim() || "";
  const ageRaw = $("input[name='age']")?.value || "";
  const age = ageRaw ? parseInt(ageRaw, 10) : ageRaw;
  const gender = $("select[name='gender']")?.value || "";

  const symptoms = Array.from($$("input[name='symptoms']:checked")).map(i=>i.value);
  const other = $("input[name='symptoms_other']")?.value?.trim();
  if (other) symptoms.push(other);

  const history = $("textarea[name='history']")?.value?.trim() || "";
  const medications = $("textarea[name='medications']")?.value?.trim() || "";

  const smoking = $("select[name='smoking']")?.value || "";
  const alcohol = $("select[name='alcohol']")?.value || "";
  const exercise = $("input[name='exercise']")?.value || "";

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
    if (resultEl) resultEl.textContent = "Error: " + err.message;
    console.error(err);
  } finally {
    if (loading) loading.classList.add("hidden");
  }
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  // Default language
  try { applyTranslations("en"); } catch(_) {}

  // Language BAR support (#langSwitcher) OR fallback to DROPDOWN (#langSelect)
  const langButtons = $$("#langSwitcher button");
  if (langButtons.length) {
    langButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        langButtons.forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        applyTranslations(btn.dataset.lang);
      });
    });
  } else {
    const langSelect = $("#langSelect");
    if (langSelect) {
      langSelect.addEventListener("change", (e) => applyTranslations(e.target.value));
    }
  }

  // Emergency checkbox listeners (no-op if none)
  $$(".rf").forEach(cb => cb.addEventListener("change", updateEmergencyState));
  updateEmergencyState(); // set initial banner state

  // Mic buttons (if present)
  setupMicButtons();

  // Form submit
  const form = $("#intakeForm") || document.querySelector("form");
  if (form) {
    form.addEventListener("submit", submitForm);
  } else {
    console.warn("Form not found: #intakeForm");
  }
});
