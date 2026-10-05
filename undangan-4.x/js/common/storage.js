export const storage = (table) => {
    const defaultValues = {
        show: [],
        hidden: [],
    };

    /**
     * @returns {Record<string, any>}
     */
    const parseData = () => {
        const raw = localStorage.getItem(table);
        if (!raw) {
            return {};
        }

        try {
            const data = JSON.parse(raw);
            return data && typeof data === 'object' ? data : {};
        } catch {
            return {};
        }
    };

    /**
     * @param {string|null} [key=null]
     * @returns {any}
     */
    const get = (key = null) => {
        const data = parseData();

        if (key === null || key === undefined) {
            return data;
        }

        const value = data[String(key)];
        if (value !== undefined) {
            return value;
        }

        const keyName = String(key);
        return Object.prototype.hasOwnProperty.call(defaultValues, keyName)
            ? defaultValues[keyName]
            : undefined;
    };

    /**
     * @param {string} key
     * @param {any} value
     * @returns {void}
     */
    const set = (key, value) => {
        const data = parseData();
        data[String(key)] = value;
        localStorage.setItem(table, JSON.stringify(data));
    };

    /**
     * @param {string} key
     * @returns {boolean}
     */
    const has = (key) => Object.prototype.hasOwnProperty.call(parseData(), String(key));

    /**
     * @param {string} key
     * @returns {void}
     */
    const unset = (key) => {
        if (!has(key)) {
            return;
        }

        const data = parseData();
        delete data[String(key)];
        localStorage.setItem(table, JSON.stringify(data));
    };

    /**
     * @returns {void}
     */
    const clear = () => localStorage.setItem(table, '{}');

    if (!localStorage.getItem(table)) {
        clear();
    }

    return {
        set,
        get,
        has,
        clear,
        unset,
    };
};