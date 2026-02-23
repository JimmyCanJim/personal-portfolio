import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFunctions, httpsCallable } from "firebase/functions";

// Replace with your actual Firebase config from the console
const firebaseConfig = {
  apiKey: "AIzaSyAJLQGGdGQDT1XfVdBiPYSCNVsZ-k9HnNM",
  authDomain: "personal-portfolio-bf19d.firebaseapp.com",
  projectId: "personal-portfolio-bf19d",
  storageBucket: "personal-portfolio-bf19d.firebasestorage.app",
  messagingSenderId: "534267207639",
  appId: "1:534267207639:web:ab9d5ef651dfaa09777592",
  measurementId: "G-R0G69NKYCE"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

// Select the form from the DOM
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  submitBtn.innerText = "Sending...";
  submitBtn.disabled = true;

  const sendContactEmail = httpsCallable(functions, 'sendContactEmail');

  const formData = {
    name: document.getElementById('user_name').value,
    email: document.getElementById('user_email').value,
    message: document.getElementById('message').value,
    time: new Date().toLocaleString()
  };

  try {
    const result = await sendContactEmail(formData);
    if (result.data.status === "success") {
  // Replace the form with a success message
    contactForm.innerHTML = `
      <div class="success-message" style="padding: 20px; text-align: center;">
        <h3 style="color: #FF8473;">Success!</h3>
        <p>Thanks for reaching out, Jared will get back to you soon.</p>
      </div>
    `;
    } 
  } catch (error) {
    console.error("Error calling function:", error);
    alert("Failed to send. Check console for details.");
  } finally {
    submitBtn.innerText = "Send Message";
    submitBtn.disabled = false;
  }
});