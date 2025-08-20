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
  let conditionalValue = 1 // process.env.NEXT_PUBLIC_CONDITIONAL_VALUE || 'Default value';
  let clientId = request.authUrlParams?.clientId || null;


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

      {/* Example of conditional rendering based on environment variable */}
      {clientId == 'ca3c184c80c740bd842777bceee2df74' &&
      <div className='container'>
        <h1>Hello this is the Default Kinde page - Container 1</h1>
        
        <pre>{JSON.stringify(request, null, 2)}</pre>
        <pre>{JSON.stringify(context, null, 2)}</pre>
        <h2> Client ID: {request.authUrlParams?.clientId || 'Not available'}</h2>

        
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
      }
      {/* Example of conditional rendering based on environment variable */}
      {clientId != 'ca3c184c80c740bd842777bceee2df74'  &&
            <div className='container-2'>
        <h1>Hello this is the Default Kinde page - Container 2</h1>
        
        <pre>{JSON.stringify(request, null, 2)}</pre>
        <pre>{JSON.stringify(context, null, 2)}</pre>
        <h2> Client ID: {request.authUrlParams?.clientId || 'Not available'}</h2>


        
        <p>Redirect URI - Container 2: {request.authUrlParams?.redirectUri || 'Not available'}</p>
       

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
      }
        

    </Layout>
  );
};

// Page Component
export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await DefaultPage(event);
  return renderToString(page);
}
