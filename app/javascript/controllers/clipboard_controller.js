import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["source", "button"]
  static values = { text: String }

  copy() {
    const text = this.textValue || this.sourceTarget.textContent

    navigator.clipboard.writeText(text).then(() => {
      const originalText = this.buttonTarget.textContent
      this.buttonTarget.textContent = "Copiato!"
      
      setTimeout(() => {
        this.buttonTarget.textContent = originalText
      }, 2000)
    })
  }
}
