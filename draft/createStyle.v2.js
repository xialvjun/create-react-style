import * as stylis from "stylis";
import * as React from "react";
import { Fragment, Component, ReactNode, ComponentClass } from "react";

export const Lazy = ({ children }) => {
  return children();
};

// 这个版本能把 style 标签渲染到同一个地方。。。但是会让 style 比用 style 的地方要晚一秒生成
export function createStyle() {
  const Context = React.createContext(null);

  class StyleProvider extends Component {
    stylis_cache = this.props.init_stylis_cache || {};
    stylis = css => {
      if (!this.stylis_cache[css]) {
        const class_name =
          "s_" +
          Math.random()
            .toString(32)
            .slice(2);
        this.stylis_cache[css] = {
          class_name,
          style_html: stylis("." + class_name, css)
        };
        if (this.__mounted__) {
          Promise.resolve().then(_ => this.forceUpdate());
        }
      }
      return this.stylis_cache[css];
    };
    render_style =
      this.props.render_style ||
      (html => <style dangerouslySetInnerHTML={{ __html: html }} />);
    style = () => {
      const { stylis_cache } = this;
      const html = Object.keys(stylis_cache)
        .map(css => stylis_cache[css].style_html)
        .join("");
      return this.render_style(html);
    };
    componentDidMount() {
      this.__mounted__ = true;
    }
    componentWillUnmount() {
      this.__mounted__ = false;
    }
    render() {
      const new_this = { ...this };
      return (
        <Context.Provider value={new_this}>
          {this.props.children}
          <Lazy>{this.style}</Lazy>
        </Context.Provider>
      );
    }
  }

  class Style extends Component {
    render() {
      const { css, children, provider } = this.props;
      const { class_name } = provider.stylis(css);
      return (
        <Fragment>
          {children(class_name)}
        </Fragment>
      );
    }
  }

  const StyleConsumer = props => (
    <Context.Consumer>
      {provider => <Style {...{ ...props, provider }} />}
    </Context.Consumer>
  );

  return {
    Provider: StyleProvider,
    Consumer: StyleConsumer
  };
}
