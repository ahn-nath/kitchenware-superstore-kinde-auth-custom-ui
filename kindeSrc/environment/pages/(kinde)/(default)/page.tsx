'use server';

import {
  getDarkModeLogoUrl,
  getKindeWidget,
  getLogoUrl,
  fetch,
  type KindePageEvent,
} from '@kinde/infrastructure';
import React from 'react';
// @ts-expect-error: renderToString is not available in the server environment
import { renderToString } from 'react-dom/server.browser';
import Layout from '../../layout';

interface LoginPageData {
  data: {
    results: Array<{
      data: {
        loginPageImage?: string;
        logo?: string;
        helpText?: string;
        helpNumber?: string;
        paymentLogos?: { name: string; image: string }[];
      };
    }>;
  };
}

const DefaultPage: React.FC<KindePageEvent> = async ({ context, request }) => {
  const res: LoginPageData = await fetch(
    'https://cdn.builder.io/api/v3/content/login-page-data?apiKey=6c476b9f79974e74ace7fa278e8bc666&sort.createdDate=-1',
    {
      headers: {},
      method: 'GET',
    }
  ).then((response) => response.json());
  const loginPageImage = res?.data?.results?.[0]?.data?.loginPageImage || null;
  console.log('res', context, request);
  return (
    <Layout
      context={context}
      request={request}
      props={res?.data?.results?.[0]?.data}
    >
      <div className='container'>
        <main className='login-form-wrapper'>
          <div className='login-form'>
            <a
              href='https://kwss-kitchenwarehouse.frontend.site/'
              className='back-to-site'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='icon icon-tabler icons-tabler-outline icon-tabler-circle-arrow-left'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M12 21a9 9 0 1 0 0 -18a9 9 0 0 0 0 18' />
                <path d='M8 12l4 4' />
                <path d='M8 12h8' />
                <path d='M12 8l-4 4' />
              </svg>
              Back to site
            </a>
            <a href='https://kwss-kitchenwarehouse.frontend.site/'>
              <div className='logo-wrapper'>
                <picture>
                  <source
                    media='(prefers-color-scheme: dark)'
                    srcSet={getDarkModeLogoUrl()}
                  />
                  <img
                    className='logo'
                    src={getLogoUrl()}
                    alt={context.widget.content.logoAlt}
                    width={152}
                    height={32}
                  />
                </picture>
              </div>
            </a>
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
