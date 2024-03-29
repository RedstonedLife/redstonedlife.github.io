(function(JSON) {
    const parse = JSON.parse;
    const djDebug = document.getElementById("djDebug");

    JSON.parse = function(text) {
        const data = parse(text);

        if (data === null || !data.hasOwnProperty("debugToolbar")) return data;

        Object.entries(data.debugToolbar.panels).map(([id, panel]) => {
            if (panel.title) {
                const content = djDebug.querySelector(`#${id}`);

                content
                    .querySelector(".djDebugPanelTitle")
                    .querySelector("h3").textContent = panel.title;

                content.querySelector(".djdt-scroll").innerHTML = "";

                if (content.querySelector(".djdt-loader") === null) {
                    const loader = document.createElement("div");
                    loader.className = "djdt-loader";
                    content.querySelector(".djDebugPanelContent").prepend(loader);
                }
            }
            if (panel.subtitle) {
                document
                    .getElementById(`djdt-${id}`)
                    .querySelector("small").textContent = panel.subtitle;
            }
        });
        djDebug.setAttribute("data-store-id", data.debugToolbar.storeId);

        delete data.debugToolbar;
        return data;
    };
})(JSON);
