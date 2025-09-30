import { Controller } from "@hotwired/stimulus"

// Handles Rails flash messages with auto-dismiss and animation
export default class extends Controller {
  static values = {
    duration: { type: Number, default: 2000 } // in ms
  }

  connect() {
    this.show()
    setTimeout(() => this.hide(), this.durationValue)
  }

  show() {
    this.element.classList.remove("translate-y-full", "opacity-0")
    this.element.classList.add("translate-y-0", "opacity-100")
  }

  hide() {
    this.element.classList.remove("translate-y-0", "opacity-100")
    this.element.classList.add("translate-y-full", "opacity-0")
  }
}
