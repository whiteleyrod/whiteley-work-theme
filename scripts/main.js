async function loadResearchAreas() {
  const grid = document.getElementById("research-grid");
  if (!grid) {
    return;
  }

  try {
    const response = await fetch("research/areas.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load areas.json (${response.status})`);
    }

    const areas = await response.json();
    if (!Array.isArray(areas) || areas.length === 0) {
      grid.innerHTML = "<p class=\"empty-state\">No research areas published yet.</p>";
      return;
    }

    grid.innerHTML = "";

    for (const area of areas) {
      const card = area.path ? document.createElement("a") : document.createElement("article");
      card.className = `card${area.path ? "" : " placeholder"}`;

      if (area.path) {
        card.href = area.path;
      }

      const head = document.createElement("div");
      head.className = "card-head";

      const title = document.createElement("h3");
      title.textContent = area.title || "Untitled area";

      head.appendChild(title);

      if (area.status) {
        const badge = document.createElement("span");
        badge.className = "status";
        badge.textContent = area.status;
        head.appendChild(badge);
      }

      const summary = document.createElement("p");
      summary.textContent = area.summary || "No summary provided.";

      card.appendChild(head);
      card.appendChild(summary);
      grid.appendChild(card);
    }
  } catch (error) {
    grid.innerHTML = "<p class=\"empty-state\">Unable to load research areas.</p>";
    console.error(error);
  }
}

loadResearchAreas();
