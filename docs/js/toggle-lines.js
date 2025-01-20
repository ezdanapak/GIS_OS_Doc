// document.addEventListener("DOMContentLoaded", function () {
//     const codeBlocks = document.querySelectorAll("pre code");

//     codeBlocks.forEach((block) => {
//         const lines = block.innerHTML.split("\n");
//         block.innerHTML = lines
//             .map((line, index) => `<span class="code-line" data-line="${index + 1}">${line}</span>`)
//             .join("\n");

//         // Add a copy button
//         const copyButton = document.createElement("button");
//         copyButton.textContent = "Copy Selected Lines";
//         copyButton.classList.add("copy-button");
//         block.parentElement.insertBefore(copyButton, block);

//         copyButton.addEventListener("click", () => {
//             const selectedLines = Array.from(block.querySelectorAll(".code-line.selected"))
//                 .map((line) => line.textContent)
//                 .join("\n");

//             navigator.clipboard.writeText(selectedLines).then(() => {
//                 alert("Selected lines copied to clipboard!");
//             });
//         });

//         block.addEventListener("click", (event) => {
//             if (event.target.classList.contains("code-line")) {
//                 event.target.classList.toggle("selected");
//             }
//         });
//     });
// });
