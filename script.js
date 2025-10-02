const form = document.getElementById("intakeForm");
const resultEl = document.getElementById("result");
const loadingEl = document.getElementById("loading");
const pdfBtn = document.getElementById("pdfBtn");
const emergencyWarning = document.getElementById("emergencyWarning");

// --- TRANSLATIONS ---
const translations = {
  en: {
    header: "HART – Human-AI Relationship in Health",
    welcome: "Welcome! Please fill out this intake form carefully. This will help us prepare your visit and guide your care.",
    emergencyHeader: "Emergency Red Flags",
    patientHeader: "Patient Information",
    complaintHeader: "Chief Complaint",
    historyHeader: "History of Present Illness",
    generalHeader: "General Complaints",
    primaryHeader: "Primary Care Questions",
    cardioHeader: "Cardiology",
    emergencyWarning: "⚠️ These symptoms may indicate a medical emergency. Please call 911 or your local emergency services immediately.",
    chestPain: "Chest pain",
    severeBreath: "Severe shortness of breath",
    fainting: "Fainting",
    confusion: "Confusion",
    bleeding: "Uncontrolled bleeding",
    fatigue: "Fatigue",
    headache: "Headache",
    fever: "Fever",
    dizziness: "Dizziness",
    nausea: "Nausea",
    palpitations: "Palpitations",
    breath: "Shortness of breath",
    submit: "Submit",
    gender: "Gender",
    male: "Male", female: "Female", other: "Other"
  },
  ru: {
    header: "HART – Человек-ИИ во здравоохранении",
    welcome: "Добро пожаловать! Пожалуйста, заполните эту форму внимательно. Это поможет подготовить визит и направить лечение.",
    emergencyHeader: "Экстренные признаки",
    patientHeader: "Информация о пациенте",
    complaintHeader: "Основная жалоба",
    historyHeader: "История болезни",
    generalHeader: "Общие жалобы",
    primaryHeader: "Вопросы для терапевта",
    cardioHeader: "Кардиология",
    emergencyWarning: "⚠️ Эти симптомы могут указывать на неотложное состояние. Немедленно звоните 103 или в службу скорой помощи.",
    chestPain: "Боль в груди",
    severeBreath: "Сильная одышка",
    fainting: "Обморок",
    confusion: "Спутанность сознания",
    bleeding: "Неконтролируемое кровотечение",
    fatigue: "Усталость",
    headache: "Головная боль",
    fever: "Лихорадка",
    dizziness: "Головокружение",
    nausea: "Тошнота",
    palpitations: "Сердцебиение",
    breath: "Одышка",
    submit: "Отправить",
    gender: "Пол",
    male: "Мужской", female: "Женский", other: "Другой"
  },
  he: {
    header: "HART – קשר אדם-בינה מלאכותית בבריאות",
    welcome: "ברוך הבא! אנא מלא טופס זה בזהירות. זה יעזור לנו להכין את ביקורך ולהדריך את הטיפול.",
    emergencyHeader: "סימני חירום",
    patientHeader: "פרטי מטופל",
    complaintHeader: "תלונה עיקרית",
    historyHeader: "היסטוריה רפואית",
    generalHeader: "תלונות כלליות",
    primaryHeader: "שאלות לרופא משפחה",
    cardioHeader: "קרדיולוגיה",
    emergencyWarning: "⚠️ סימנים אלו עלולים להעיד על מצב חירום רפואי. התקשר מיד למד״א או לשירותי חירום.",
    chestPain: "כאב בחזה",
    severeBreath: "קוצר נשימה חמור",
    fainting: "עילפון",
    confusion: "בלבול",
    bleeding: "דימום בלתי נשלט",
    fatigue: "עייפות",
    headache: "כאב ראש",
    fever: "חום",
    dizziness: "סחרחורת",
    nausea: "בחילה",
    palpitations: "דפיקות לב",
    breath: "קוצר נשימה",
    submit: "שלח",
    gender: "מגדר",
    male: "זכר", female: "נקבה", other: "אחר"
  }
};

