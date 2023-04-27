const $ = document.querySelector.bind(document);
const $a = document.querySelectorAll.bind(document);


class Util {
    
    static taxaAtualizacao = 200;


    static removeAllEventListeners(element, eventType) {
        if (!element.listeners || !element.listeners[eventType]) {
            return;
        }
        const listeners = element.listeners[eventType];
        if (listeners) {
            listeners.forEach((listener) => {
                element.removeEventListener(eventType, listener);
            });
            element.listeners[eventType] = [];
        }
    }
}