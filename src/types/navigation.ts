export interface NavLink {
  label: string;
  target: string;
  type: 'link' | 'toggle' | 'section' | 'page';
}

export interface NavIcon {
  src: string;
  alt: string;
  width: number;
  height: number;
}
