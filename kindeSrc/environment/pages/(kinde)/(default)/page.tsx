'use server';

import {
  getKindeWidget,
  fetch,
  type KindePageEvent,
} from '@kinde/infrastructure';
import React from 'react';
// @ts-expect-error: renderToString is not available in the server environment
import { renderToString } from 'react-dom/server.browser';
import Layout from '@/kindeSrc/environment/pages/layout';

const DefaultPage: React.FC<KindePageEvent> = async ({ context, request }) => {
  const res = await fetch(
    'https://cdn.builder.io/api/v3/content/login-page-data?apiKey=c065718cfdf849a89015b311c8d3185e&sort.createdDate=-1',
    {
      headers: {},
      method: 'GET',
    }
  )
  const loginPageImage = res?.data?.results?.[0]?.data?.loginPageImage || null;
  console.log('res', res);
  return (
    <Layout
      context={context}
      request={request}
      props={res?.data?.results?.[0]?.data}
    >
      <div className='container'>
        <main className='login-form-wrapper'>
          <div className='login-form'>
            {context.widget.content.heading && (
              <h2 className='heading'>{context.widget.content.heading}</h2>
            )}
            <p className='description'>{context.widget.content.description}</p>
            {getKindeWidget()}
          </div>
        </main>
        {loginPageImage && (
          <div className='side-panel'>
            <img
              className='side-panel-image'
              src={loginPageImage}
              alt='image'
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

// Page Component
export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await DefaultPage(event);
  return renderToString(page);
}
