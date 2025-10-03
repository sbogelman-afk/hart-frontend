// ===== TRANSLATIONS =====
const translations = {
  en: {
    title: "HART Patient Intake Form",
    emergency: "🚨 Emergency: If you are experiencing severe chest pain, difficulty breathing, or other life-threatening symptoms, please call 911 immediately.",
    name: "Full Name",
    age: "Age",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    symptoms: "Main Symptoms",
    history: "Medical History",
    medications: "Current Medications",
    lifestyle: "Lifestyle Factors",
    smoking: "Smoking",
    alcohol: "Alcohol",
    yes: "Yes",
    no: "No",
    occasional: "Occasional",
    contact: "Contact Information (optional)",
    email: "Email",
    phone: "Phone",
    submit: "Submit",
    pdf: "Download PDF Report",
    evaluation: "AI Evaluation Report"
  },
  ru: {
    title: "Форма регистрации пациента HART",
    emergency: "🚨 Срочно: если у вас сильная боль в груди, затрудненное дыхание или другие угрожающие жизни симптомы, немедленно звоните 911.",
    name: "Полное имя",
    age: "Возраст",
    gender: "Пол",
    male: "Мужской",
    female: "Женский",
    other: "Другое",
    symptoms: "Основные жалобы",
    history: "Медицинская история",
    medications: "Принимаемые лекарства",
    lifestyle: "Факторы образа жизни",
    smoking: "Курение",
    alcohol: "Алкоголь",
    yes: "Да",
    no: "Нет",
    occasional: "Иногда",
    contact: "Контактная информация (необязательно)",
    email: "Эл. почта",
    phone: "Телефон",
    submit: "Отправить",
    pdf: "Скачать отчет PDF",
    evaluation: "Отчет AI-оценки"
  },
  he: {
    title: "טופס קבלה של HART",
    emergency: "🚨 חירום: אם אתה חווה כאב חמור בחזה, קוצר נשימה או תסמינים מסכני חיים אחרים, התקשר ל-911 מיד.",
    name: "שם מלא",
    age: "גיל",
    gender: "מגדר",
    male: "זכר",
    female: "נקבה",
    other: "אחר",
    symptoms: "תסמינים עיקריים",
    history: "היסטוריה רפואית",
    medications: "תרופות נוכחיות",
    lifestyle: "גורמי אורח חיים",
    smoking: "עישון",
    alcohol: "אלכוהול",
    yes: "כן",
    no: "לא",
    occasional: "מדי פעם",
    contact: "פרטי קשר (אופציונלי)",
    email: "דוא״ל",
    phone: "טלפון",
    submit: "שלח",
    pdf: "הורד דוח PDF",
    evaluation: "דוח הערכת AI"
  }
};

let currentLang = "en";

// ===== LANGUAGE SWITCHER =====
function switchLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  document.getElementById("form-title").innerText = t.title;
  document.getElementById("emergency-text").innerText = t.emergency;
  document.getElementById("label-name").innerText = t.name;
  document.getElementById("label-age").innerText = t.age;
  document.getElementById("label-gender").innerText = t.gender;
  document.getElementById("gender-male").innerText = t.male;
  document.getElementById("gender-female").innerText = t.female;
  document.getElementById("gender-other").innerText = t.other;
  document.getElementById("label-symptoms").innerText = t.symptoms;
  document.getElementById("label-history").innerText = t.history;
  document.getElementById("label-medications").innerText = t.medications;
  document.getElementById("label-lifestyle").innerText = t.lifestyle;
  document.getElementById("label-smoking").innerText = t.smoking;
  document.getElementById("label-alcohol").innerText = t.alcohol;
  document.getElementById("smoke-yes").innerText = t.yes;
  document.getElementById("smoke-no").innerText = t.no;
  document.getElementById("smoke-occasional").innerText = t.occasional;
  document.getElementById("alcohol-yes").innerText = t.yes;
  document.getElementById("alcohol-no").innerText = t.no;
  document.getElementById("alcohol-occasional").innerText = t.occasional;
  document.getElementById("label-contact").innerText = t.contact;
  document.getElementById("label-email").innerText = t.email;
  document.getElementById("label-phone").innerText = t.phone;
  document.getElementById("submit-btn").innerText = t.submit;
  document.getElementById("pdf-btn").innerText = t.pdf;
  document.getElementById("evaluation-title").innerText = t.evaluation;
}

