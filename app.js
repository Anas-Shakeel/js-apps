// All apps and their data
const APPS = [
    {
        id: 1,
        active: false,
        name: "Binary Effect",
        url: "apps/binary-effect/index.html",
        datetime: "01-MAY-2024 01:46 am",
        description: "A simple matrix-like effect where bits change randomly to 0 or 1.",
    },
    {
        id: 2,
        active: false,
        name: "BMI Calculator",
        url: "apps/binary-effect/index.html",
        datetime: "17-APR-2024 02:21 pm",
        description: "A simple app that calculates BMI (Body Mass Index) by taking height and weight.",
    },
];

// Currently selected app Element
let SelectedAppElement = null;

// Main Program
document.addEventListener("DOMContentLoaded", () => {
    // Apps container
    const apps_container = document.getElementById("apps");
    apps_container.innerHTML = "";

    update_datetime();
    update_apps_title();

    // Add all APPS in apps_container
    APPS.forEach((app) => {
        apps_container.innerHTML += create_app_row(app);
    });

    // Update description
    update_description(APPS[0].description);

    // Click Event
    apps_container.addEventListener("click", select_app);

    // Double-Click Event
    apps_container.addEventListener("dblclick", (event) => {
        let target = event.target;
        if (target.className.startsWith("app-row")) {
            let target_id = target.tagName === "A" ? target.id : target.parentElement.id;
            let target_app = getAppByID(parseInt(target_id));
            window.open(target_app.url, "_blank");
        }
    });
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
    apps_title.innerHTML = `${apps_title.innerHTML} (${APPS.length})`;
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
