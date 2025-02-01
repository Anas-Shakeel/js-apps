// All apps and their data
const APPS = [
    {
        id: 1,
        name: "Binary Effect",
        url: "apps/binary-effect/index.html",
        datetime: "01-MAY-2024 01:46 am",
        description: "A simple matrix-like effect where bits change randomly to 0 or 1.",
    },
    {
        id: 2,
        name: "BMI Calculator",
        url: "apps/bmi-calculator/index.html",
        datetime: "17-APR-2024 02:21 pm",
        description: "A simple app that calculates BMI (Body Mass Index) by taking height and weight.",
    },
    {
        id: 3,
        name: "Bricks App",
        url: "apps/bricks/index.html",
        datetime: "11-APR-2024 09:25 pm",
        description: "A simple app made for fun, just a practice project.",
    },
    {
        id: 4,
        name: "Clock",
        url: "apps/clock/index.html",
        datetime: "17-APR-2024 04:26 pm",
        description: "A simple digital clock made using HTML,CSS,JS. It displays local time and date.",
    },
    {
        id: 5,
        name: "Color Changer",
        url: "apps/color-changer/index.html",
        datetime: "17-APR-2024 12:20 pm",
        description: "A simple color changer app that changes the background color upon a color click.",
    },

    {
        id: 6,
        name: "Color Generator",
        url: "apps/color-generator/index.html",
        datetime: "27-APR-2024 03:31 pm",
        description: "A simple app that lets users generate a bunch of colors.",
    },

    {
        id: 7,
        name: "Color Palettes",
        url: "apps/color-palettes/index.html",
        datetime: "29-APR-2024 01:25 am",
        description: "A simple app that generates random color palettes.",
    },

    {
        id: 8,
        name: "Garbage App",
        url: "apps/garbage-app/index.html",
        datetime: "03-APR-2024 11:22 pm",
        description: "A garbage app made to practice basic javascript.",
    },

    {
        id: 9,
        name: "Guess a Number",
        url: "apps/guess-number/index.html",
        datetime: "21-APR-2024 05:08 pm",
        description: "A simple game that lets you guess a number between 1 and 100 in 10 guesses.",
    },

    {
        id: 10,
        name: "hacker effect",
        url: "apps/hacker-effect/index.html",
        datetime: "27-APR-2024 10:34 pm",
        description: "A effect inspired by 'HYPERPLEXED' on youtube.",
    },

    {
        id: 11,
        name: "hover effect",
        url: "apps/hover-effect/index.html",
        datetime: "30-APR-2024 11:10 pm",
        description: "An effect inspired by '4kwallpapers.com' where text changes color on hover.",
    },

    {
        id: 12,
        name: "pyramid",
        url: "apps/pyramid/index.html",
        datetime: "08-APR-2024 02:37 pm",
        description: "A simple app that creates the `n` pyramids.",
    },
];

// Auto Sort the APPS
APPS.sort((a, b) => a.name.localeCompare(b.name));

// Currently selected app Element
let SelectedAppElement = null;

// Current Theme of app
// let ThemeMode = "dark"; // Default
let local_theme = localStorage.getItem("ThemeMode");
let ThemeMode = local_theme ? local_theme : "dark"; // Default

// Main Program
document.addEventListener("DOMContentLoaded", () => {
    // Load App Theme
    loadTheme();

    // Toggle Theme on Keypress [H]
    document.addEventListener("keypress", toggle_theme);

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

// Change a CSS variable
function changeCSSVariable(var_name, value) {
    document.documentElement.style.setProperty(var_name, value);
}

function toggle_theme(event) {
    if (event.key.toLowerCase() !== "h") {
        return;
    }

    if (ThemeMode == "dark") {
        // Set to Light Mode
        changeCSSVariable("--accent", "#000");
        changeCSSVariable("--primary", "#c4ca6c");
        ThemeMode = "light";
    } else {
        // Set to Dark Mode
        changeCSSVariable("--accent", "#e09a20");
        changeCSSVariable("--primary", "#141414");
        ThemeMode = "dark";
    }

    // Save theme info in local storage (browser)
    localStorage.setItem("ThemeMode", ThemeMode);
}

function loadTheme() {
    if (ThemeMode == "dark") {
        // Set to Dark Mode
        changeCSSVariable("--accent", "#e09a20");
        changeCSSVariable("--primary", "#141414");
    } else {
        // Set to Light Mode
        changeCSSVariable("--accent", "#000");
        changeCSSVariable("--primary", "#c4ca6c");
    }
}
