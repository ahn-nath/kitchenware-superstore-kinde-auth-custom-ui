'use server';

import {
  getKindeWidget,
  fetch,
  type KindePageEvent,
} from '@kinde/infrastructure';
import React from 'react';
import { renderToString } from 'react-dom/server.browser';
import Layout from '../../layout';

const DefaultPage: React.FC<KindePageEvent> = async ({ context, request }) => {
  console.log('context', context);
  console.log('request', request);

  const res = await fetch(
    'https://cdn.builder.io/api/v3/content/login-page-data?apiKey=c065718cfdf849a89015b311c8d3185e&sort.createdDate=-1',
    {
      headers: {},
      method: 'GET',
    }
  );
  const {
    loginPageImage,
    signInFormTextTop,
    signupFormTextTop,
    signInFormTextBottom,
    signupFormTextBottom,
  } = res?.data?.results?.[0]?.data || {};
  const isUserOnLoginOrRegisterPage = request?.route?.flow;
  console.log('res', context, request)
  return (
    <Layout
      context={context}
      request={request}
      props={res?.data?.results?.[0]?.data}
    >

      <div className='container'>
        <h1>Hello this is the Default Kinde page - test</h1>
        
        <pre>{JSON.stringify(request, null, 2)}</pre>
        <pre>{JSON.stringify(context, null, 2)}</pre>

        
        <p>Redirect URI: {request.authUrlParams?.redirectUri || 'Not available'}</p>
       

        <div className='login-form-wrapper'>
          {signInFormTextTop && isUserOnLoginOrRegisterPage === 'login' && (
            <div
              className='signInFormTextTopText'
              dangerouslySetInnerHTML={{
                __html: `${signInFormTextTop}`,
              }}
            />
          )}
          {signupFormTextTop && isUserOnLoginOrRegisterPage === 'register' && (
            <div
              className='signupFormTextTopText'
              dangerouslySetInnerHTML={{
                __html: `${signupFormTextTop}`,
              }}
            />
          )}
          <div className='login-form'>
            {context.widget.content.heading && (
              <h2 className='heading'>{context.widget.content.heading}</h2>
            )}
            <p className='description'>{context.widget.content.description}</p>
            {getKindeWidget()}
          </div>
          {signInFormTextBottom && isUserOnLoginOrRegisterPage === 'login' && (
            <div
              className='signInFormTextBottomText'
              dangerouslySetInnerHTML={{
                __html: `${signInFormTextBottom}`,
              }}
            />
          )}
          {signupFormTextBottom &&
            isUserOnLoginOrRegisterPage === 'register' && (
              <div
                className='signupFormTextBottom'
                dangerouslySetInnerHTML={{
                  __html: `${signupFormTextBottom}`,
                }}
              />
            )}
        </div>
        {loginPageImage && (
          <div className='side-panel'>
            <picture>
              <img
                className='side-panel-image'
                src={loginPageImage}
                alt='image'
              />
            </picture>
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
