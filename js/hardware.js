class Hardware {

    constructor() {


    }

    loadCPUInfo() {

        return new Promise((resolve, reject) => {

            chrome.system.cpu.getInfo((info) => {

                resolve(info);
            });
        });
    }

    loadStorageInfo() {

        return new Promise((resolve, reject) => {

            chrome.system.storage.getInfo((info) => {

                resolve(info);
            });
        });
    }

    loadMemoryInfo() {

        return new Promise((resolve, reject) => {

             chrome.system.memory.getInfo((info) => {

                 resolve(info);
             });
        });
    }

    loadGPUInfo() {

        return new Promise((resolve, reject) => {

            let info = [];
            var getUnmaskedInfo = (gl) => {

                var unMaskedInfo = {
                    renderer: '',
                    vendor: ''
                };

                var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
                if (dbgRenderInfo != null) {
                    unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
                    unMaskedInfo.vendor   = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
                }

                return unMaskedInfo;
            }

            var performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};


            // for (var value in performance) {
            //
            //     info.push(value);
            // }

            var canvas = document.createElement('canvas');
            var gl = canvas.getContext("experimental-webgl");

            info['Rendering (Renderer)'] = gl.getParameter(gl.RENDERER);
            info['Rendering (Vendor)'] = gl.getParameter(gl.VENDOR);
            info['Vendor'] = (getUnmaskedInfo(gl).vendor);
            info['Model'] = (getUnmaskedInfo(gl).renderer);

            resolve(info);
        });
    }
}
