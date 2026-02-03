import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["text"]
  static values = {
    words: { type: Array, default: [] },
    interval: { type: Number, default: 3000 },
    animationDuration: { type: Number, default: 600 }
  }

  connect() {
    this.currentIndex = 0
    this.isAnimating = false
    
    // Start cycling immediately
    this.startCycling()
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  startCycling() {
    this.intervalId = setInterval(() => {
      this.nextWord()
    }, this.intervalValue)
  }

  nextWord() {
    if (this.isAnimating) return
    this.isAnimating = true

    const textEl = this.textTarget
    
    // Slide out
    textEl.classList.add("slide-out")
    
    setTimeout(() => {
      // Change text
      this.currentIndex = (this.currentIndex + 1) % this.wordsValue.length
      textEl.textContent = this.wordsValue[this.currentIndex]
      
      // Reset and slide in
      textEl.classList.remove("slide-out")
      textEl.classList.add("slide-in")
      
      setTimeout(() => {
        textEl.classList.remove("slide-in")
        this.isAnimating = false
      }, this.animationDurationValue / 2)
    }, this.animationDurationValue / 2)
  }
}
