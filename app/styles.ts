export const styles = `
  hr {
    margin: 20px 0;
    border-color: var(--color-divider-border);
  }

  &.space-y {
    ul > li {
      margin-top: 16px;
    }
  }

  a {
    text-decoration: underline;
  }

  h4,
  h5,
  h6,
  p,
  div,
  ul,
  blockquote {
    margin-top: 16px;
  }

  h1,
  h2 {
    margin-top: 56px;
  }

  h1:first-child,
  h2:first-child,
  h3:first-child,
  h4:first-child,
  h5:first-child,
  h6:first-child,
  p:first-child,
  div:first-child,
  ul:first-child,
  blockquote:first-child,
  a:first-child {
    margin-top: 0;
  }

  h1,
  h1 a {
    font-family: var(--typography-display-lg-mobile-font-family);
    font-size: var(--typography-display-lg-mobile-font-size);
    font-style: var(--typography-display-lg-mobile-font-style);
    font-weight: var(--typography-display-lg-mobile-font-weight);
    line-height: var(--typography-display-lg-mobile-line-height);
    letter-spacing: var(--typography-display-lg-mobile-letter-spacing);
    font-variation-settings: var(
      --typography-display-lg-mobile-font-variation-settings
    );
  }

  h2,
  h2 a {
    font-family: var(--typography-display-md-mobile-font-family);
    font-size: var(--typography-display-md-mobile-font-size);
    font-style: var(--typography-display-md-mobile-font-style);
    font-weight: var(--typography-display-md-mobile-font-weight);
    line-height: var(--typography-display-md-mobile-line-height);
    letter-spacing: var(--typography-display-md-mobile-letter-spacing);
    font-variation-settings: var(
      --typography-display-md-mobile-font-variation-settings
    );
  }

  h3,
  h3 a {
    margin-top: 32px;

    font-family: var(--typography-display-sm-mobile-font-family);
    font-size: var(--typography-display-sm-mobile-font-size);
    font-style: var(--typography-display-sm-mobile-font-style);
    font-weight: var(--typography-display-sm-mobile-font-weight);
    line-height: var(--typography-display-sm-mobile-line-height);
    letter-spacing: var(--typography-display-sm-mobile-letter-spacing);
    font-variation-settings: var(
      --typography-display-sm-mobile-font-variation-settings
    );
  }

  h4,
  h4 a,
  h5,
  h5 a,
  h6,
  h6 a {
    font-family: var(--typography-display-xs-mobile-font-family);
    font-size: var(--typography-display-xs-mobile-font-size);
    font-style: var(--typography-display-xs-mobile-font-style);
    font-weight: var(--typography-display-xs-mobile-font-weight);
    line-height: var(--typography-display-xs-mobile-line-height);
    letter-spacing: var(--typography-display-xs-mobile-letter-spacing);
    font-variation-settings: var(
      --typography-display-xs-mobile-font-variation-settings
    );
  }

  p,
  ol,
  ul,
  li,
  a {
    font-family: var(--typography-body-md-mobile-font-family);
    font-size: var(--typography-body-md-mobile-font-size);
    font-style: var(--typography-body-md-mobile-font-style);
    line-height: var(--typography-body-md-mobile-line-height);
    letter-spacing: var(--typography-body-md-mobile-letter-spacing);
    font-weight: var(--typography-body-md-mobile-font-weight);
    font-variation-settings: var(
      --typography-body-md-mobile-font-variation-settings
    );
  }

  ol {
    list-style-type: decimal;
  }

  ul {
    list-style-type: disc;
  }

  ol,
  ul {
    margin-left: 20px;
  }

  strong {
    font-weight: var(--typography-semibold-mobile-font-weight);
    font-variation-settings: var(
      --typography-semibold-mobile-font-variation-settings
    );
  }

  blockquote {
    border-left: 2px solid var(--color-base-brand);
    padding-left: 20px;

    font-family: var(--typography-body-xl-mobile-font-family);
    font-size: var(--typography-body-xl-mobile-font-size);
    font-style: italic;
    line-height: var(--typography-body-xl-mobile-line-height);
    letter-spacing: var(--typography-body-xl-mobile-letter-spacing);
    font-weight: var(--typography-semibold-mobile-font-weight);
    font-variation-settings: var(
      --typography-semibold-mobile-font-variation-settings
    );
  }

  @media screen and (min-width: 1024px) {
    h1,
    h1 a {
      font-family: var(--typography-display-lg-font-family);
      font-size: var(--typography-display-lg-font-size);
      font-style: var(--typography-display-lg-font-style);
      font-weight: var(--typography-display-lg-font-weight);
      line-height: var(--typography-display-lg-line-height);
      letter-spacing: var(--typography-display-lg-letter-spacing);
      font-variation-settings: var(
        --typography-display-lg-font-variation-settings
      );
    }

    h2,
    h2 a {
      font-family: var(--typography-display-md-font-family);
      font-size: var(--typography-display-md-font-size);
      font-style: var(--typography-display-md-font-style);
      font-weight: var(--typography-display-md-font-weight);
      line-height: var(--typography-display-md-line-height);
      letter-spacing: var(--typography-display-md-letter-spacing);
      font-variation-settings: var(
        --typography-display-md-font-variation-settings
      );
    }

    h3,
    h3 a {
      font-family: var(--typography-display-sm-font-family);
      font-size: var(--typography-display-sm-font-size);
      font-style: var(--typography-display-sm-font-style);
      font-weight: var(--typography-display-sm-font-weight);
      line-height: var(--typography-display-sm-line-height);
      letter-spacing: var(--typography-display-sm-letter-spacing);
      font-variation-settings: var(
        --typography-display-sm-font-variation-settings
      );
    }

    h4,
    h4 a,
    h5,
    h5 a,
    h6,
    h6 a {
      font-family: var(--typography-display-xs-font-family);
      font-size: var(--typography-display-xs-font-size);
      font-style: var(--typography-display-xs-font-style);
      font-weight: var(--typography-display-xs-font-weight);
      line-height: var(--typography-display-xs-line-height);
      letter-spacing: var(--typography-display-xs-letter-spacing);
      font-variation-settings: var(
        --typography-display-xs-font-variation-settings
      );
    }

    p,
    ol,
    ul,
    li,
    a {
      font-family: var(--typography-body-md-font-family);
      font-size: var(--typography-body-md-font-size);
      font-style: var(--typography-body-md-font-style);
      line-height: var(--typography-body-md-line-height);
      letter-spacing: var(--typography-body-md-letter-spacing);
      font-weight: var(--typography-body-md-font-weight);
      font-variation-settings: var(
        --typography-body-md-font-variation-settings
      );
    }

    strong {
      font-weight: var(--typography-semibold-font-weight);
      font-variation-settings: var(
        --typography-semibold-font-variation-settings
      );
    }

    blockquote {
      font-family: var(--typography-body-xl-font-family);
      font-size: var(--typography-body-xl-font-size);
      font-style: italic;
      line-height: var(--typography-body-xl-line-height);
      letter-spacing: var(--typography-body-xl-letter-spacing);
      font-weight: var(--typography-semibold-font-weight);
      font-variation-settings: var(
        --typography-semibold-font-variation-settings
      );
    }
  }
`;
