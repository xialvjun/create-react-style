# create-react-style
An easy way of css-in-js: render style tag in render-props.

## Install
`npm i @xialvjun/create-react-style` or `yarn add @xialvjun/create-react-style`

## Example

https://codesandbox.io/s/5w8wqonrpk

```jsx
import { Style, createStyle } from '@xialvjun/create-react-style';
import {
  hash_class_name_generator,
  random_class_name_generator
} from "@xialvjun/create-react-style/class_name_generator";

const stable_class_name_for_ssr = (
  <Style.Provider class_name_generator={hash_class_name_generator} />
);
const random_class_name = (
  <Style.Provider class_name_generator={random_class_name_generator} />
);

const app = (
  <Style.Provider>
    <div>
      <Style.Consumer
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
      </Style.Consumer>
      <Style.Consumer
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
      </Style.Consumer>
    </div>
  </Style.Provider>
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

const AnotherStyle = createStyle();
const { Provider: AProvider, Consumer: AConsumer } = AnotherStyle;
```

# TODO
1. `macro.js` to minize those css template string.
