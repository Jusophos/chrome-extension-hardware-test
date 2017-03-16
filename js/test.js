$(document).ready(() => {

    let hardware = new Hardware;

    // cpu
    hardware.loadCPUInfo().then((info) => {

        showResultsInDataGrid(info, 'cpu');
        showResultsInDataGrid(info.features, 'cpu', 'feature #');

        for (let processorNo in info.processors) {

            showResultsInDataGrid(info.processors[processorNo].usage, 'cpu', 'processor #' + processorNo+ ': ');
        }
    });

    // gpu
    hardware.loadGPUInfo().then((info) => {

        showResultsInDataGrid(info, 'gpu');
    });

    // memory
    hardware.loadMemoryInfo().then((info) => {

        showResultsInDataGrid(info, 'memory');
    });

    // storage
    hardware.loadStorageInfo().then((info) => {

        for (let storageNo in info) {

            showResultsInDataGrid(info[storageNo], 'storage', 'storage #' + storageNo + ': ');
        }

    });
});


// helpers functions
function showResultsInDataGrid(info, id, keyPrefix = '') {

    let results = $('#datagrid_'+id+'_content').html();

    for (let key in info) {

        let val = info[key];

        if (typeof(val) != 'string' && typeof(val) != 'number') {

            continue;
        }

        results+= '<tr><td class="label">'+ keyPrefix + key+'</td><td class="value">'+val.toString()+'</td></tr>';
    }

    $('#datagrid_'+id+'_content').html(results);
}
