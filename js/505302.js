// Year
const yearEl = document.getElementById("cmYear");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Optional newsletter -> webhook
(function () {
  const form = document.getElementById("cmNewsletter");
  if (!form) return;
  const webhook = form.getAttribute("data-webhook");
  const msg = document.getElementById("cmNewsletterMsg");

  // If you don’t set a webhook, it will just do nothing (safe)
  if (!webhook || webhook.includes("PASTE_")) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = (form.querySelector('input[name="email"]')?.value || "").trim();
    if (!email || !email.includes("@")) return;

    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "craftedmatrix footer newsletter", page: window.location.href })
      });
      if (!res.ok) throw new Error("Webhook failed");

      if (msg) {
        msg.classList.remove("hidden");
        msg.textContent = "✅ You’re subscribed. Welcome aboard.";
      }
      form.reset();
    } catch (err) {
      if (msg) {
        msg.classList.remove("hidden");
        msg.textContent = "Couldn’t subscribe right now — try again in a moment.";
      }
    }
  });
})();