// --- LANGUAGE SWITCH ---
function setLanguage(lang) {
  const t = translations[lang];
  document.getElementById("header-title").textContent = t.header;
  document.getElementById("welcome-text").textContent = t.welcome;
  document.getElementById("emergency-header").textContent = t.emergencyHeader;
  document.getElementById("patient-header").textContent = t.patientHeader;
  document.getElementById("complaint-header").textContent = t.complaintHeader;
  document.getElementById("history-header").textContent = t.historyHeader;
  document.getElementById("general-header").textContent = t.generalHeader;
  document.getElementById("primary-header").textContent = t.primaryHeader;
  document.getElementById("cardio-header").textContent = t.cardioHeader;
  document.getElementById("emergencyWarning").textContent = t.emergencyWarning;

  document.querySelector("[data-key=chestPain]").textContent = t.chestPain;
  document.querySelector("[data-key=severeBreath]").textContent = t.severeBreath;
  document.querySelectorAll("[data-key=fainting]").forEach(el => el.textContent = t.fainting);
  document.querySelector("[data-key=confusion]").textContent = t.confusion;
  document.querySelector("[data-key=bleeding]").textContent = t.bleeding;
  document.querySelector("[data-key=fatigue]").textContent = t.fatigue;
  document.querySelector("[data-key=headache]").textContent = t.headache;
  document.querySelector("[data-key=fever]").textContent = t.fever;
  document.querySelector("[data-key=dizziness]").textContent = t.dizziness;
  document.querySelector("[data-key=nausea]").textContent = t.nausea;
  document.querySelector("[data-key=palpitations]").textContent = t.palpitations;
  document.querySelector("[data-key=breath]").textContent = t.breath;

  document.getElementById("gender-label").childNodes[0].textContent = t.gender + ": ";
  const genderSelect = document.querySelector("select[name=gender]");
  genderSelect.options[1].text = t.male;
  genderSelect.options[2].text = t.female;
  genderSelect.options[3].text = t.other;

  document.getElementById("submitBtn").textContent = t.submit;
}

document.querySelectorAll(".lang-switch button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lang-switch button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    setLanguage(btn.dataset.lang);
  });
});

// --- Emergency red flags ---
form.querySelectorAll("input[name=emergency]").forEach(cb => {
  cb.addEventListener("change", () => {
    const checked = [...form.querySelectorAll("input[name=emergency]:checked")];
    emergencyWarning.style.display = checked.length > 0 ? "block" : "none";
  });
});

// --- Voice recognition ---
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

// --- Submit form ---
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

  // Remap extra fields to safe keys
  if (answers.emergency) {
    answers.risk_flags = Array.isArray(answers.emergency) ? answers.emergency.join(", ") : answers.emergency;
    delete answers.emergency;
  }
  if (answers.general) {
    answers.general_symptoms = Array.isArray(answers.general) ? answers.general.join(", ") : answers.general;
    delete answers.general;
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

// --- PDF generator ---
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
  doc.text(answers.general_symptoms || "", 10, y); y += 10;

  doc.text("Primary Care:", 10, y); y += 6;
  doc.text(`Medications: ${answers.medications || ""}`, 10, y); y += 6;
  doc.text(`Allergies: ${answers.allergies || ""}`, 10, y); y += 10;

  doc.text("Cardiology:", 10, y); y += 6;
  doc.text(`Chest Pain: ${answers.chest_pain || ""}`, 10, y); y += 6;
  doc.text(`Palpitations: ${answers.palpitations || ""}`, 10, y); y += 6;
  doc.text(`Shortness of Breath: ${answers.shortness_breath || ""}`, 10, y); y += 6;
  doc.text(`Fainting: ${answers.fainting || ""}`, 10, y); y += 10;

  doc.text("Emergency Flags:", 10, y); y += 6;
  doc.text(answers.risk_flags || "", 10, y); y += 10;

  doc.text("AI Evaluation:", 10, y); y += 6;
  const evalStr = JSON.stringify(evaluation, null, 2);
  doc.text(doc.splitTextToSize(evalStr, 180), 10, y);

  doc.save(uid + ".pdf");
}
