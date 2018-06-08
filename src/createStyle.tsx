import * as stylis from "stylis";
import * as React from "react";
import { Fragment, Component, ReactNode, ComponentClass } from "react";

export interface StyleProviderPropsType {
  init_stylis_cache?: Record<
    string,
    { class_name: string; style_html: string }
  >;
  children?: ReactNode;
}

export interface StyleProviderComponentClass
  extends ComponentClass<StyleProviderPropsType> {
  new (props: StyleProviderPropsType, context?: any): Component<
    StyleProviderPropsType,
    {}
  > & {
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

export function createStyle(): {
  Provider: StyleProviderComponentClass;
  Consumer: (props: StyleConsumerPropsType) => JSX.Element;
} {
  const Context = React.createContext<StyleProvider>(null);

  class StyleProvider extends Component<StyleProviderPropsType> {
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
          {instance_id === this.instance_id && (
            <style dangerouslySetInnerHTML={{ __html: style_html }} />
          )}
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
