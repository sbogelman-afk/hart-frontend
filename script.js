document.getElementById("intakeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const evaluatingDiv = document.getElementById("evaluating");
  const resultDiv = document.getElementById("result");

  // Show "evaluating" only after submit
  evaluatingDiv.style.display = "block";
  resultDiv.innerText = "";

  const formData = {
    name: document.getElementById("name").value,
    age: parseInt(document.getElementById("age").value), // ensure it's a number
    gender: document.getElementById("gender").value,
    symptoms: Array.from(document.querySelectorAll("input[name='symptoms']:checked")).map(el => el.value),
    history: document.getElementById("history").value
  };

  try {
    const response = await fetch("https://hart-eval-backend-48887cb98881.herokuapp.com/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer hart-backend-secret-2025"   // ✅ Always send token
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json();
    resultDiv.innerText = JSON.stringify(data, null, 2);

  } catch (err) {
    resultDiv.innerText = `Error: ${err.message}`;
  } finally {
    evaluatingDiv.style.display = "none";
  }
});
