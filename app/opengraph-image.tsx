import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'H2oHero - Bäderbetriebsleistungen Gersthofen';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#002b56',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white',
            padding: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: 'white',
              lineHeight: 1.2,
              textAlign: 'center',
            }}
          >
            WATER<br />WORLD
          </div>
        </div>
        <h1
          style={{
            fontSize: 60,
            color: 'white',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          Bäderbetriebsleistungen Gersthofen
        </h1>
        <p
          style={{
            fontSize: 30,
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
          }}
        >
          Professionelle Schwimmkurse & Beratung
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}