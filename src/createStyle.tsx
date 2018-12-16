import * as stylis from "stylis";
import * as React from "react";
import { createContext, createRef, Component, Fragment } from "react";
import { ComponentClass, RefObject, ReactNode, SFC } from "react";

class Lazy extends Component<{ children: () => ReactNode }> {
  render() {
    return this.props.children();
  }
}

function DefaultWebStyleComponent({ html }) {
  return <style dangerouslySetInnerHTML={{ __html: html }} />;
}

function random_class_name(obj) {
  const class_name =
    "s_" +
    Math.random()
      .toString(32)
      .slice(2);
  if (obj.hasOwnProperty(class_name)) {
    return random_class_name(obj);
  }
  return class_name;
}

export interface StyleProviderPropsType {
  style_component?: ComponentClass<{ html: string }> | SFC<{ html: string }>;
  init_stylis_cache?: Record<string, { class_name: string; style_html: string; now?: number }>;
  prune_controller?: (stylis_cache: Record<string, { class_name: string; now?: number; style_html: string }>, prune: () => void) => any;
  children?: ReactNode;
}

export interface StyleProviderComponent extends Component<StyleProviderPropsType> {
  style_component: ComponentClass<{ html: string }> | SFC<{ html: string }>;
  now: number;
  stylis_cache: Record<string, { class_name: string; style_html: string; now?: number }>;
  stylis: (
    css: string
  ) => {
    class_name: string;
    style_html: string;
    now?: number;
  };
  prune_controller: (stylis_cache: Record<string, { class_name: string; now?: number; style_html: string }>, prune: () => void) => any;
  will_prune: boolean;
  prune: () => void;
  lazy_ref: RefObject<Lazy>;
  render_styles: () => ReactNode;
}

export interface StyleProviderComponentClass extends ComponentClass<StyleProviderPropsType> {
  new (props: StyleProviderPropsType, context?: any): Component<StyleProviderPropsType, {}> & StyleProviderComponent;
}

export interface StyleConsumerPropsType {
  css: string;
  children: (class_name: string) => ReactNode;
}

export function createStyle() {
  const Context = createContext<StyleProviderComponent>(null);

  class Provider extends Component<StyleProviderPropsType> {
    style_component = this.props.style_component || DefaultWebStyleComponent;

    now = Date.now();
    stylis_cache = { ...this.props.init_stylis_cache };
    stylis = (css: string) => {
      if (!this.stylis_cache[css]) {
        if (!this.will_lazy_ref_update) {
          this.will_lazy_ref_update = true;
          Promise.resolve(0).then(_ => this.lazy_ref.current.forceUpdate(() => (this.will_lazy_ref_update = false)));
        }
        const class_name = random_class_name(this.stylis_cache);
        this.stylis_cache[css] = {
          class_name,
          style_html: stylis("." + class_name, css)
        };
        this.prune_controller(this.stylis_cache, this.prune);
      }
      this.stylis_cache[css].now = this.now;
      return this.stylis_cache[css];
    };

    prune_controller = this.props.prune_controller || (_ => _);
    will_prune = false;
    prune = () => {
      if (!this.will_prune) {
        this.will_prune = true;
        this.now = Date.now();
        this.forceUpdate(() => {
          this.will_prune = false;
          const to_remove_css = Object.keys(this.stylis_cache).filter(css => this.stylis_cache[css].now !== this.now);
          if (to_remove_css.length > 0) {
            to_remove_css.forEach(css => delete this.stylis_cache[css]);
            this.lazy_ref.current.forceUpdate();
          }
        });
      }
    };

    lazy_ref = createRef<Lazy>();
    will_lazy_ref_update = false;
    render_styles = () => {
      const StyleComponent: any = this.style_component;
      return (
        <Fragment>
          {Object.keys(this.stylis_cache).map(css => (
            <StyleComponent key={this.stylis_cache[css].class_name} html={this.stylis_cache[css].style_html} />
          ))}
        </Fragment>
      );
    };

    render() {
      return (
        <Context.Provider value={{ ...(this as any) }}>
          {this.props.children}
          <Lazy ref={this.lazy_ref}>{this.render_styles}</Lazy>
        </Context.Provider>
      );
    }
  }

  function Consumer({ css, children }: StyleConsumerPropsType) {
    return <Context.Consumer>{provider => children(provider.stylis(css).class_name)}</Context.Consumer>;
  }

  return { Provider: Provider as StyleProviderComponentClass, Consumer, ContextConsumer: Context.Consumer };
}
