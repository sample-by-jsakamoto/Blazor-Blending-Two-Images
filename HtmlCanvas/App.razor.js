export const createElement = (tagName, props) => {
    const element = document.createElement(tagName);
    Object.assign(element, props);
    return element;
}

export const loadImage = (uint8array) => {
    return new Promise(async (resolve) => {
        const blob = new Blob([uint8array], { type: 'image/png' });
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => { URL.revokeObjectURL(img.src); resolve(img); };
    });
}

export const getImageBytes = async (canvas) => {
    const blob = await new Promise((resolve) => canvas.toBlob(resolve));
    const imageBytes = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(new Uint8Array(reader.result));
        reader.readAsArrayBuffer(blob);
    });
    return imageBytes;
}