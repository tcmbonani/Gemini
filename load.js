$(document).ready(function() {
    // Event listener for all Start buttons
    $('.startButton').on('click', function() {
        var $row = $(this).closest('tr');
        var $loadingBar = $row.find('.progress-bar');
        var $resultsColumn = $row.find('.resultsColumn');
        var $downloadButton = $row.find('.downloadButton'); // Get the download button
        
        // Check if Hostname and IP are empty
        var hostname = $('#hostnameInput').val();
        var ipAddress = $('#ipAddressInput').val();
        if (hostname.trim() === '' || ipAddress.trim() === '') {
            alert('Hostname and IP Address must be filled before starting.');
            return; // Exit the function if Hostname or IP is empty
        }
        
        // Simulate loading progress
        var width = 0;
        var interval = setInterval(function() {
            width += 10; // Increase width by 10% every second (adjust as needed)
            $loadingBar.css('width', width + '%').attr('aria-valuenow', width);
            if (width >= 100) {
                clearInterval(interval);
                // Update results after loading is complete
                updateResults($resultsColumn);
                // Enable the download button when loading is complete
                $downloadButton.prop('disabled', false);
            }
        }, 1000); // Update every second (adjust as needed)
    });

    // Function to update results in an ascending manner
    function updateResults($resultsColumn) {
        // Array of possible results
        var possibleResults = [
            'Listed',
            'Vulnerabilities found',
            'No firewall',
            'Cyber Ark Success',
            'UAM rules correct',
            'Valuation failed'
            // Add more possible results as needed
        ];
        
        // Get the result based on the scan count
        var result = possibleResults[$resultsColumn.closest('tbody').find('tr').index($resultsColumn.closest('tr'))];
        
        // Update the results column with the selected result
        $resultsColumn.text(result);
        // Show the results column
        $resultsColumn.show();
    }
});

function searchCMDBData() {
    const hostname = document.getElementById('hostnameInput').value.trim();
    const ipAddress = document.getElementById('ipAddressInput').value.trim();

    if (!hostname && !ipAddress) {
        alert('Please provide either a hostname or an IP address for search.');
        return;
    }

    // Get the progress bar element
    const $loadingBar = $('.progress-bar');

    // Check if loading is at least 60% complete (i.e., progress bar width is >= 60%)
    if ($loadingBar.width() >= 60) {
        // Fetch the Excel file (assumed to be stored locally)
        fetch('./img/CMDB test data.xlsx')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch Excel file.');
                }
                return response.arrayBuffer();
            })
            .then(buffer => {
                const data = new Uint8Array(buffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                // Filter data based on provided hostname and/or IP address
                const searchResults = jsonData.filter(row => {
                    if (hostname && row['Hostname'] === hostname) {
                        return true;
                    }
                    if (ipAddress && row['IP Address'] === ipAddress) {
                        return true;
                    }
                    return false;
                });

                // Construct download link for search results
                const resultBlob = new Blob([JSON.stringify(searchResults)], { type: 'application/json' });
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(resultBlob);
                downloadLink.download = 'search_results.json';
                downloadLink.click();
            })
            .catch(error => {
                console.error('Error reading Excel file:', error);
                alert('Failed to read Excel file. Please try again later.');
            });
    } else {
        alert('Please wait until the loading progress reaches 60% before downloading.');
    }
}

// Function to download file after checking progress bar
function downloadFile(filePath) {
    // Get the progress bar element for this row
    var $loadingBar = $(event.target).closest('tr').find('.progress-bar');

    // Check if loading progress is over 60% complete
    if (getLoadingPercentage($loadingBar) > 60) {
        // Proceed with the download
        var anchor = document.createElement('a');
        anchor.style.display = 'none';
        anchor.href = filePath;
        anchor.download = getFileNameFromPath(filePath);
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    } else {
        // Display an error message if the progress is below 60%
        alert('Please wait until the loading progress reaches 60% before downloading.');
    }
}

// Function to calculate loading percentage
function getLoadingPercentage($loadingBar) {
    var currentWidth = $loadingBar.width();
    var totalWidth = $loadingBar.parent().width();
    return (currentWidth / totalWidth) * 100;
}

// Function to get the filename from the file path
function getFileNameFromPath(filePath) {
    return filePath.split('/').pop(); // Extract the filename after the last '/'
}
