import type { ComponentProps } from 'react';

export default function IconBase({
  children,
  width = 16,
  height = 16,
  fill = 'currentColor',
  viewBox = '0 0 16 16',
  ...props
}: ComponentProps<'svg'>) {

  return(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox={viewBox}
      style={{
        verticalAlign: '-0.125rem',
        ...props.style,
      }}
      {...props}
    >
      {children}
    </svg>
  );
}
