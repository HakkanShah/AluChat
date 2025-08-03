export const Icons = {
  logo: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z" />
      {/* Good side */}
      <path d="M12 2v20" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <path d="M8 14c.5 1 1.5 1.5 3 1.5" />
      {/* Bad side */}
      <path d="M15 9l-1 2" />
      <path d="M16 15c-.5-1-1.5-1.5-3-1.5" />
    </svg>
  ),
};
