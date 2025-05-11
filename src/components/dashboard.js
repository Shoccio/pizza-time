import React from "react";

function Dashboard() {
  const innerIframeHTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f9f9f9;
          }
          iframe {
            width: 1000px;
            height: 730px;
            border: none;
          }
        </style>
      </head>
      <body>
        <iframe
          src="https://lookerstudio.google.com/embed/reporting/821f8eab-1a45-437b-9fdd-6e08973676b7/page/htYJF"
          title="Dashboard"
          allowfullscreen
        ></iframe>
      </body>
    </html>
  `;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <iframe
        title="Outer Iframe"
        width="1000"
        height="600"
        srcDoc={innerIframeHTML}
        style={{ border: "1px solid #ccc" }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      ></iframe>
    </div>
  );
}

export default Dashboard;
