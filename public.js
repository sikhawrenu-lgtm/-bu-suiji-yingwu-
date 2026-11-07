(() => {
  "use strict";

  const params = new URLSearchParams(location.search);
  const isDevelopment = ["localhost", "127.0.0.1"].includes(location.hostname) && params.get("dev") === "1";
  if (isDevelopment) return;

  const similarEntry = document.getElementById("navSimilar");
  const similarPage = document.getElementById("similarPage");
  const mockEntry = document.getElementById("navMock");
  const setup = document.getElementById("setup");
  const mobileTitle = document.querySelector(".mobile-head b");
  const resultSummary = document.getElementById("resultSummary");
  const paperView = document.getElementById("paperView");
  const requestedSimilar = location.hash === "#similar" || params.get("feature") === "similar";

  similarEntry?.classList.add("is-hidden");
  similarPage?.classList.add("is-hidden");
  mockEntry?.classList.add("active");
  setup?.classList.remove("is-hidden");
  resultSummary?.classList.add("is-hidden");
  if (mobileTitle) mobileTitle.textContent = "真题组卷";
  mockEntry?.addEventListener("click", () => {
    if (mobileTitle) mobileTitle.textContent = "真题组卷";
  });

  if (requestedSimilar) {
    history.replaceState(null, "", `${location.pathname}#setup`);
  }

  const placeMockNote = () => {
    const heading = paperView?.querySelector(".paper-header h3");
    if (!heading || heading.parentElement.querySelector(".mock-note")) return;
    const note = document.createElement("p");
    note.className = "mock-note";
    note.textContent = "按目标院校的题型与分值，从其他院校真题中选题组卷。";
    heading.insertAdjacentElement("afterend", note);
  };

  if (paperView) {
    new MutationObserver(placeMockNote).observe(paperView, { childList: true, subtree: true });
  }
})();

