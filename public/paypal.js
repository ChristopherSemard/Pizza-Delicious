var mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        try {
            let div = document.querySelector(".paypal").children[1];
            let divChild =
                document.querySelector(".paypal").children[1].children[1];
            divChild.style.display = "none";
        } catch (error) {
            return;
        }
    });
});

// Starts listening for changes in the root HTML element of the page.
mutationObserver.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true,
});
