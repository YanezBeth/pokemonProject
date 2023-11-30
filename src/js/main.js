import pokemon from "pokemontcgsdk";
import {
  loadHeaderFooter
} from "./utils.mjs";

const apiKey =
  import.meta.env.VITE_API_KEY;

pokemon.configure({
  apiKey,
});

document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 1;

  // Function to initialize the slides
  function initializeSlides() {
    showSlides(slideIndex);
  }

  // Function to handle slides
  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {
    let slides = document.getElementsByClassName("card-type");
    let dots = document.getElementsByClassName("dot");

    console.log("Number of slides:", slides.length);
    console.log("Number of dots:", dots.length);

    // Check if there are no slides
    if (slides.length === 0) {
      console.error("No elements with class 'card-type' found.");
      return;
    }

    // Ensure slideIndex is within bounds
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    // Hide all slides and remove active class from dots
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      dots[i].className = dots[i].className.replace(" active", "");
    }

    // Display the current slide and set active class to the corresponding dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }

  // Load header and footer
  loadHeaderFooter();

  // Initialize the slides
  initializeSlides();
});
