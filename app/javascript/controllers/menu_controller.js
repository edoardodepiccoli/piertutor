// app/javascript/controllers/menu_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu", "openIcon", "closeIcon"]

  connect() {
    this.closeIconTarget.classList.add("hidden")
    this.menuTarget.classList.add("hidden")
  }

  toggle() {
    this.menuTarget.classList.toggle("hidden")
    this.openIconTarget.classList.toggle("hidden")
    this.closeIconTarget.classList.toggle("hidden")
  }
}
