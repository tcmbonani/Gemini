(function ($) {
    "use strict";

    // Function to start the spinner
    var startSpinner = function () {
        $('#spinner').addClass('show');
    };

    // Function to stop the spinner
    var stopSpinner = function () {
        $('#spinner').removeClass('show');
    };

    // Spinner starts initially
    startSpinner();

    // Function to search and populate based on Jira ticket
    var searchAndPopulate = function () {
        startSpinner(); // Start spinner when search begins

        const jiraTicket = document.getElementById('searchInput').value;

        // Data mapping of Jira ticket numbers to hostnames and IP addresses
        const jiraTicketData = {
            'SPDACS-101010': { hostname: 'CI-Frontend-To', ipAddress: '100.64.4.79' },
            'SPDACS-101011': { hostname: 'ip-100-64-2-113.af-south-1.compute.internalvodacom.co.zavodaco', ipAddress: '100.64.2.113' },
            'SPDACS-101012': { hostname: 'pccs609aa11wi', ipAddress: '10.0.193.25' },
            'SPDACS-101013': { hostname: 'a-amzpaas8', ipAddress: '100.64.51.222' }
        };

        // Check if the entered Jira ticket number exists in the data mapping
        if (jiraTicketData.hasOwnProperty(jiraTicket)) {
            // If found, populate the hostname and IP address input fields
            const data = jiraTicketData[jiraTicket];
            document.getElementById('hostnameInput').value = data.hostname;
            document.getElementById('ipAddressInput').value = data.ipAddress;
        } else {
            // If not found, display an error message or handle it accordingly
            alert('Jira ticket not found');
        }

        stopSpinner(); // Stop spinner when search is completed
    };

    // Add an event listener to the search button to trigger the search process
    document.getElementById('searchButton').addEventListener('click', searchAndPopulate);
})(jQuery);


