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

