'use server';

import {
  getKindeWidget,
  getEnvironmentVariable,
  fetch,
  type KindePageEvent,
} from '@kinde/infrastructure';
import React from 'react';
// @ts-expect-error: renderToString is not available in the server environment
import { renderToString } from 'react-dom/server.browser';
import Layout from '../../layout';

const DefaultPage: React.FC<KindePageEvent> = async({ context, request }) => {
  const res = await fetch('https://.kinde.com/api/v1/environment_variables/',{
    method: 'GET',
    headers: {}
  })
  // const test = getEnvironmentVariable('KINDE_SITE_URL')
  console.log('test', res);
  return (
    <Layout context={context} request={request}>
      <div className='container'>
        {/* <p>{test?.value}</p> */}
        <main className='login-form-wrapper'>
          <div className='login-form'>
            {context.widget.content.heading && (
              <h2 className='heading'>{context.widget.content.heading}</h2>
            )}
            <p className='description'>{context.widget.content.description}</p>
            {getKindeWidget()}
          </div>
        </main>
        <div className='side-panel'>
          <img
            className='side-panel-image'
            src='https://media.kitchenwarehouse.com.au/image/upload/Kitchen%20Warehouse%20Images%20/kinde_login.png'
            alt='image'
          />
        </div>
      </div>
    </Layout>
  );
};

// Page Component
export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await DefaultPage(event);
  return renderToString(page);
}
