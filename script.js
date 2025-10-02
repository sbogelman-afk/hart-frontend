// =====================
// TRANSLATIONS
// =====================
const translations = {
  en: {
    welcome: "Welcome to HART Intake Form",
    emergency: "Emergency Red Flags",
    general: "General Complaints",
    cardiology: "Cardiology Questions",
    primary: "Primary Care Questions",
    submit: "Submit",
    export: "Export PDF",
    aiEval: "AI Evaluation",
    emergencyWarning: "⚠️ If you experience any of these, call 911 immediately."
  },
  ru: {
    welcome: "Добро пожаловать в форму HART",
    emergency: "Срочные симптомы",
    general: "Общие жалобы",
    cardiology: "Кардиологические вопросы",
    primary: "Вопросы терапевта",
    submit: "Отправить",
    export: "Скачать PDF",
    aiEval: "Оценка AI",
    emergencyWarning: "⚠️ Если у вас есть эти симптомы, срочно звоните 911."
  },
  he: {
    welcome: "ברוכים הבאים לטופס HART",
    emergency: "דגלים אדומים רפואיים",
    general: "תלונות כלליות",
    cardiology: "שאלות קרדיולוגיה",
    primary: "שאלות רופא משפחה",
    submit: "שלח",
    export: "ייצוא PDF",
    aiEval: "הערכת AI",
    emergencyWarning: "⚠️ אם אתם חווים סימפטומים אלו, התקשרו מייד ל-911."
  }
};

let currentLang = "en";

// =====================
// LANGUAGE SWITCHER
// =====================
function switchLanguage(lang) {
  currentLang = lang;
  document.getElementById("welcome-text").innerText = translations[lang].welcome;
  document.getElementById("emergency-label").innerText = translations[lang].emergency;
  document.getElementById("general-label").innerText = translations[lang].general;
  document.getElementById("cardiology-label").innerText = translations[lang].cardiology;
  document.getElementById("primary-label").innerText = translations[lang].primary;
  document.getElementById("submit-btn").innerText = translations[lang].submit;
  document.getElementById("export-btn").innerText = translations[lang].export;
  document.getElementById("ai-label").innerText = translations[lang].aiEval;
  document.getElementById("emergency-warning").innerText = translations[lang].emergencyWarning;
}

// =====================
// EMERGENCY CHECK
// =====================
function checkEmergency() {
  const emergencyChecks = document.querySelectorAll(".emergency-check:checked");
  if (emergencyChecks.length > 0) {
    document.getElementById("emergency-warning").style.display = "block";
  } else {
    document.getElementById("emergency-warning").style.display = "none";
  }
}

// =====================
// BACKEND CALL
// =====================
async function submitForm() {
  const age = parseInt(document.getElementById("age").value, 10);
  const gender = document.getElementById("gender").value;
  const symptoms = Array.from(document.querySelectorAll("input[name='symptom']:checked"))
    .map(cb => cb.value);

  const payload = {
    name: document.getElementById("name").value,
    age: age,
    gender: gender,
    symptoms: symptoms
  };

  document.getElementById("ai-output").innerText = "Evaluating...";

  try {
    const response = await fetch("https://hart-eval-backend-48887cb98881.herokuapp.com/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer hart-backend-secret-2025"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      document.getElementById("ai-output").innerText = `Backend error: ${response.status}\n${errorText}`;
      return;
    }

    const data = await response.json();
    document.getElementById("ai-output").innerText = JSON.stringify(data, null, 2);

  } catch (error) {
    document.getElementById("ai-output").innerText = "Error: " + error.message;
  }
}

// =====================
// PDF EXPORT
// =====================
function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const symptoms = Array.from(document.querySelectorAll("input[name='symptom']:checked"))
    .map(cb => cb.value);

  doc.text("HART Intake Report", 10, 10);
  doc.text(`Name: ${name}`, 10, 20);
  doc.text(`Age: ${age}`, 10, 30);
  doc.text(`Gender: ${gender}`, 10, 40);
  doc.text(`Symptoms: ${symptoms.join(", ")}`, 10, 50);

  const aiText = document.getElementById("ai-output").innerText;
  doc.text("AI Evaluation:", 10, 70);
  doc.text(aiText, 10, 80, { maxWidth: 180 });

  doc.save("HART_Intake.pdf");
}
