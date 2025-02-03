// Terminal Standard Input/Output
let TERMINAL = null;

// Main Entry Point
document.addEventListener("DOMContentLoaded", () => {
    TERMINAL = document.getElementById("stdout");

    // Focus prompt when terminal click
    TERMINAL.addEventListener("click", (event) => {
        document.querySelector(".terminal-line-input").focus();
    });

    // Get input on each Enter keypress
    TERMINAL.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();

            // Get the Prompt and execute command
            let active_prompt = event.target;
            let command = active_prompt.innerText.trim();
            let output_text = process_command(command);

            // Make prompt un-editable
            active_prompt.classList.remove("terminal-line-input");
            active_prompt.contentEditable = "false";

            // Print The Output (if any)
            print_line(output_text);

            // Spawn a Prompt for user to type commands
            spawn_prompt();
        }
    });
});

// Close the current tab
function exitTerminal() {
    window.close();
}

// Print text onto the TERMINAL
function print_line(text = "") {
    if (text) {
        TERMINAL.innerHTML += `<span class="terminal-line">${text}</span>`;
    }
}

// Spawn a prompt in the TERMINAL
function spawn_prompt() {
    // Create new prompt
    let new_prompt = document.createElement("span");
    new_prompt.classList.add("terminal-line");

    // Create Symbol
    let symbol = document.createElement("span");
    symbol.textContent = "~$ ";

    // Create new input (PROMPT)
    let new_input = document.createElement("span");
    new_input.classList.add("terminal-line-input");
    new_input.spellcheck = "false"; // FIX: NOT WORKING (for some reason)
    new_input.contentEditable = "true";

    new_prompt.appendChild(symbol);
    new_prompt.appendChild(new_input);
    TERMINAL.appendChild(new_prompt);

    new_input.focus();
}

// Processes and executes the prompt
function process_command(command = "") {
    if (!command) return "";

    if (command.trim() === "hello") {
        return "Hello, World!";
    }

    return `'${command}' is not recognized as a command. (type 'help' to see available commands)<br/><br/>`;
}
