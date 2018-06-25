import * as stylis from "stylis";
import * as React from "react";
import { Fragment, Component, ReactNode, ComponentClass } from "react";

export interface StyleProviderPropsType {
  init_stylis_cache?: Record<
    string,
    { class_name: string; style_html: string }
  >;
  children?: ReactNode;
  render_style?: (html: string) => ReactNode;
}

export interface StyleProviderComponentClass
  extends ComponentClass<StyleProviderPropsType> {
  new (props: StyleProviderPropsType, context?: any): Component<
    StyleProviderPropsType,
    {}
  > & {
    render_style: (html: string) => ReactNode;
    stylis_cache: Record<string, { class_name: string; style_html: string }>;
    stylis: (
      css: string
    ) => {
      class_name: string;
      style_html: string;
    };
    rendered_by: Record<string, string>;
    set: (key: string, value: string) => void;
    get: (key: string) => string;
    del: (key: string) => void;
  };
}

export interface StyleConsumerPropsType {
  css: string;
  children: (class_name: string) => React.ReactNode;
}

/**
 * 可以提供 props.render_style ，从而
 * {instance_id === this.instance_id && <style dangerouslySetInnerHTML={{ __html: style_html }} />}
 * 换为
 * const render_style = props.render_style || (html => <style dangerouslySetInnerHTML={{ __html: html }} />);
 * {instance_id === this.instance_id && render_style(html)}
 * 于是，用户通过提供 props.render_style 来渲染他们自定义的组件，组件中有副作用去修改 style，从而达到在不同的平台使用的目的
 * 。。。不过目前在 微信小程序 和 ReactNative 都不行。微信小程序没有提供修改 style 的功能，ReactNative 用的 inline style
 */

export function createStyle(): {
  Provider: StyleProviderComponentClass;
  Consumer: (props: StyleConsumerPropsType) => JSX.Element;
} {
  const Context = React.createContext<StyleProvider>(null);

  class StyleProvider extends Component<StyleProviderPropsType> {
    render_style =
      this.props.render_style ||
      (html => <style dangerouslySetInnerHTML={{ __html: html }} />);

    stylis_cache = this.props.init_stylis_cache || {};
    stylis = (css: string) => {
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
      }
      return this.stylis_cache[css];
    };

    rendered_by = {};
    set = (key, value) => {
      this.rendered_by[key] = value;
    };
    get = key => {
      return this.rendered_by[key];
    };
    del = key => {
      delete this.rendered_by[key];
      this.forceUpdate();
    };

    render() {
      const new_this = { ...(this as any) };
      return (
        <Context.Provider value={new_this}>
          {this.props.children}
        </Context.Provider>
      );
    }
  }

  let STYLE_INSTANCE_ID = 1;

  class Style extends Component<{
    css: string;
    provider: StyleProvider;
    children: (css: string) => ReactNode;
  }> {
    instance_id = STYLE_INSTANCE_ID++;

    componentWillReceiveProps(nextProps) {
      const { css, provider } = this.props;
      if (css !== nextProps.css) {
        const instance_id = provider.get(css);
        if (instance_id === this.instance_id) {
          provider.del(css);
        }
      }
    }

    componentWillUnmount() {
      const { css, provider } = this.props;
      const instance_id = provider.get(css);
      if (instance_id === this.instance_id) {
        provider.del(css);
      }
    }

    render() {
      const { css, children, provider } = this.props;
      const { class_name, style_html } = provider.stylis(css);
      let instance_id = provider.get(css);
      if (!instance_id) {
        provider.set(css, this.instance_id);
        instance_id = this.instance_id;
      }
      return (
        <Fragment>
          {instance_id === this.instance_id &&
            provider.render_style(style_html)}
          {children(class_name)}
        </Fragment>
      );
    }
  }

  const StyleConsumer = (props: StyleConsumerPropsType) => (
    <Context.Consumer>
      {provider => <Style {...{ ...props, provider }} />}
    </Context.Consumer>
  );

  return {
    Provider: StyleProvider,
    Consumer: StyleConsumer
  };
}
