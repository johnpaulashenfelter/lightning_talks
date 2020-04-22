import { Application } from "stimulus"
import CarouselController from "carousel_controller"
import slides from '../slides'

const changeValue = (element, value, eventType) => {
  const event = new Event(eventType);
  element.value = value;
  element.dispatchEvent(event);
}

describe('CarouselController', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div data-controller="carousel">
    <figure>
      <img data-target="carousel.image" />
      <figcaption data-target="carousel.caption">
      </figcaption>
    </figure>
    <button data-action="carousel#previous">Prev</button>
    <button data-action="carousel#next">Next</button>
    `;

    const application = Application.start();
    application.register("carousel", CarouselController);
  });


  it('has an initial `index` of "0"', () => {
    const index = document.querySelector('div').dataset.carouselIndex
    expect(index).toBe("0");
  });

  it('renders the slide image', () => {
    const imgSrc = document.querySelector('figure img').src
    const slide = slides[0]
    expect(imgSrc).toBe(slide.imgUrl)
  })

  it('renders the caption', () => {
    const caption = document.querySelector('figure figcaption').textContent
    const slide = slides[0]
    const formattedCaption = new CarouselController().generateCaption(slides[0]).replace(/<[^>]+>/g, '')
    expect(caption).toContain(slide.description)
    expect(caption).toContain(slide.attribution.name)
    expect(caption).toBe(formattedCaption)
  })

  it('generates the caption from the slide data', () => {
    const carousel = new CarouselController()
    expect(carousel.generateCaption(slides[0])).toBe("<strong>Seattle</strong> Photo by <a href=\"https://unsplash.com/@gkumar2175?utm_source=test-driven-carousel&utm_medium=referral}\">Ganapathy Kumar</a> on <a href=\"https://unsplash.com/?utm_source=test-driven-carousel&utm_medium=referral\"}>Unsplash</a>")
  })
  
  it('increments `index` when Next is clicked', () => {
    const carousel = document.querySelector('div')
    const btn = document.querySelector('[data-action="carousel#next"]')
    carousel.dataset.carouselIndex = 1
    expect(carousel.dataset.carouselIndex).toBe("1");
    changeValue(btn, null, "click");
    expect(carousel.dataset.carouselIndex).toBe("2");
  });

  it('decrements `index` when Prev is clicked', () => {
    const carousel = document.querySelector('div')
    const btn = document.querySelector('[data-action="carousel#previous"]')
    carousel.dataset.carouselIndex = 3
    expect(carousel.dataset.carouselIndex).toBe("3");
    changeValue(btn, null, "click");
    expect(carousel.dataset.carouselIndex).toBe("2");
  });
  
  describe('with the first slide selected', () => {
    it('wraps `index` to the max value when Prev is clicked', () => {
      const carousel = document.querySelector('div')
      const btn = document.querySelector('[data-action="carousel#previous"]')
      changeValue(btn, null, "click");
      expect(carousel.dataset.carouselIndex).toBe(`${slides.length - 1}`);
    });
  });
  describe('with the last slide selected', () => {
    it('wraps `index` to the min value when Next is clicked', () => {
      const carousel = document.querySelector('div')
      const btn = document.querySelector('[data-action="carousel#next"]')
      const index = document.querySelector('div').dataset.carouselIndex
      carousel.dataset.carouselIndex = slides.length - 1
      changeValue(btn, null, "click");
      expect(carousel.dataset.carouselIndex).toBe("0");
    });
  });

})



// it('renders the current slide as a CarouselSlide', () => {
//   let slideProps;
//   slideProps = wrapper.find(CarouselSlide).props();
//   expect(slideProps).toEqual({ ...CarouselSlide.defaultProps, ...slides[0] });
//   wrapper.setState({ slideIndex: 1 });
//   slideProps = wrapper.find(CarouselSlide).props();
//   expect(slideProps).toEqual({ ...CarouselSlide.defaultProps, ...slides[1] });
// });

// it('passes defaultImg and defaultImgHeight to the CarouselSlide', () => {
//   const defaultImg = () => 'test';
//   const defaultImgHeight = 1234;
//   wrapper.setProps({ defaultImg, defaultImgHeight });
//   expect(wrapper.find(CarouselSlide).prop('Img')).toBe(defaultImg);
//   expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(
//     defaultImgHeight
//   );
// });

// it('allows individual slides to override Img and imgHeight', () => {
//   const Img = () => 'test';
//   const imgHeight = 1234;
//   wrapper.setProps({ slides: [{ ...slides[0], Img, imgHeight }] });
//   expect(wrapper.find(CarouselSlide).prop('Img')).toBe(Img);
//   expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(imgHeight);
// });
