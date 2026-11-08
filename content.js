(() => {
    function GetQuery() {
        const query = new URLSearchParams(location.search).get("q");
        return query ? encodeURIComponent(query) : null;
    }

    function GetMapsLink() {
        const query = GetQuery();
        if (!query) return null;
        return `https://maps.google.com/?q=${query}`;
    }

    window.addEventListener("click", (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;

        const map = target.closest("div.Lx2b0d");
        if (!map) return;

        const query = GetQuery();
        if (!query) return;

        e.preventDefault();
        e.stopImmediatePropagation();
        window.open(GetMapsLink(), "_self");
    }, true);

    const observer = new MutationObserver(() => {
        const list = document.querySelector("div.beZ0tf");
        if (!list) return;

        const query = GetQuery();
        if (!query) return;

        // prevent duplicate maps tabs
        if (list.querySelector("[data-maps]")) return;

        const listItem = list.children[2].cloneNode(true);
        const span = listItem.querySelector("span");
        const link = listItem.querySelector("a");
        if (!span || !link) return;

        span.textContent = "Maps";
        link.href = GetMapsLink();
        listItem.dataset.maps = "true";
        list.insertBefore(listItem, list.children[3]);

        observer.disconnect();
    });

    observer.observe(document, {
        childList: true,
        subtree: true
    });
})();