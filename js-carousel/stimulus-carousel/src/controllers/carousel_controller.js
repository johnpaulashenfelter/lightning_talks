import { Controller } from "stimulus"
import slides from '../slides'

export default class extends Controller {
  static targets = [ "slide", "image", "caption" ]
  
  initialize() {
    if (!this.data.has("index")) {
      this.index = 0
    }
    this.showCurrentSlide()
  }

  next() {
    const upperBound = slides.length
    this.index = upperBound ? (this.index + 1) % upperBound : this.index + 1
  }

  previous() {
    const upperBound = slides.length
    this.index = upperBound ? (this.index + upperBound - 1) % upperBound : this.index - 1;
  }

  showCurrentSlide() {
    const img = this.imageTarget
    const caption = this.captionTarget
    const slide = slides[this.index]

    img.src = slide.imgUrl
    img.height = 500

    caption.innerHTML = this.generateCaption(slide) 
  }

  get index() {
    return parseInt(this.data.get("index"))
  }

  set index(value) {
    this.data.set("index", value)
    this.showCurrentSlide()
  }

  generateCaption(slide) {
    const referralParams = 'utm_source=test-driven-carousel&utm_medium=referral'
    return `<strong>${slide.description}</strong> Photo by <a href="https://unsplash.com/@${slide.attribution.username}?${referralParams}}">${slide.attribution.name}</a> on <a href="https://unsplash.com/?${referralParams}"}>Unsplash</a>`
  }
}
// 
  // Photo by <a href={getUsernameUrl(username)}>{name}</a> on{' '}
  // <a href={`https://unsplash.com/?${referralParams}`}>Unsplash</a>

  // 

  
  