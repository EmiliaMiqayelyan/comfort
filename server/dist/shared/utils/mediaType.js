"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectMediaType = detectMediaType;
function detectMediaType(mimetype, originalname) {
    if (mimetype.startsWith('image/'))
        return 'image';
    if (mimetype.startsWith('video/'))
        return 'video';
    if (mimetype.includes('gltf') || originalname.endsWith('.glb'))
        return 'glb';
    if (originalname.endsWith('.usdz'))
        return 'usdz';
    if (mimetype.includes('texture') || originalname.includes('texture'))
        return 'texture';
    return 'pdf';
}
//# sourceMappingURL=mediaType.js.map