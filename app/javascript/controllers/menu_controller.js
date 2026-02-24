import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["panel", "backdrop", "openIcon", "closeIcon", "item"]

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

    this.panelTarget.style.maxHeight = this.panelTarget.scrollHeight + "px"
    this.panelTarget.style.opacity = "1"

    this.itemTargets.forEach((item, i) => {
      item.style.transitionDelay = `${80 + i * 60}ms`
      requestAnimationFrame(() => item.classList.add("menu-item-visible"))
    })
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
      this.panelTarget.style.maxHeight = "0"
      this.panelTarget.style.opacity = "0"
    }

    this.itemTargets.forEach(item => {
      item.classList.remove("menu-item-visible")
      item.style.transitionDelay = "0ms"
    })
  }

  beforeCache() {
    this.close()
  }
}
