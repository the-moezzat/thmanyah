export default function Logo() {
  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="Thmanyah Logo"
    >
      <g filter="url(#filter0_iii_3051_46869)">
        <g clipPath="url(#clip0_3051_46869)">
          <rect width={48} height={48} rx={12} fill="#16B364" />
          <rect width={48} height={48} fill="url(#paint0_linear_3051_46869)" />
          <g filter="url(#filter1_d_3051_46869)">
            <path
              d="M20.4375 9.75C20.4375 15.6525 15.6525 20.4375 9.75 20.4375V27.5625H20.4375V38.25H27.5625C27.5625 32.3475 32.3475 27.5625 38.25 27.5625V20.4375H27.5625V9.75H20.4375Z"
              fill="url(#paint1_linear_3051_46869)"
            />
          </g>
        </g>
        <rect
          x={1}
          y={1}
          width={46}
          height={46}
          rx={11}
          stroke="url(#paint2_linear_3051_46869)"
          strokeWidth={2}
        />
      </g>
      <defs>
        <filter
          id="filter0_iii_3051_46869"
          x={0}
          y={-3}
          width={48}
          height={54}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={-3} />
          <feGaussianBlur stdDeviation={1.5} />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_3051_46869"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={3} />
          <feGaussianBlur stdDeviation={1.5} />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_3051_46869"
            result="effect2_innerShadow_3051_46869"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius={1}
            operator="erode"
            in="SourceAlpha"
            result="effect3_innerShadow_3051_46869"
          />
          <feOffset />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_3051_46869"
            result="effect3_innerShadow_3051_46869"
          />
        </filter>
        <filter
          id="filter1_d_3051_46869"
          x={6.75}
          y={5.25}
          width={34.5}
          height={42}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius={1.5}
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_3051_46869"
          />
          <feOffset dy={2.25} />
          <feGaussianBlur stdDeviation={2.25} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3051_46869"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3051_46869"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_3051_46869"
          x1={24}
          y1={5.96047e-7}
          x2={26}
          y2={48}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0} />
          <stop offset={1} stopColor="white" stopOpacity={0.12} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3051_46869"
          x1={24}
          y1={9.75}
          x2={24}
          y2={38.25}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.8} />
          <stop offset={1} stopColor="white" stopOpacity={0.5} />
        </linearGradient>
        <linearGradient
          id="paint2_linear_3051_46869"
          x1={24}
          y1={0}
          x2={24}
          y2={48}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.12} />
          <stop offset={1} stopColor="white" stopOpacity={0} />
        </linearGradient>
        <clipPath id="clip0_3051_46869">
          <rect width={48} height={48} rx={12} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
