'use client';

import React, { useMemo, useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Wsiwyg.module.scss'
import { useRouter } from 'next/router'

interface TreeNode {
  uid?: string
  type?: string
  text?: string
  children?: TreeNode[]
  attrs?: {
    [key: string]: unknown
    'class-name'?: string
    'redactor-attributes'?: {
      position?: string
    }
    style?: {
      'text-align'?: string
    }
    colWidths?: number[]
    url?: string
    'asset-type'?: string
    'asset-link'?: string
    'asset-name'?: string
    'asset-caption'?: string
    link?: string
    inline?: boolean
    width?: number
    height?: number
    'max-width'?: number
  }
  break?: boolean
  italic?: boolean
  bold?: boolean
  underline?: boolean
  subscript?: boolean
  uuid?: string
}

export interface IProps {
  content?: string
  className?: string
  fullWidth?: boolean
  htmlString?: boolean
  displayInContainer?: boolean
  jsonContent?: TreeNode | TreeNode[]
  level?: number
  removeFirstHTag?: boolean // temporary fix
}
const Wysiwyg = ({
  level,
  className,
  fullWidth = false,
  jsonContent,
  displayInContainer = true,
  removeFirstHTag,
}: IProps) => {
  const [h1Appeared, setH1Appeared] = useState<string>()
  const router = useRouter()
  const parseText = (element) => {
    let result = element.text

    if (result.match(/\t/g)) {
      const tabs = result.match(/\t/g)
      result = (
        <>
          {result}
          {tabs && tabs?.map(() => <>&ensp;</>)}
        </>
      )
    }

    if (element?.underline) {
      result = <u>{result}</u>
    }

    if (element?.italic) {
      result = <i>{result}</i>
    }

    if (element?.bold) {
      result = <b>{result}</b>
    }

    if (element?.subscript) {
      result = <sub>{result}</sub>
    }

    return result
  }

  const renderTableElements = (elements: TreeNode[], colWidth: number[]) => {
    const thead = elements?.[0]
    const tbody = elements?.[1]
    const rows = tbody?.children

    return (
      <>
        <thead>
          {thead?.children?.map((el, index) => {
            return (
              <tr key={index}>
                {el?.children?.map((col, index) => {
                  return (
                    <td key={index} style={{ width: colWidth[index] }}>
                      {traverseTree(col?.children, 0)}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody>
          {rows?.map((el, index) => {
            return (
              <tr key={index}>
                {el?.children?.map((col, index) => {
                  return (
                    <td key={index} style={{ width: colWidth[index] }}>
                      <div className='flex flex-col md:flex-row gap-2 items-center'>
                        {traverseTree(col?.children, 0)}
                      </div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </>
    )
  }

  const traverseTree = (node, height: number) => {
    if (height >= level) {
      return
    }

    return node?.map((element, index) => {
      let style = element?.attrs?.['style']
      if (style?.['text-align'] === 'justify') {
        style = {
          ...style,
          display: 'flex',
          flex: 1,
          justifyContent: 'space-between',
          marginBottom: '10px',
        }
      }

      if (element?.break) {
        return (element?.text?.match(/\n/g) || [])?.map(() => (
          <br key={element?.uuid} />
        ))
      }

      if (element?.text) {
        return parseText(element)
      }
      if (element?.type === 'doc' && element?.children) {
        return (
          <div className={classNames(styles.Doc, 'Doc')} key={element.uid}>
            {traverseTree(element.children, height + 1)}
          </div>
        )
      } else {
        if (element?.type === 'reference') {
          const allAtrs = JSON.parse(JSON.stringify(element?.attrs))
          let attrsJson = {}
          let style: {
            textAlign?: string;
            width?: string;
            height?: string;
            maxWidth?: string;
            margin?: string;
            float?: 'left' | 'right' | 'none' | 'inherit' | undefined;
          } = {}
          if (element?.attrs['redactor-attributes']) {
            attrsJson = { ...allAtrs['redactor-attributes'] }
          }

          if (allAtrs['inline']) {
            delete allAtrs['width']
            delete allAtrs['height']
            delete allAtrs['style']
          }

          style = {
            ...style,
            textAlign: attrsJson['position'] === 'center' ? 'center' : 'left',
            width: `${allAtrs['width'] ? allAtrs['width'] + 'px' : 100 + '%'}`,
            height: `${
              allAtrs['height'] ? allAtrs['height'] + 'px' : 100 + '%'
            }`,
            maxWidth: `${allAtrs['max-width'] ? allAtrs['width'] : 100 + '%'}`,
          }

          if (attrsJson['position'] === 'center') {
            style['margin'] = 'auto'
          }

          if (
            attrsJson['position'] === 'left' ||
            attrsJson['position'] === 'right'
          ) {
            style['float'] = attrsJson['position'] as 'left' | 'right'
          }

          if (
            element?.attrs?.['asset-type'] === 'image/png' ||
            element?.attrs?.['asset-type'] === 'image/jpeg'
          ) {
            const content = (
              <>
                <div
                  style={style as React.CSSProperties}
                  key={element?.uid || index}
                  className={classNames('relative hidden md:inline-block', {
                    'aspect-w-3 aspect-h-2': allAtrs['inline'],
                  })}>
                  <Image
                    src={element?.attrs?.['asset-link']}
                    alt={element?.attrs?.['asset-name']}
                    className={`${styles.image} object-fill`}
                    fill
                    sizes='100vw'
                  />
                </div>
                <div
                  style={{ ...style } as React.CSSProperties}
                  key={element?.uid || index}
                  className={classNames('relative md:hidden', {
                    'aspect-w-3 aspect-h-2': allAtrs['inline'],
                  })}>
                  <Image
                    src={element?.attrs?.['asset-link']}
                    alt={element?.attrs?.['asset-name']}
                    className={`${styles.image} object-fill`}
                    fill
                    sizes='100vw'
                  />
                </div>
              </>
            )

            if (allAtrs['link']) {
              return (
                <>
                  <Link
                    key={element?.uid || index}
                    href={allAtrs['link']}
                    className={classNames('mx-auto', {
                      'w-full flex': style.margin === 'auto',
                    })}
                    target='_blank'>
                    {content}
                  </Link>
                  {allAtrs['asset-caption'] && (
                    <div
                      className={classNames({
                        'px-auto flex': style.margin === 'auto',
                      })}>
                      <div
                        style={{
                          width: style.width,
                          float: style.float,
                          margin: style.margin === 'auto' ? 'auto' : 0,
                        }}
                        className='text-base inline-block  text-black-88 font-normal text-center mt-1'>
                        {allAtrs['asset-caption']}
                      </div>
                    </div>
                  )}
                </>
              )
            } else {
              return (
                <>
                  {content}
                  {allAtrs['asset-caption'] && (
                    <div
                      className={classNames({
                        'px-auto flex': style.margin === 'auto',
                      })}>
                      <div
                        style={{
                          width: style.width,
                          float: style.float,
                          margin: style.margin === 'auto' ? 'auto' : 0,
                        }}
                        className='text-base  text-black-88 font-normal text-center'>
                        <p className='mt-1'>{allAtrs['asset-caption']}</p>
                      </div>
                    </div>
                  )}
                </>
              )
            }
          }
        }

        if (element?.type === 'a') {
          return element.attrs?.url ? (
            <Link
              className={element.attrs?.['class-name'] || ''}
              target='_blank'
              href={element.attrs?.url}
              key={element.uid || index}>
              {traverseTree(element.children, height + 1)}
            </Link>
          ) : (
            <a className={element.attrs?.['class-name'] || ''}>
              {traverseTree(element.children, height + 1)}
            </a>
          )
        }
        if (element?.type === 'hr') {
          return (
            <hr
              style={{ marginBottom: '10px' }}
              key={element?.uid}
              className='border-dashed'
            />
          )
        }

        if (element?.type === 'table') {
          const colWidths = element?.attrs?.colWidths
          const position = element?.attrs?.style?.['text-align']
          return (
            <table
              key={element?.uid}
              className={position === 'center' && 'mx-auto'}>
              {renderTableElements(element?.children, colWidths)}
            </table>
          )
        }

        if (element?.type === 'img') {
          return (
            <div
              key={element?.uid}
              className={classNames('relative', {
                'float-right':
                  element?.attrs?.['redactor-attributes']?.position === 'right',
                'float-left':
                  element?.attrs?.['redactor-attributes']?.position === 'left',
              })}></div>
          )
        }

        if (element?.type === 'p') {
          return (
            <p
              className={element?.attrs?.['class-name']?.toLowerCase() || ''}
              key={element?.uid || index}
              style={style}>
              {traverseTree(element?.children, height)}
            </p>
          )
        }

        if (element?.type === 'h1') {
          // temporary fix. This need to be removed after content is fixed
          if (removeFirstHTag) {
            if (!!h1Appeared && h1Appeared === element?.uid) {
              return
            }
            if (!!!h1Appeared) {
              setH1Appeared(element?.uid)
              return null
            }
          }
          return (
            <h1
              key={element?.uid}
              style={styles}
              className={element?.attrs?.['class-name']?.toLowerCase() || ''}>
              {traverseTree(element?.children, height)}
            </h1>
          )
        }

        if (element?.type && element?.children) {
          return React.createElement(
            element.type,
            {
              key: element?.uid || index,
              style: style || {},
              className: element?.attrs?.['class-name']?.toLowerCase() || '',
            },
            traverseTree(element?.children, height + 1)
          )
        }
      }
    })
  }

  const tree = useMemo(() => {
    return traverseTree(
      Array.isArray(jsonContent) ? jsonContent : [jsonContent],
      0
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonContent])

  return (
    <div>
      <div
        className={classNames(
          styles.wysiwyg,
          className,
          styles.article,
          'grid md:grid-cols-12 grid-cols-6 gap-2 w-full',
          {
            'lg:px-12 md:px-6 px-4 lg:py-12 md:py-9 py-6': displayInContainer,
            'break-words': router.asPath.includes('/mattresses'),
            'md:gap-3': !router.asPath.includes('/mattresses'),
          }
        )}>
        <div
          className={classNames({
            'col-span-full': fullWidth,
            'lg:col-span-8 md:col-span-10 col-span-full lg:col-start-3 md:col-start-2':
              !fullWidth,
          })}>
          {tree}
        </div>
      </div>
    </div>
  )
}

export default Wysiwyg
