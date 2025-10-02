const form = document.getElementById("intakeForm");
const resultEl = document.getElementById("result");
const loadingEl = document.getElementById("loading");
const pdfBtn = document.getElementById("pdfBtn");
const emergencyWarning = document.getElementById("emergencyWarning");

// Language switch
document.querySelectorAll(".lang-switch button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lang-switch button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    // (later: add full translation logic here)
  });
});

// Emergency red flag warning
form.querySelectorAll("input[name=emergency]").forEach(cb => {
  cb.addEventListener("change", () => {
    const checked = [...form.querySelectorAll("input[name=emergency]:checked")];
    emergencyWarning.style.display = checked.length > 0 ? "block" : "none";
  });
});

// Voice recognition
const voiceLangMap = { en: "en-US", ru: "ru-RU", he: "he-IL" };

if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
  document.querySelectorAll(".voice-btn").forEach(btn => btn.style.display = "none");
} else {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  document.querySelectorAll(".voice-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      const currentLang = document.querySelector(".lang-switch button.active")?.dataset.lang || "en";
      const recognition = new SpeechRecognition();
      recognition.lang = voiceLangMap[currentLang] || "en-US";
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        form.querySelector(`[name=${target}]`).value += 
          (form.querySelector(`[name=${target}]`).value ? " " : "") + transcript;
      };
    });
  });
}

// Submit form
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  resultEl.textContent = "";
  pdfBtn.style.display = "none";
  loadingEl.style.display = "flex";

  const formData = new FormData(form);
  const answers = {};

  // Flatten checkboxes and normal inputs
  formData.forEach((value, key) => {
    if (answers[key]) {
      if (!Array.isArray(answers[key])) answers[key] = [answers[key]];
      answers[key].push(value);
    } else {
      answers[key] = value;
    }
  });

  // Flatten arrays to comma-separated strings (backend expects text)
  for (let k in answers) {
    if (Array.isArray(answers[k])) {
      answers[k] = answers[k].join(", ");
    }
  }

  try {
    const res = await fetch("/.netlify/functions/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers })
    });
    if (!res.ok) throw new Error(`Backend error: ${res.status}`);
    const data = await res.json();
    resultEl.textContent = JSON.stringify(data, null, 2);

    pdfBtn.style.display = "inline-block";
    pdfBtn.onclick = () => generatePDF(answers, data);
  } catch (err) {
    resultEl.textContent = "Error: " + err.message;
  } finally {
    loadingEl.style.display = "none";
  }
});

// Generate PDF
function generatePDF(answers, evaluation) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const uid = "HART-" + Date.now();
  doc.setFontSize(16);
  doc.text("HART Intake Report", 10, 20);
  doc.setFontSize(10);
  doc.text("Report ID: " + uid, 10, 28);
  doc.text("Date: " + new Date().toLocaleString(), 10, 34);

  let y = 44;
  doc.setFontSize(12);

  doc.text("Patient Information:", 10, y); y += 6;
  doc.text(`Name: ${answers.name || ""}`, 10, y); y += 6;
  doc.text(`Age: ${answers.age || ""}`, 10, y); y += 6;
  doc.text(`Gender: ${answers.gender || ""}`, 10, y); y += 6;
  doc.text(`Contact: ${answers.contact || ""}`, 10, y); y += 10;

  doc.text("Chief Complaint:", 10, y); y += 6;
  doc.text(answers.chief_complaint || "", 10, y); y += 10;

  doc.text("History:", 10, y); y += 6;
  doc.text(answers.history || "", 10, y); y += 10;

  doc.text("General Complaints:", 10, y); y += 6;
  doc.text(answers.general || "", 10, y); y += 10;

  doc.text("Primary Care:", 10, y); y += 6;
  doc.text(`Medications: ${answers.medications || ""}`, 10, y); y += 6;
  doc.text(`Allergies: ${answers.allergies || ""}`, 10, y); y += 10;

  doc.text("Cardiology:", 10, y); y += 6;
  doc.text(`Chest Pain: ${answers.chest_pain || ""}`, 10, y); y += 6;
  doc.text(`Palpitations: ${answers.palpitations || ""}`, 10, y); y += 6;
  doc.text(`Shortness of Breath: ${answers.shortness_breath || ""}`, 10, y); y += 6;
  doc.text(`Fainting: ${answers.fainting || ""}`, 10, y); y += 10;

  doc.text("AI Evaluation:", 10, y); y += 6;
  const evalStr = JSON.stringify(evaluation, null, 2);
  doc.text(doc.splitTextToSize(evalStr, 180), 10, y);

  doc.save(uid + ".pdf");
}