// ===== FORM SUBMISSION =====
document.getElementById("intake-form").addEventListener("submit", async function(e) {
  e.preventDefault();
  document.getElementById("loading").style.display = "block";

  const data = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    symptoms: document.getElementById("symptoms").value.split(",").map(s => s.trim()),
    history: document.getElementById("history").value,
    medications: document.getElementById("medications").value
  };

  try {
    const response = await fetch("https://hart-eval-backend-48887cb98881.herokuapp.com/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer hart-backend-secret-2025"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Backend error: " + response.status);

    const result = await response.json();
    displayEvaluation(result, currentLang);

  } catch (err) {
    alert("Error: " + err.message);
  } finally {
    document.getElementById("loading").style.display = "none";
  }
});

// ===== DISPLAY POLISHED EVALUATION =====
function displayEvaluation(result, lang) {
  const container = document.getElementById("evaluation-result");
  container.innerHTML = `
    <div class="report">
      <h2>${translations[lang].evaluation}</h2>
      <h3>Chief Complaint</h3>
      <p>${result.chief_complaint}</p>
      <h3>History Summary</h3>
      <p>${result.history_summary}</p>
      <h3>Risk Flags</h3>
      <ul>${Object.entries(result.risk_flags).map(([k,v]) => `<li><b>${k}:</b> ${v}</li>`).join("")}</ul>
      <h3>Recommended Follow-ups</h3>
      <ul>${result.recommended_followups.map(r => `<li>${r}</li>`).join("")}</ul>
      <h3>Differential Considerations</h3>
      <ul>${result.differential_considerations.map(d => `<li>${d}</li>`).join("")}</ul>
      <h3>Patient-Friendly Summary</h3>
      <p>${result.patient_friendly_summary}</p>
      <h3>Emergency Guidance</h3>
      <p><b>${result.emergency_guidance}</b></p>
    </div>
  `;

  document.getElementById("pdf-btn").style.display = "block";
  document.getElementById("pdf-btn").onclick = () => downloadPDF(result, lang);
}

// ===== PDF GENERATION =====
function downloadPDF(result, lang) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("❤️ HART Patient Evaluation Report", 10, 15);

  doc.setFontSize(12);
  doc.text("Chief Complaint:", 10, 30);
  doc.text(result.chief_complaint, 10, 37);

  doc.text("History Summary:", 10, 50);
  doc.text(result.history_summary, 10, 57);

  doc.text("Risk Flags:", 10, 70);
  Object.entries(result.risk_flags).forEach(([k,v], i) => {
    doc.text(`${k}: ${v}`, 15, 77 + i*7);
  });

  doc.text("Follow-ups:", 10, 110);
  result.recommended_followups.forEach((f, i) => {
    doc.text(`- ${f}`, 15, 117 + i*7);
  });

  doc.text("Differential:", 10, 150);
  result.differential_considerations.forEach((d, i) => {
    doc.text(`- ${d}`, 15, 157 + i*7);
  });

  doc.text("Patient-Friendly Summary:", 10, 190);
  doc.text(result.patient_friendly_summary, 10, 197);

  doc.text("Emergency Guidance:", 10, 220);
  doc.text(result.emergency_guidance, 10, 227);

  doc.save("HART_Evaluation.pdf");
}

// ===== SPEECH RECOGNITION =====
function startRecognition(fieldId) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = currentLang === "ru" ? "ru-RU" : currentLang === "he" ? "he-IL" : "en-US";
  recognition.start();
  recognition.onresult = function(event) {
    document.getElementById(fieldId).value = event.results[0][0].transcript;
  };
}
