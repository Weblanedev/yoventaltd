import { ImageResponse } from 'next/og';
import { company } from '@/lib/contact';
import { siteName } from '@/lib/site';

export const runtime = 'edge';

export const alt = siteName;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #064e3b 100%)',
          padding: 72,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 20,
              background: 'linear-gradient(145deg, #34d399, #047857)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 50,
              fontWeight: 800,
            }}
          >
            Y
          </div>
          <div style={{ height: 40 }} />
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            {siteName}
          </div>
          <div
            style={{
              fontSize: 30,
              color: 'rgba(255,255,255,0.78)',
              marginTop: 20,
              lineHeight: 1.35,
            }}
          >
            {company.businessLine}
          </div>
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          }}
        >
          yoventadigital.com
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
