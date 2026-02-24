import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const steps = [
      { name: "image",   delay: 100 },
      { name: "line1",   delay: 600 },
      { name: "buttons", delay: 800 },
    ]

    steps.forEach(({ name, delay }) => {
      setTimeout(() => {
        document.querySelectorAll(`[data-intro="${name}"]`).forEach(el => {
          el.classList.add("intro-revealed")
        })
      }, delay)
    })
  }
}
