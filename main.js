const nav = document.querySelector("#seitennav");
const toggle = document.querySelector(".nav-toggle");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

const dialog = document.querySelector("#bestellen");
const form = document.querySelector("#vormerk-form");
const success = document.querySelector("#form-success");
const title = document.querySelector("#dialog-title");
const lead = document.querySelector("#dialog-lead");

document.querySelectorAll("[data-bundle]").forEach((button) => {
  button.addEventListener("click", () => {
    const bundle = button.dataset.bundle;
    const price = button.dataset.price;
    form.dataset.bundle = bundle;
    form.dataset.price = price;
    title.textContent = `${bundle} vormerken`;
    lead.textContent = `CHF ${price} · digitaler Ernährungsplan`;
    success.hidden = true;
    form.querySelector("button[type='submit']").hidden = false;
    dialog.showModal();
  });
});

dialog.querySelector("[data-close]").addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = {
    bundle: form.dataset.bundle,
    price: form.dataset.price,
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    savedAt: new Date().toISOString(),
  };
  const existing = JSON.parse(localStorage.getItem("stressfreiessen-vormerkungen") || "[]");
  existing.push(data);
  localStorage.setItem("stressfreiessen-vormerkungen", JSON.stringify(existing));
  success.hidden = false;
  form.reset();
});
