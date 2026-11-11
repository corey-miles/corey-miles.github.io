async function readFile(): Promise<void> {
  const fileInput = document.getElementById(
    "fileInput",
  ) as HTMLInputElement | null;
  const fileContentDiv = document.getElementById("fileContent");

  if (!fileInput || !fileContentDiv) {
    console.error("File input or content div not found.");
    return;
  }

  const file = fileInput.files?.[0];
  if (!file) {
    alert("Please select a file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/readFile", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = (await response.json()) as {
      filename: string;
      size: number;
      content: string;
    };

    fileContentDiv.innerHTML = `
      <h3>File Metadata</h3>
      <p><strong>Filename:</strong> ${data.filename}</p>
      <p><strong>Size:</strong> ${data.size} bytes</p>
      <p><strong>Content:</strong></p>
      <pre>${data.content}</pre>
    `;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error uploading file:", error);
    fileContentDiv.innerHTML = `<p>Error uploading file: ${message}</p>`;
  }
}

(window as unknown as Window & { readFile: typeof readFile }).readFile =
  readFile;
