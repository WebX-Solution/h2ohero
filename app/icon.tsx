import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 32, height: 32 };

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#002b56',
          borderRadius: 8,
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: 'white',
            lineHeight: 1,
            textAlign: 'center',
          }}
        >
          H2o
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}