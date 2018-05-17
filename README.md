# create-react-context
An easy way of css-in-js: render style tag in render-props.

## Install
`npm i @xialvjun/create-react-style` or `yarn add @xialvjun/create-react-style`

## Example
```jsx
import { createStyle } from '@xialvjun/create-react-style';

const Style = createStyle();

const app = (
  <div>
    <Style
      css={`
        display: flex;
        background: yellow;
        .abc {
          color: blue;
        }
      `}
    >
      {className => (
        <div className={className}>
          <div className="abc">abcabc</div>
        </div>
      )}
    </Style>
    <Style
      css={`
        display: flex;
        background: yellow;
        .abc {
          color: blue;
        }
      `}
    >
      {className => (
        <div className={className}>
          <div className="abc">abcabc</div>
        </div>
      )}
    </Style>
  </div>
);

app ===
  (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
    .yuqw6123ba {
      display: flex;
      background: yellow;
    }
    .yuqw6123ba .abc {
      color: blue;
    }`
        }}
      />
      <div className={"yuqw6123ba"}>
        <div className="abc">abcabc</div>
      </div>
      <div className={"yuqw6123ba"}>
        <div className="abc">abcabc</div>
      </div>
    </div>
  );
```

# TODO
1. `macro.js` to minize those css template string.
