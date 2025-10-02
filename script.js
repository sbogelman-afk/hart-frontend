const form = document.getElementById("intakeForm");
const resultEl = document.getElementById("result");
const loadingEl = document.getElementById("loading");
const emergencyEl = document.getElementById("emergency");
const pdfBtn = document.getElementById("pdfBtn");

// --- Language Translations ---
const translations = {
  ru: {
    general_info: "Информация о пациенте", name: "Имя", age: "Возраст", gender: "Пол", contact: "Контакт",
    complaint: "Жалобы и история", chief_complaint: "Основная жалоба", history: "История болезни",
    primary: "Вопросы терапевта", meds: "Текущие лекарства", allergies: "Аллергии",
    cardio: "Вопросы кардиолога", symptoms: "Выберите все симптомы:",
    emergency: "Проверка на экстренные случаи", fainting: "У вас были обмороки?"
  },
  he: {
    general_info: "מידע על המטופל", name: "שם", age: "גיל", gender: "מגדר", contact: "פרטי קשר",
    complaint: "תלונות והיסטוריה", chief_complaint: "תלונה עיקרית", history: "היסטוריה רפואית",
    primary: "שאלות רופא משפחה", meds: "תרופות נוכחיות", allergies: "אלרגיות",
    cardio: "שאלות קרדיולוגיה", symptoms: "בחר את כל הסימפטומים:",
    emergency: "בדיקת חירום", fainting: "האם התעלפת לאחרונה?"
  }
};

// Language switching with active button
document.querySelectorAll(".lang-switch button").forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    document.querySelectorAll(".lang-switch button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      } else if (lang === "en") {
        el.textContent = el.getAttribute("data-i18n").replace("_", " ");
      }
    });
  });
});

// --- Emergency flag check ---
document.getElementById("fainting").addEventListener("change", e => {
  emergencyEl.style.display = e.target.value === "Yes" ? "block" : "none";
});

// --- Voice recording support ---
const voiceLangMap = {
  en: "en-US",
  ru: "ru-RU",
  he: "he-IL"
};

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

// --- PDF Generator ---
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
  doc.text(`Symptoms: ${(answers.symptoms || []).join(", ")}`, 10, y); y += 10;

  doc.text("Emergency:", 10, y); y += 6;
  doc.text(`Fainting: ${answers.fainting || ""}`, 10, y); y += 10;

  doc.text("AI Evaluation:", 10, y); y += 6;
  const evalStr = JSON.stringify(evaluation, null, 2);
  doc.text(doc.splitTextToSize(evalStr, 180), 10, y);

  doc.save(uid + ".pdf");
}

// --- Submit handler ---
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  resultEl.textContent = "";
  pdfBtn.style.display = "none";
  loadingEl.style.display = "flex";

  const formData = new FormData(form);
  const answers = {};
  formData.forEach((value, key) => {
    if (answers[key]) {
      if (!Array.isArray(answers[key])) answers[key] = [answers[key]];
      answers[key].push(value);
    } else {
      answers[key] = value;
    }
  });

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
