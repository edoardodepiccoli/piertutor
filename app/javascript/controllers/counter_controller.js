import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    target: Number,
    suffix: { type: String, default: "" },
    duration: { type: Number, default: 2000 },
    decimals: { type: Number, default: 0 }
  }

  connect() {
    this.hasAnimated = false
    
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { threshold: 0.5 }
    )
    
    this.observer.observe(this.element)
  }

  disconnect() {
    this.observer.disconnect()
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !this.hasAnimated) {
        this.hasAnimated = true
        this.animateCount()
        this.observer.unobserve(this.element)
      }
    })
  }

  animateCount() {
    const target = this.targetValue
    const duration = this.durationValue
    const decimals = this.decimalsValue
    const suffix = this.suffixValue
    
    const startTime = performance.now()
    const startValue = 0
    
    const easeOutExpo = (t) => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    }

    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutExpo(progress)
      
      const currentValue = startValue + (target - startValue) * easedProgress
      
      if (decimals > 0) {
        this.element.textContent = currentValue.toFixed(decimals) + suffix
      } else {
        this.element.textContent = Math.round(currentValue).toLocaleString('it-IT') + suffix
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber)
      }
    }
    
    requestAnimationFrame(updateNumber)
  }
}
