import * as React from "react";

import { Style, createStyle } from "./index";
import {
  hash_class_name_generator,
  random_class_name_generator
} from "./class_name_generator";

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
