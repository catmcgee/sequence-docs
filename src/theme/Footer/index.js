/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import styles from './styles.module.css';
import ThemedImage from '@theme/ThemedImage';
import IconExternalLink from '@theme/IconExternalLink';

function FooterLink({to, href, label, prependBaseUrlToHref, ...props}) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true,
  });
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {href && !isInternalUrl(href) ? (
        <span>
          {label}
          <IconExternalLink />
        </span>
      ) : (
        label
      )}
    </Link>
  );
}

const FooterLogo = ({url, alt}) => (
  <img loading="lazy" className="footer__logo" alt={alt} src={url} />
);

function Footer() {
  const {footer} = useThemeConfig();
  const { copyright, links = [], logo = {} } = footer || {};
  const logoUrl = useBaseUrl(logo.src);
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };

  if (!footer) {
    return null;
  }

  return (
    <footer
      className={clsx('footer', {
        'footer--dark': footer.style === 'dark',
      })}>
      
      <div className="container">
        
        {/* can somone give me a wider image? */}
        {/* <img src={useBaseUrl('/img/image52.svg')} className="footer-background" alt="" /> */}

        <div className="row">
        
          <div className="col col--3">
                <span className="footer__logo-tagline">Made with &lt;/&gt; by</span>
                {logo.href ? <a href={logo.href} target="_blank" rel="noopener" className={styles.footerLogoLink}>
                    <FooterLogo alt={logo.alt} url={logoUrl} />
                  </a> : <FooterLogo alt={logo.alt} url={logoUrl} />}
          </div>
        
          <div className="col col--9">
            {links && links.length > 0 && (
              <div className="row footer__links">
                {links.map((linkItem, i) => (
                  <div key={i} className="col footer__col">
                    {linkItem.title != null ? (
                      <div className="footer__title">{linkItem.title}</div>
                    ) : null}
                    {linkItem.items != null &&
                    Array.isArray(linkItem.items) &&
                    linkItem.items.length > 0 ? (
                      <ul className="footer__items">
                        {linkItem.items.map((item, key) =>
                          item.html ? (
                            <li
                              key={key}
                              className="footer__item" // Developer provided the HTML, so assume it's safe.
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{
                                __html: item.html,
                              }}
                            />
                          ) : (
                            <li key={item.href || item.to} className="footer__item">
                              <FooterLink {...item} />
                            </li>
                          ),
                        )}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {copyright ? (
          <div
            className="footer__copyright" // Developer provided the HTML, so assume it's safe.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: copyright,
            }}
          />
        ) : null}
      </div>
    </footer>
  );
}

export default Footer;