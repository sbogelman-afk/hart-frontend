const form = document.getElementById("intakeForm");
const resultEl = document.getElementById("result");
const loadingEl = document.getElementById("loading");
const emergencyEl = document.getElementById("emergency");
const langSelect = document.getElementById("lang");
const pdfBtn = document.getElementById("pdfBtn");

// Emergency red flag check
document.getElementById("fainting").addEventListener("change", e => {
  emergencyEl.style.display = e.target.value === "Yes" ? "block" : "none";
});

// Translations
const translations = {
  ru: {
    name: "Имя", age: "Возраст", gender: "Пол", contact: "Контактная информация",
    chief_complaint: "Основная жалоба", history: "История болезни",
    primary: "Вопросы терапевта", meds: "Текущие лекарства", allergies: "Аллергии",
    cardio: "Вопросы кардиолога", chest_pain: "У вас есть боль в груди?",
    palpitations: "У вас есть сердцебиение?", sob: "Одышка?",
    fainting: "Были ли у вас обмороки недавно?"
  },
  he: {
    name: "שם", age: "גיל", gender: "מגדר", contact: "פרטי קשר",
    chief_complaint: "תלונה עיקרית", history: "היסטוריה רפואית",
    primary: "שאלות רופא משפחה", meds: "תרופות נוכחיות", allergies: "אלרגיות",
    cardio: "שאלות קרדיולוגיה", chest_pain: "האם יש לך כאבים בחזה?",
    palpitations: "האם יש לך דפיקות לב?", sob: "קוצר נשימה?",
    fainting: "האם התעלפת לאחרונה?"
  }
};

langSelect.addEventListener("change", () => {
  const lang = langSelect.value;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    } else if (lang === "en") {
      el.textContent = el.getAttribute("data-i18n").replace("_", " ");
    }
  });
});

// PDF generator
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

  doc.text("History of Present Illness:", 10, y); y += 6;
  doc.text(answers.history || "", 10, y); y += 10;

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

// Submit handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  resultEl.textContent = "";
  pdfBtn.style.display = "none";
  loadingEl.style.display = "flex";

  const formData = new FormData(form);
  const answers = {};
  formData.forEach((value, key) => { answers[key] = value; });

  try {
    const res = await fetch("/.netlify/functions/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers })
    });

    if (!res.ok) throw new Error(`Backend error: ${res.status}`);
    const data = await res.json();
    resultEl.textContent = JSON.stringify(data, null, 2);

    // enable PDF download
    pdfBtn.style.display = "inline-block";
    pdfBtn.onclick = () => generatePDF(answers, data);

  } catch (err) {
    resultEl.textContent = "Error: " + err.message;
  } finally {
    loadingEl.style.display = "none";
  }
});
