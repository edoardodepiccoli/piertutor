import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["nav"]

  connect() {
    this.scrollThreshold = 100
    this.isVisible = false
    this.handleScroll = this.handleScroll.bind(this)
    window.addEventListener("scroll", this.handleScroll)
  }

  disconnect() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll() {
    const scrollY = window.scrollY

    if (scrollY > this.scrollThreshold && !this.isVisible) {
      this.show()
    } else if (scrollY <= this.scrollThreshold && this.isVisible) {
      this.hide()
    }
  }

  show() {
    this.isVisible = true
    this.navTarget.classList.remove("-translate-y-full")
    this.navTarget.classList.add("translate-y-0")
  }

  hide() {
    this.isVisible = false
    this.navTarget.classList.remove("translate-y-0")
    this.navTarget.classList.add("-translate-y-full")
  }
}