let currentOfficer = "";

// -------------------------
// Verify License
// -------------------------
function verifyLicense() {
  const license = document.getElementById("licenseId").value.trim();
  const error = document.getElementById("loginError");

  if (officers[license]) {
    currentOfficer = officers[license];
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("citationForm").style.display = "block";
    document.getElementById("officerName").value = currentOfficer;
  } else {
    error.textContent = "You are not authorized.";
  }
}

// -------------------------
// Helper: Show Status Message
// -------------------------
const statusBox = document.getElementById("status");

function showStatus(message, type) {
  statusBox.textContent = message;
  statusBox.className = `alert ${type}`;
  statusBox.style.display = "block";

  // Auto-hide after 5 seconds
  setTimeout(() => {
    statusBox.style.display = "none";
  }, 5000);
}

// -------------------------
// Submit Citation Form
// -------------------------
document.getElementById("citationForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const btn = document.getElementById("submitBtn");
  btn.classList.add("loading");
  btn.disabled = true;

  // Gather form data
  const data = {
    title: document.getElementById("title").value,
    incident: document.getElementById("incident").value,
    location: document.getElementById("location").value,
    evidence: document.getElementById("evidence").value,
    report: document.getElementById("report").value,
    suspectName: document.getElementById("suspectName").value,
    cid: document.getElementById("cid").value,
      contact: document.getElementById("contact").value,
    charges: document.getElementById("charges").value,
    officer: document.getElementById("officerName").value
  };

  // Send to Google Sheets via Apps Script
  fetch("https://script.google.com/macros/s/AKfycbzyd8lAi7APGV_wEg8bSuUuIzHsdUt0zHHP5p0SDYTGUXCNKQUa0RNPYy68l1-0_oo_fQ/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(() => {
    showStatus("Citation submitted successfully.", "success");
    document.getElementById("citationForm").reset();
    document.getElementById("officerName").value = currentOfficer;
  })
  .catch(() => {
    showStatus("Submission failed. Please try again.", "error");
  })
  .finally(() => {
    btn.classList.remove("loading");
    btn.disabled = false;
  });
});
