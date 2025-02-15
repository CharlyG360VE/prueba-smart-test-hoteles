export const generateUuid = (): string => 'xxxx-xxxx-xxx-xxxx'.replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));
