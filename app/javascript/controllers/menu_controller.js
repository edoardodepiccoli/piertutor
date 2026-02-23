// app/javascript/controllers/menu_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["panel", "backdrop", "openIcon", "closeIcon"]

  connect() {
    this.close()

    this._beforeCacheHandler = this.beforeCache.bind(this)
    document.addEventListener("turbo:before-cache", this._beforeCacheHandler)
  }

  disconnect() {
    if (this._beforeCacheHandler) {
      document.removeEventListener("turbo:before-cache", this._beforeCacheHandler)
    }
  }

  toggle() {
    if (this.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  open() {
    this.isOpen = true

    this.openIconTarget.classList.add("hidden")
    this.closeIconTarget.classList.remove("hidden")

    this.backdropTarget.classList.remove("opacity-0", "pointer-events-none")
    this.backdropTarget.classList.add("opacity-100")

    this.panelTarget.classList.remove("translate-x-full")
    this.panelTarget.classList.add("translate-x-0")

    document.documentElement.classList.add("overflow-hidden")
  }

  close() {
    this.isOpen = false

    if (this.hasOpenIconTarget) this.openIconTarget.classList.remove("hidden")
    if (this.hasCloseIconTarget) this.closeIconTarget.classList.add("hidden")

    if (this.hasBackdropTarget) {
      this.backdropTarget.classList.add("opacity-0", "pointer-events-none")
      this.backdropTarget.classList.remove("opacity-100")
    }

    if (this.hasPanelTarget) {
      this.panelTarget.classList.add("translate-x-full")
      this.panelTarget.classList.remove("translate-x-0")
    }

    document.documentElement.classList.remove("overflow-hidden")
  }

  beforeCache() {
    this.close()
  }
}
