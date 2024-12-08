// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Show specific view
function showView(viewId) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active-view');
    });

    // Show the selected view
    const selectedView = document.getElementById(viewId);
    selectedView.classList.add('active-view');

    // Update active link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Highlight the current link
    const activeLink = document.querySelector(`.nav-link[href="#${viewId}"]`);
    activeLink.classList.add('active');

    // Close sidebar on mobile
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('active');
}


// Function to update readings (simulate data for demo)
function updateReadings() {
    // Simulate real-time data for Voltage, Current, and Temperature
    const voltage = (230 + Math.random() * 10).toFixed(2); // Simulate voltage between 230V-240V
    const current = (Math.random() * 3).toFixed(2); // Simulate current between 0A-3A
    const temperature = (Math.random() * 5 + 20).toFixed(1); // Simulate temperature between 20°C-25°C

    // Power = Voltage * Current (W)
    const power = (voltage * current).toFixed(2);
    // Simulate energy in kWh
    const energy = (Math.random() * 5).toFixed(2);

    // Update the relay status based on some condition
    const relayStatus = current > 1.5 ? 'On' : 'Off'; // Example condition for relay status
    document.getElementById('relay-status').innerText = relayStatus;
    if(relayStatus==='On'){
        document.getElementById('relay-status-bar').classList.add('on-relay-status');
        document.getElementById('relay-status-bar').classList.remove('off-relay-status');
    }
    else{
        document.getElementById('relay-status-bar').classList.add('off-relay-status');
        document.getElementById('relay-status-bar').classList.remove('on-relay-status');
    }
   

    // Update the power and energy cards
    document.getElementById('power').innerText = `${power} W`;
    document.getElementById('energy').innerText = `${energy} kWh`;

    // Update the gauges with real-time data
    updateGauge('voltage-gauge', voltage, 230, 250, 'V');
    updateGauge('current-gauge', current, 0, 3, 'A');
    updateGauge('temperature-gauge', temperature, 20, 30, '°C');
}

// Function to update a Plotly gauge
function updateGauge(elementId, value, min, max, unit) {
    let bar_color="";
    if (elementId==="voltage-gauge"){
        bar_color="green";
    }
    else if (elementId==="current-gauge"){
        bar_color="red";
    }
    else{
        bar_color="yellow";
    }
    const gaugeData = [
        {
            type: 'indicator',
            mode: 'gauge+number',
            value: value,
            title: { text: unit, font: { size: 24 } },
            gauge: {
                axis: { range: [min, max], tickwidth: 2, tickcolor: 'blue' },
                bar: { color: bar_color },
                bgcolor: 'white',
                borderwidth: 2,
                bordercolor: 'gray'
            }
        }
    ];

    const layout = {
        width: 250,
        height: 250,
        margin: { t: 0, r: 0, b: 0, l: 0 }
    };

    Plotly.newPlot(elementId, gaugeData, layout);
}

// Initial data update
updateReadings();

// Update every 5 seconds
setInterval(updateReadings, 3000);



// Function to generate line graphs
function generateLineGraphs() {
    // Data for the last 5 hours
    const hours = ['1 Hour Ago', '2 Hours Ago', '3 Hours Ago', '4 Hours Ago', '5 Hours Ago'];

    // Voltage data
    const voltageData = {
        x: hours,
        y: [220, 221, 219, 222, 220],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Voltage (V)',
        line: { color: '#FF5733' }
    };
    var voltageLayout = {
        title: 'Voltage (Last 5 Hours)',
        yaxis: {title: 'Voltage (V)'}
    };

    // Current data
    const currentData = {
        x: hours,
        y: [5, 5.2, 5.1, 5.3, 5.2],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Current (A)',
        line: { color: '#33FF57' },
    };
    var currentLayout = {
        title: 'Current (Last 5 Hours)',
        yaxis: {title: 'Current (A)'}
    };
    // Temperature data
    const temperatureData = {
        x: hours,
        y: [25, 26, 25.5, 27, 26.5],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Temperature (°C)',
        line: { color: '#3357FF' }
    };
    var temperatureLayout = {
        title: 'Temperature (Last 5 Hours)',
        yaxis: {title: 'Temperature (°C)'}
    };

    // Power data
    const powerData = {
        x: hours,
        y: [1100, 1120, 1110, 1130, 1125],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Power (W)',
        line: { color: '#FFC300' }
    };
    var powerLayout = {
        title: 'Power (Last 5 Hours)',
        yaxis: {title: 'Power (W)'}
    };

    // Render the graphs
    Plotly.newPlot('voltage-graph', [voltageData],voltageLayout);
    Plotly.newPlot('current-graph', [currentData], currentLayout);
    Plotly.newPlot('temperature-graph', [temperatureData], temperatureLayout);
    Plotly.newPlot('power-graph', [powerData], powerLayout);
}

// Function to generate bar graphs for energy usage
function generateBarGraphs() {
    // Data for the last 7 days
    const days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    const energy7Days = [20, 25, 22, 18, 24, 26, 30];

    const energy7DaysData = {
        x: days,
        y: energy7Days,
        type: 'bar',
        name: 'Energy Usage (kWh)',
        marker: { color: '#00B4D8' }
    };
    var energy7DaysLayout = {
        title: 'Energy (Last 7 Days)',
        yaxis: {title: 'Energy (KWh)'}
    };
    // Data for the last 7 hours
    const hours = ['1 Hour', '2 Hours', '3 Hours', '4 Hours'];
    const energy7Hours = [3, 2.8, 3.1, 2.9];

    const energy7HoursData = {
        x: hours,
        y: energy7Hours,
        type: 'bar',
        name: 'Energy Usage (kWh)',
        marker: { color: '#FF5733' }
    };
    var energy7HoursLayout = {
        title: 'Energy (Last 4 Hours)',
        yaxis: {title: 'Energy (KWh)'}
    };
    // Render the bar graphs
    Plotly.newPlot('energy-7days-graph', [energy7DaysData], energy7DaysLayout);
    Plotly.newPlot('energy-7hours-graph', [energy7HoursData], energy7HoursLayout);
}

// Function to filter total energy usage
function filterEnergy(filter) {
    let totalEnergyUsed = 0;

    switch (filter) {
        case '1day':
            totalEnergyUsed = 25; // Example value for 1 day
            break;
        case '3days':
            totalEnergyUsed = 75; // Example value for 3 days
            break;
        case '7days':
            totalEnergyUsed = 175; // Example value for 7 days
            break;
        case '1month':
            totalEnergyUsed = 750; // Example value for 1 month
            break;
        default:
            totalEnergyUsed = 0;
    }

    // Update the total energy value in the UI
    document.getElementById('total-energy-value').textContent = `${totalEnergyUsed} kWh`;
}

// Function to export data as CSV
function exportData() {
    const csvData = `
        Time, Voltage (V), Current (A), Temperature (°C), Power (W), Energy (kWh)
        1 Hour Ago, 220, 5, 25, 1100, 3
        2 Hours Ago, 221, 5.2, 26, 1120, 2.8
        3 Hours Ago, 219, 5.1, 25.5, 1110, 3.1
        4 Hours Ago, 222, 5.3, 27, 1130, 2.9
        5 Hours Ago, 220, 5.2, 26.5, 1125, 3.2
    `;

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'historical_data.csv');
    a.click();
}

// Initialize the graphs when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    generateLineGraphs();
    generateBarGraphs();
});


