import * as stylis from "stylis";
import hash from "@emotion/hash";
import { createContext } from "@xialvjun/create-react-context";
import * as React from "react";
import { Fragment, Component, ReactNode, ComponentClass } from "react";

/**
 * no care about global style, because stylis support
 * :global(
 * img {
 *   width: 100%;
 * }
 * )
 */
function createStyle(
  hash: (css: string) => string
): ComponentClass<{ css: string; children: (className: string) => ReactNode }> {
  const WhoRenderedStyle = createContext({
    state: {},
    set(key, value) {
      this.state[key] = value;
    },
    get(key) {
      return this.state[key];
    },
    del(key) {
      delete this.state[key];
      this.setState(null);
    }
  });

  const cache = {};
  function cache_stylis(css: string) {
    if (!cache[css]) {
      let className = "";
      className = "s_" + hash(css);
      cache[css] = { className, style_html: stylis("." + className, css) };
    }
    return cache[css];
  }

  let style_instance_id = 1;
  class Style extends Component<{
    css: string;
    who_rendered_style: any;
    children: (css: string) => ReactNode;
  }> {
    instance_id = style_instance_id++;
    provider_state = null;
    componentWillUnmount() {
      const { css, children, who_rendered_style } = this.props;
      const instance_id = who_rendered_style.get(css);
      if (instance_id === this.instance_id) {
        who_rendered_style.del(css);
      }
    }
    render() {
      const { css, children, who_rendered_style } = this.props;
      const { className, style_html } = cache_stylis(css);
      let instance_id = who_rendered_style.get(css);
      if (!instance_id) {
        who_rendered_style.set(css, this.instance_id);
        instance_id = this.instance_id;
      }
      return (
        <Fragment>
          {instance_id === this.instance_id && (
            <style dangerouslySetInnerHTML={{ __html: style_html }} />
          )}
          {children(className)}
        </Fragment>
      );
    }
  }

  return WhoRenderedStyle.hoc("who_rendered_style")(Style);
}

export { createStyle };
