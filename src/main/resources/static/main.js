// for navigation
document.addEventListener("click", async (e) => {
  const el = e.target.closest("[data-page]");
  if (!el) return;

  e.preventDefault();
  const pageUrl = el.getAttribute("data-page");
  const content = document.querySelector("main.content");
  if (!content) return;

  try {
    const html = await fetch(pageUrl).then((page) => {
      if (!page.ok) throw new Error(`Failed to load ${pageUrl}`);
      return page.text();
    });

    content.innerHTML = html;
  } catch (err) {
    console.error("Error loading page:", err);
    content.innerHTML = `<p class= "danger">Failed to load ${pageUrl}</p>`;
  }
});
//====================================================================================//
// for dropdowns
document.addEventListener("click", (e) => {
  const trigger = e.target.closest(".action-trigger");
  if (trigger) {
    e.stopPropagation();
    const menu = trigger.nextElementSibling;
    const isOpen = menu.classList.contains("show");

    document
      .querySelectorAll(".dropdown-menu")
      .forEach((m) => m.classList.remove("show"));

    if (!isOpen) {
      menu.classList.add("show");
    }
  } else {
    document
      .querySelectorAll(".dropdown-menu")
      .forEach((m) => m.classList.remove("show"));
  }
});
//====================================================================================//
// for selection
document.addEventListener("click", async (e) => {
  const select = e.target.closest("[data-select]");
  const item = e.target.closest(".dropdown-item");
  if (item && select) {
    e.preventDefault();

    const span = select.querySelector("span");
    const hiddenInput = select.querySelector("input[type='hidden']");
    const menu = item.closest(".dropdown-menu");

    span.textContent = item.textContent.trim();
    hiddenInput.value = item.dataset.value;

    menu.classList.remove("show");
    return;
  }
});

//====================================================================================//
// for form submissions
document.addEventListener("submit", async (e) => {
  const form = e.target.closest("[data-form]");
  if (!form) return;

  e.preventDefault();

  const projectInput = form.querySelector("input[name='project.id']");
  if (projectInput) {
    if (!projectInput.value.trim()) {
      alert("Please select a project.");
      return;
    }
  }

  const action = form.getAttribute("action");
  const redirect = form.getAttribute("data-redirect") || "/";

  try {
    const formData = new FormData(form);

    for (const [key, value] of formData.entries()) {
      console.log(key + ":", value);
    }

    const response = await fetch(action, {
      method: form.getAttribute("method"),
      body: formData,
    });

    if (!response.ok)
      throw new Error(`Failed to submit form: ${response.status}`);

    const html = await fetch(redirect).then((r) => r.text());
    document.querySelector("main.content").innerHTML = html;
  } catch (err) {
    console.error(err);
    alert("Error saving changes");
  }
});
//====================================================================================//
// for delete
document.addEventListener("click", async (e) => {
  const del = e.target.closest("[data-delete]");
  if (!del) return;

  e.preventDefault();
  const type = del.getAttribute("data-delete");
  const url = del.getAttribute("data-delete-action");

  if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to delete");

    const listUrl = `/${type}s`;
    const html = await fetch(listUrl).then((r) => r.text());
    document.querySelector("main.content").innerHTML = html;
  } catch (err) {
    console.error(err);
    alert(`Error deleting ${type}.`);
  }
});
