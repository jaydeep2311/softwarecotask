interface PlaceholderImageProps {
  width: number;
  height: number;
  className?: string;
  alt?: string;
}

export default function PlaceholderImage({ width, height, className, alt }: PlaceholderImageProps) {
  return (
    <div 
      className={className}
      style={{
        width: width,
        height: height,
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9ca3af',
        fontSize: '12px',
        fontWeight: '500'
      }}
      title={alt}
    >
      {alt || 'Image'}
    </div>
  );
}
