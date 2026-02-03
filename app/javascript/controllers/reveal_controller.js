import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["item"]
  static values = { 
    threshold: { type: Number, default: 0.1 },
    delay: { type: Number, default: 0 },
    stagger: { type: Number, default: 100 }
  }

  connect() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { threshold: this.thresholdValue, rootMargin: "0px 0px -50px 0px" }
    )

    this.itemTargets.forEach((item) => {
      item.classList.add("reveal-hidden")
      this.observer.observe(item)
    })
  }

  disconnect() {
    this.observer.disconnect()
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const item = entry.target
        const index = this.itemTargets.indexOf(item)
        const delay = this.delayValue + (index * this.staggerValue)
        
        setTimeout(() => {
          item.classList.remove("reveal-hidden")
          item.classList.add("reveal-visible")
        }, delay)
        
        this.observer.unobserve(item)
      }
    })
  }
}
