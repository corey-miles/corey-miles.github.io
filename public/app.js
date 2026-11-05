async function readFile() {
  const fileInput = document.getElementById("fileInput");
  const fileContentDiv = document.getElementById("fileContent");

  // Ensure a file is selected
  if (fileInput.files.length === 0) {
    alert("Please select a file.");
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file); // 'file' must match the backend field name

  try {
    // Send the file payload to the Node.js backend server
    const response = await fetch("/readFile", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();

    // Render the file metadata and contents returned from the server
    fileContentDiv.innerHTML = `
      <h3>File Metadata</h3>
      <p><strong>Filename:</strong> ${data.filename}</p>
      <p><strong>Size:</strong> ${data.size} bytes</p>
      <p><strong>Content:</strong></p>
      <pre>${data.content}</pre>
    `;
  } catch (error) {
    console.error(`Error uploading file: `, error);
    fileContentDiv.innerHTML = `<p>Error uploading file: ${error.message}</p>`;
  }
}
