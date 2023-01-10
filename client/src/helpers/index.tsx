export const convertDate = (timestamp: string) => {
    let date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getSeconds()}:${date.getMinutes()}:${date.getHours()}`;
};

export const debounce = (callback: Function, delay: number = 1000) => {
    let timeout: NodeJS.Timeout;

    return (...args: any) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(...args);
        }, delay);
    };
};
