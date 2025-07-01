// ==UserScript==
// @name         Move Delivery Row Below Sync Status
// @match        https://admin.wholesome.co/orders/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function moveDeliveryRow() {
        const table = document.querySelector('aside.panelDetails table.table--key-value');
        if (!table) return;

        const tbody = table.querySelector('tbody');
        if (!tbody) return;

        const deliveryRow = tbody.querySelector('tr th#delivery')?.closest('tr');
        const syncStatusRow = tbody.querySelector('tr td#sync_status_value')?.closest('tr');

        if (deliveryRow && syncStatusRow && deliveryRow !== syncStatusRow.nextSibling) {
            tbody.insertBefore(deliveryRow, syncStatusRow.nextSibling);
        }
    }

    // Keep trying until content is fully loaded
    const interval = setInterval(() => {
        const delivery = document.querySelector('th#delivery');
        const sync = document.querySelector('td#sync_status_value');

        if (delivery && sync) {
            clearInterval(interval);
            moveDeliveryRow();

            // Also observe future changes just in case SPA behavior loads new content
            const observer = new MutationObserver(moveDeliveryRow);
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }, 500);
})();