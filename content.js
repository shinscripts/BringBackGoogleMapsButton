(() => {
    const observer = new MutationObserver(() => {
        const list = document.querySelector("div.beZ0tf");
        if (!list || list.children.length < 4) return;

        const query = new URLSearchParams(location.search).get("q");
        if (!query) return;

        // prevent duplicate maps tabs
        if (list.querySelector("[data-maps-tab]")) return;

        const listItem = list.children[2].cloneNode(true);
        const span = listItem.querySelector("span");
        const link = listItem.querySelector("a");
        if (!span || !link) return;

        span.textContent = "Maps";
        link.href = `https://maps.google.com/?q=${encodeURIComponent(query)}`;

        listItem.dataset.mapsTab = "true";
        list.insertBefore(listItem, list.children[3]);
        observer.disconnect();
    });

    observer.observe(document, {
        childList: true,
        subtree: true
    });
})();