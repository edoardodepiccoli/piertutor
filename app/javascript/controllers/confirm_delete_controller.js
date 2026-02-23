import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["trashIcon", "confirmIcon"]

  connect() {
    this.confirming = false
  }

  confirm(event) {
    if (this.confirming) return

    event.preventDefault()
    event.stopImmediatePropagation()

    this.confirming = true
    this.trashIconTarget.classList.add("hidden")
    this.confirmIconTarget.classList.remove("hidden")
    this.element.classList.add("!text-red-500", "!bg-red-50")

    this.timeout = setTimeout(() => this.revert(), 3000)
  }

  revert() {
    clearTimeout(this.timeout)
    this.confirming = false
    this.trashIconTarget.classList.remove("hidden")
    this.confirmIconTarget.classList.add("hidden")
    this.element.classList.remove("!text-red-500", "!bg-red-50")
  }

  disconnect() {
    clearTimeout(this.timeout)
  }
}
