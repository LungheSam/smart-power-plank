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
