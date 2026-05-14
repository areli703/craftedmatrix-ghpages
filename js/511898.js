<script>
  (function () {
  const WEBHOOK_URL = "PASTE_YOUR_ACTIVEPIECES_WEBHOOK_URL_HERE";
  const DOWNLOAD_URL = "PASTE_YOUR_FILE_URL_HERE"; // optional if you want instant redirect

  const form = document.getElementById("ebookForm");
  const emailInput = document.getElementById("ebookEmail");
  const msg = document.getElementById("ebookMsg");
  const btn = document.getElementById("ebookBtn");

  function showMessage(text, ok) {
    msg.classList.remove("hidden");
    msg.textContent = text;
    msg.className = "mt-3 text-sm " + (ok ? "text-emerald-200" : "text-red-200");
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = (emailInput.value || "").trim();
    if (!email || !email.includes("@")) {
      showMessage("Please enter a valid email address.", false);
      return;
    }

    btn.disabled = true;
    btn.textContent = "Sending…";

    try {
      const payload = {
        email,
        source: "craftedmatrix.com ebook form",
        page: window.location.href,
        timestamp: new Date().toISOString()
      };

      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Webhook request failed");

      // Choose ONE behavior:
      // 1) Email the link via ActivePieces (recommended)
      showMessage("✅ Check your email for the download link.", true);

      // 2) Optional: instantly open the file after submit
      // if (DOWNLOAD_URL && DOWNLOAD_URL.indexOf("PASTE_") === -1) {
      //   window.open(DOWNLOAD_URL, "_blank", "noopener,noreferrer");
      // }

      form.reset();
    } catch (err) {
      console.error(err);
      showMessage("Something didn’t go through. Please try again in a moment.", false);
    } finally {
      btn.disabled = false;
      btn.textContent = "Get eBook";
    }
  });
})();
</script>