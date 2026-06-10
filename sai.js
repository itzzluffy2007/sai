document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-Form');
    const statusDiv = document.getElementById('message');
    const btn = document.getElementById('btn');
    const builderEmail = 'princenarayan857@gmail.com';

    const showStatus = function(message, color) {
        statusDiv.textContent = message;
        statusDiv.style.color = color;
    };

    const resetButton = function() {
        btn.innerText = 'Submit Request';
        btn.disabled = false;
    };

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const service = document.getElementById('service').value;
        const description = document.getElementById('description').value.trim();

        if (!name || !email || !address || !service || !description) {
            showStatus('Please fill in all fields before submitting.', 'red');
            return;
        }

        btn.innerText = 'Opening email...';
        btn.disabled = true;
        showStatus('Preparing your request...', 'black');

        const subject = encodeURIComponent(`Cleaning Service Request from ${name}: ${service}`);
        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Address: ${address}\n` +
            `Service: ${service}\n\n` +
            `Request Details:\n${description}`
        );

        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(builderEmail)}&su=${subject}&body=${body}`;
        const newWindow = window.open(gmailLink, '_blank');

        if (newWindow === null) {
            showStatus('Error: Could not open Gmail. Please allow pop-ups or open Gmail manually and try again.', 'red');
            resetButton();
            return;
        }

        showStatus('Gmail compose opened. Send the message from your Gmail account to complete the request.', 'green');
        contactForm.reset();
        resetButton();
    });
});


// // ── Replace these three values ──────────────────────────────
// const PUBLIC_KEY  = "0nGgQCxFSCbubH7fm";   // Account → General
// const SERVICE_ID  = "service_voygvww";   // Email Services tab
// const TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // Email Templates tab
// // ────────────────────────────────────────────────────────────

// emailjs.init(PUBLIC_KEY);

// const form      = document.getElementById("contact-form");
// const sendBtn   = document.getElementById("btn");
// const statusMsg = document.getElementById("message");

// function showStatus(type, text) {
//   statusMsg.className = "status " + type;
//   statusMsg.textContent = text;
// }

// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const name    = document.getElementById("name").value.trim();
//   const email   = document.getElementById("email").value.trim();
//   const subject = document.getElementById("subject").value.trim();
//   const message = document.getElementById("message").value.trim();

//   const fullMessage =
//     `Name:    ${name}\n` +
//     `Email:   ${email}\n` +
//     `Subject: ${subject}\n\n` +
//     `Message:\n${message}`;

//   sendBtn.disabled    = true;
//   sendBtn.textContent = "Sending…";
//   statusMsg.className = "status";

//   emailjs.send(service_voygvww, TEMPLATE_ID, {
//     from_name:    name,
//     from_email:   email,
//     subject:      subject,
//     message:      message,
//     full_message: fullMessage,
//     reply_to:     email
//   })
//   .then(() => {
//     showStatus("success", "Message sent! We'll get back to you soon.");
//     form.reset();
//   })
//   .catch((err) => {
//     console.error("EmailJS error:", err);
//     showStatus("error", "Something went wrong. Please try again.");
//   })
//   .finally(() => {
//     sendBtn.disabled    = false;
//     sendBtn.textContent = "Send message";
//   });
// });