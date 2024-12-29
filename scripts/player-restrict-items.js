class PlayerRestrictItems {
  static patchGame() {
    // Disable right-click functionality for players
    document.addEventListener(
      "contextmenu",
      (event) => {
        if (!game.user.isGM) {
          event.stopPropagation(); // Stop the event from propagating further
          event.preventDefault();  // Prevent the default browser context menu
          console.log(`Right-click disabled for player: ${game.user.name}`);
        }
      },
      { capture: true } // Ensure this listener runs in the capture phase
    );
  }

  static hideEditButtons() {
    if (!game.user.isGM) {
      console.log("Hiding edit buttons for players...");
      // Inject custom styles to hide edit buttons
      const style = document.createElement("style");
      style.innerHTML = `
        .fa-edit, 
        button[title="Edit Item"] {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
      console.log("Edit buttons successfully hidden.");
    }
  }
}

// Apply right-click patch before Foundry initializes
PlayerRestrictItems.patchGame();

// Hide edit buttons for players when Foundry is ready
Hooks.on("ready", () => {
  if (!game.user.isGM) {
    console.log(`Player Restrict Items activated for ${game.user.name}`);
    PlayerRestrictItems.hideEditButtons();
  }
});

// Ensure edit buttons remain hidden on certain UI re-renders
Hooks.on("renderPlayerList", () => {
  if (!game.user.isGM) {
    PlayerRestrictItems.hideEditButtons();
  }
});
