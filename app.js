// All apps and their data
// const APPS = loadApps().then(data => );
let APPS = null;

loadApps().then((data) => {
    APPS = data;
});

async function loadApps() {
    try {
        const response = await fetch("apps.json");

        if (!response.ok) {
            console.error("Error fetching JSON:", response.statusText);
            return null;
        }

        const data = await response.json();
        return Object.keys(data).length ? data : null;
    } catch (error) {
        console.error("Error loading JSON:", error);
        return null;
    }
}

// Currently selected app Element
let SelectedAppElement = null;

// Main Program
document.addEventListener("DOMContentLoaded", () => {
    // Apps container
    const apps_container = document.getElementById("apps");
    apps_container.innerHTML = "";

    update_datetime();
    update_apps_title();

    if (!APPS) {
        return;
    }

    // Add all APPS in apps_container
    APPS.forEach((app) => {
        apps_container.innerHTML += create_app_row(app, false);
    });

    // Click Event
    apps_container.addEventListener("click", select_app);

    // Double-Click Event
    apps_container.addEventListener("dblclick", open_app);
});

// Get App by ID
// id : ID must be an integer
function getAppByID(id) {
    let match = null;

    for (let i = 0; i < APPS.length; i++) {
        if (id === APPS[i].id) {
            match = APPS[i];
            break;
        }
    }
    return match;
}

// Creates and returns an app row
// app: the app object
function create_app_row(app, mark_active) {
    let active_class = mark_active ? "app-row-active" : "";

    return `<a href="#" class="app-row ${active_class}" id="${app.id}">
    <span class="app-row-name">${app.name}</span>
    <span class="app-row-datetime">${app.datetime}</span>
    </a>`;
}

// Select an app-row & Update the description
function select_app(event) {
    if (!event.target.className.startsWith("app-row")) {
        return;
    }

    // Target Element
    let target = event.target.tagName === "A" ? event.target : event.target.parentElement;

    let target_app = getAppByID(parseInt(target.id));
    update_description(target_app.description);

    // APP already selected?
    if (SelectedAppElement != null) {
        // Deselect
        SelectedAppElement.classList.remove("app-row-active");
    }

    // Select this new one
    target.classList.add("app-row-active");
    SelectedAppElement = target;
}

// Updates Description
function update_description(desc) {
    const desc_element = document.getElementById("description");

    desc_element.innerHTML = desc;
}

// Updates apps title
function update_apps_title() {
    const apps_title = document.getElementById("appsTitle");
    let total_apps = APPS ? ` (${APPS.length})` : "";
    apps_title.innerHTML = `${apps_title.innerHTML}${total_apps}`;
}

// Updates datetime in the header
function update_datetime() {
    const datetime_container = document.getElementById("dateTime");

    const mediumTime = new Intl.DateTimeFormat("en-US", {
        timeStyle: "medium",
        dateStyle: "medium",
    });

    // Set the Time
    setInterval(function () {
        let datetime = new Date();
        datetime_container.innerHTML = mediumTime.format(datetime.getTime());
    }, 1000);
}

// Opens an app in a new tab/window
function open_app(event) {
    if (!event.target.className.startsWith("app-row")) {
        return;
    }

    // Target Element
    let target = event.target.tagName === "A" ? event.target : event.target.parentElement;
    window.open(getAppByID(parseInt(target.id)).url, "_blank");
}
