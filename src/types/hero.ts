export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText?: string;
  ctaLink?: string;
  overlay?: boolean;
}

export interface SliderControls {
  currentSlide: number;
  totalSlides: number;
  isAutoPlaying: boolean;
  direction: 'next' | 'prev';
}
