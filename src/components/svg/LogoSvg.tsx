import type { ComponentPropsWithoutRef } from "react";

export type LogoSvgProps = ComponentPropsWithoutRef<"svg"> & { size?: number };

export const LogoSvg = ({ size = 32, ...props }: LogoSvgProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 142 142" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="2.5" width="137" height="137" rx="27.5" fill="url(#paint0_linear_2_5)"/>
    <rect x="2.5" y="2.5" width="137" height="137" rx="27.5" stroke="url(#paint1_linear_2_5)" strokeWidth="5"/>
    <g filter="url(#filter0_d_2_5)">
    <path d="M47.9 95H43.644V94.566L44.96 93.544L43.882 90.954H39.178L38.03 93.6L40.494 94.44L40.214 95H35.958V94.566L37.274 93.53L41.236 84.444L42.692 83.73L46.78 93.586L48.18 94.44L47.9 95ZM41.586 85.41L39.458 90.324H43.63L41.586 85.41Z" fill="white"/>
    </g>
    <g filter="url(#filter1_d_2_5)">
    <path d="M112.822 49.466V54.66C112.822 55.64 112.584 56.48 112.108 57.18C111.641 57.88 111.063 58.4073 110.372 58.762C109.681 59.1073 109.005 59.28 108.342 59.28C107.511 59.28 106.765 59.098 106.102 58.734C105.449 58.3607 104.935 57.852 104.562 57.208C104.198 56.5547 104.016 55.822 104.016 55.01V49.046L102.56 48.556L102.84 47.996H107.096V48.43L105.766 49.466V54.338C105.766 55.5233 106.055 56.4473 106.634 57.11C107.222 57.7727 108.109 58.104 109.294 58.104C109.733 58.104 110.162 57.964 110.582 57.684C111.011 57.3947 111.361 56.9747 111.632 56.424C111.912 55.8733 112.052 55.2247 112.052 54.478V49.284L110.596 48.556L110.876 47.996H114.152V48.43L112.822 49.466Z" fill="white"/>
    </g>
    <g filter="url(#filter2_d_2_5)">
    <path d="M76.24 77H67.84V76.566L69.156 75.53V67.046L67.7 66.556L67.98 65.996H76.1L76.856 65.744V68.964L76.436 69.104L74.77 66.626H70.906V71.064H73.104L74.126 69.272H74.56V73.528L74 73.808L73.118 71.694H70.906V76.37H74.714L76.576 73.612L76.996 73.752V77.252L76.24 77Z" fill="white"/>
    </g>
    <g filter="url(#filter3_d_2_5)">
    <path d="M40.024 72.616C42.2 72.616 43.912 72.024 45.16 70.84C46.44 69.656 47.08 68.024 47.08 65.944C47.08 63 46.328 60.6 44.824 58.744C43.352 56.856 41.192 55.912 38.344 55.912C36.168 55.912 34.184 56.536 32.392 57.784V87.064L39.832 89.128L38.872 91.048H21.88V89.56L26.392 86.008V56.824L21.4 55.192L22.36 53.272H27.928C31.032 53.272 34.088 53.176 37.096 52.984C39.336 52.856 40.984 52.792 42.04 52.792C44.28 52.792 46.264 53.272 47.992 54.232C49.752 55.16 51.112 56.456 52.072 58.12C53.032 59.784 53.512 61.624 53.512 63.64C53.512 65.88 52.696 67.992 51.064 69.976C49.432 71.96 47.352 73.512 44.824 74.632C42.296 75.752 39.816 76.248 37.384 76.12L35.128 74.488L36.088 72.568H39.976L40.024 72.616Z" fill="white"/>
    </g>
    <g filter="url(#filter4_d_2_5)">
    <path d="M72.56 52.84C75.856 52.84 78.768 53.64 81.296 55.24C83.856 56.808 85.824 59 87.2 61.816C88.608 64.632 89.312 67.816 89.312 71.368C89.312 75.016 88.24 78.392 86.096 81.496C83.984 84.568 81.344 87.016 78.176 88.84C75.04 90.632 72.032 91.528 69.152 91.528C67.68 91.528 66.192 91.448 64.688 91.288C62.224 91.128 60.32 91.048 58.976 91.048H52.88V89.56L57.392 86.008V56.824L52.4 55.192L53.36 53.272H58.928C61.968 53.272 64.928 53.176 67.808 52.984C69.984 52.856 71.568 52.792 72.56 52.792V52.84ZM70.496 87.976C72.8 87.976 74.896 87.368 76.784 86.152C78.672 84.904 80.144 83.192 81.2 81.016C82.288 78.808 82.832 76.344 82.832 73.624C82.832 70.36 82.32 67.4 81.296 64.744C80.272 62.056 78.704 59.912 76.592 58.312C74.512 56.712 71.92 55.912 68.816 55.912C66.864 55.912 65.056 56.488 63.392 57.64V86.776C65.344 87.576 67.712 87.976 70.496 87.976Z" fill="white"/>
    </g>
    <g filter="url(#filter5_d_2_5)">
    <path d="M117.68 91H88.88V89.512L93.392 85.96V56.872L88.4 55.192L89.36 53.272H103.952V54.76L99.392 58.312V88.84H111.776L118.832 78.424L120.272 78.904V91.864L117.68 91Z" fill="white"/>
    </g>
    <defs>
    <filter id="filter0_d_2_5" x="30.458" y="82.23" width="23.222" height="22.27" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2.75"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.991667 0 0 0 0 0.491488 0 0 0 0 0.260312 0 0 0 1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_5"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_5" result="shape"/>
    </filter>
    <filter id="filter1_d_2_5" x="97.06" y="46.496" width="22.592" height="22.284" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2.75"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.991667 0 0 0 0 0.491488 0 0 0 0 0.260312 0 0 0 1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_5"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_5" result="shape"/>
    </filter>
    <filter id="filter2_d_2_5" x="62.2" y="64.244" width="20.296" height="22.508" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2.75"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.991667 0 0 0 0 0.491488 0 0 0 0 0.260312 0 0 0 1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_5"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_5" result="shape"/>
    </filter>
    <filter id="filter3_d_2_5" x="15.9" y="51.292" width="43.112" height="49.256" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2.75"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.991667 0 0 0 0 0.491488 0 0 0 0 0.260312 0 0 0 1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_5"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_5" result="shape"/>
    </filter>
    <filter id="filter4_d_2_5" x="46.9" y="51.292" width="47.912" height="49.736" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2.75"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.991667 0 0 0 0 0.491488 0 0 0 0 0.260312 0 0 0 1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_5"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_5" result="shape"/>
    </filter>
    <filter id="filter5_d_2_5" x="82.9" y="51.772" width="42.872" height="49.592" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2.75"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.991667 0 0 0 0 0.491488 0 0 0 0 0.260312 0 0 0 1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_5"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_5" result="shape"/>
    </filter>
    <linearGradient id="paint0_linear_2_5" x1="142" y1="0" x2="0" y2="142" gradientUnits="userSpaceOnUse">
    <stop stopColor="#0C0D0E"/>
    <stop offset="1" stopColor="#222222"/>
    </linearGradient>
    <linearGradient id="paint1_linear_2_5" x1="142" y1="142" x2="0" y2="0" gradientUnits="userSpaceOnUse">
    <stop stopColor="#DD683F"/>
    <stop offset="1" stopColor="#FFEF60"/>
    </linearGradient>
    </defs>
    </svg>
    
  );
};
