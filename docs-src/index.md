## Polymer → Lit Migration Guide

<script type="module" src="js/main.bundled.js"></script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap" rel="stylesheet"/>

### Minimal class

<playground-ide style="height: 200px;">
<script type="sample/ts" filename="lit-element-ts.ts">
import {LitElement, html, customElement} from 'https://unpkg.com/lit-element?module';
@customElement('lit-element-ts')
class MyElement extends LitElement {
  render() {
    return html`<div>lit-element-ts</div>`;
  }
}
</script>
<script type="sample/js" filename="lit-element-js.ts">
import {LitElement, html, customElement} from 'https://unpkg.com/lit-element?module';
class MyElement extends LitElement {
  render() {
    return html`<div>lit-element-js</div>`;
  }
}
customElements.define('lit-element-js', MyElement);
</script>
<script type="sample/js" filename="polymer-element.js">
import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer/polymer-element.js?module';
class MyElement extends PolymerElement {
  static get template() {
    return html`<div>polymer-element</div>`;
  }
}
customElements.define('polymer-element', MyElement);
</script>
<script type="sample/js" filename="legacy-element.js">
import {Polymer, html} from 'https://unpkg.com/@polymer/polymer/polymer-legacy.js?module';
Polymer({
  is: 'legacy-element',
  _template: html`<div>legacy-element</div>`
});
</script>
<script type="sample/js" filename="elements.js">
import './lit-element-ts.js';
import './lit-element-js.js';
import './polymer-element.js';
import './legacy-element.js';
</script>
<script type="sample/html" filename="index.html">
<script type="module" src="./elements.js">&lt;/script>
<lit-element-ts></lit-element-ts>
<lit-element-js></lit-element-js>
<polymer-element></polymer-element>
<legacy-element></legacy-element>
</script>
</playground-ide>

### Minimal class with styling

<playground-ide style="height: 250px;">
<script type="sample/ts" filename="lit-element-ts.ts">
import {LitElement, html, css, customElement} from 'https://unpkg.com/lit-element?module';
@customElement('lit-element-ts')
class MyElement extends LitElement {
  static styles = css`:host { color: green; }`;
  render() {
    return html`<div>lit-element-ts</div>`;
  }
}
</script>
<script type="sample/js" filename="lit-element-js.ts">
import {LitElement, html, css, customElement} from 'https://unpkg.com/lit-element?module';
class MyElement extends LitElement {
  static styles = css`:host { color: blue; }`;
  render() {
    return html`<div>lit-element-js</div>`;
  }
}
customElements.define('lit-element-js', MyElement);
</script>
<script type="sample/js" filename="polymer-element.js">
import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer/polymer-element.js?module';
class MyElement extends PolymerElement {
  static get template() {
    return html`
      <style>:host { color: purple; }</style>
      <div>polymer-element</div>
    `;
  }
}
customElements.define('polymer-element', MyElement);
</script>
<script type="sample/js" filename="legacy-element.js">
import {Polymer, html} from 'https://unpkg.com/@polymer/polymer/polymer-legacy.js?module';
Polymer({
  is: 'legacy-element',
  _template: html`
    <style>:host { color: red; }</style>
    <div>legacy-element</div>
  `
});
</script>
<script type="sample/js" filename="elements.js">
import './lit-element-ts.js';
import './lit-element-js.js';
import './polymer-element.js';
import './legacy-element.js';
</script>
<script type="sample/html" filename="index.html">
<script type="module" src="./elements.js">&lt;/script>
<lit-element-ts></lit-element-ts>
<lit-element-js></lit-element-js>
<polymer-element></polymer-element>
<legacy-element></legacy-element>
</script>
</playground-ide>

### Default property values

<playground-ide>
<script type="sample/ts" filename="lit-element-ts.ts">
import {LitElement, html, css, customElement, property} from 'https://unpkg.com/lit-element?module';
@customElement('lit-element-ts')
class MyElement extends LitElement {
  static styles = css`:host { color: green; }`;
  @property({type: String})
  prop = 'default';
  render() {
    return html`<div>lit-element-ts: ${this.prop}</div>`;
  }
}
</script>
<script type="sample/js" filename="lit-element-js.js">
import {LitElement, html, css, customElement, property} from 'https://unpkg.com/lit-element?module';
class MyElement extends LitElement {
  static styles = css`:host { color: blue; }`;
  static properties = {
    prop: {type: String}
  };
  constructor() {
    super();
    this.prop = 'default';
  }
  render() {
    return html`<div>lit-element-js: ${this.prop}</div>`;
  }
}
customElements.define('lit-element-js', MyElement);
</script>
<script type="sample/js" filename="polymer-element.js">
import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer/polymer-element.js?module';
class MyElement extends PolymerElement {
  static get properties() {
    prop: {type: String}
  }
  constructor() {
    super();
    this.prop = 'default';
  }
  static get template() {
    return html`
      <style>:host { color: purple; }</style>
      <div>polymer-element: [[prop]]</div>
    `;
  }
}
customElements.define('polymer-element', MyElement);
</script>
<script type="sample/js" filename="legacy-element.js">
import {Polymer, html} from 'https://unpkg.com/@polymer/polymer/polymer-legacy.js?module';
Polymer({
  is: 'legacy-element',
  properties: {
    prop: { type: String, value: 'default' }
  },
  _template:  html`
    <style>:host { color: red; }</style>
    <div>legacy-element: [[prop]]</div>
  `
});
</script>
<script type="sample/js" filename="elements.js">
import './lit-element-ts.js';
import './lit-element-js.js';
import './polymer-element.js';
import './legacy-element.js';
</script>
<script type="sample/html" filename="index.html">
<script type="module" src="./elements.js">&lt;/script>
<lit-element-ts></lit-element-ts>
<lit-element-js></lit-element-js>
<polymer-element></polymer-element>
<legacy-element></legacy-element>
</script>
</playground-ide>

### Single-property observer

<playground-ide>
<script type="sample/ts" filename="lit-element-ts.ts">
import {LitElement, html, css, customElement, property, PropertyValues} from 'https://unpkg.com/lit-element?module';
@customElement('lit-element-ts')
class MyElement extends LitElement {
  static styles = css`:host { color: green; }`;
  @property({type: String})
  prop = 'default';
  lastProp = undefined;
  update(changedProperties: PropertyValues) {
    if (changedProperties.has('prop')) {
      this.lastProp = changedProperties.get('prop');
    }
    super.update(changedProperties);
  }
  render() {
    return html`
      <div>lit-element-ts: ${this.prop} (was ${this.lastProp})</div>
    `;
  }
}
</script>
<script type="sample/js" filename="lit-element-js.js">
import {LitElement, html, css, customElement, property} from 'https://unpkg.com/lit-element?module';
class MyElement extends LitElement {
  static styles = css`:host { color: blue; }`;
  static properties = {
    prop: { type: String }
  };
  constructor() {
    super();
    this.prop = 'default';
  }
  update(changedProperties) {
    if (changedProperties.has('prop')) {
      this.lastProp = changedProperties.get('prop');
    }
    super.update(changedProperties);
  }
  render() {
    return html`
      <div>lit-element-js: ${this.prop} (was ${this.lastProp})</div>
    `;
  }
}
customElements.define('lit-element-js', MyElement);
</script>
<script type="sample/js" filename="polymer-element.js">
import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer/polymer-element.js?module';
class MyElement extends PolymerElement {
  static get properties() {
    return {
      prop: {
        type: String,
        observer: 'propChanged',
      },
    }
  }
  constructor() {
    super();
    this.prop = 'default';
  }
  propChanged(prop, old) {
    this.lastProp = old;
  }
  static get template() {
    return html`
      <style>:host { color: purple; }</style>
      <div>polymer-element: [[prop]] (was [[lastProp]])</div>
    `;
  }
}
customElements.define('polymer-element', MyElement);
</script>
<script type="sample/js" filename="legacy-element.js">
import {Polymer, html} from 'https://unpkg.com/@polymer/polymer/polymer-legacy.js?module';
Polymer({
  is: 'legacy-element',
  properties: {
    prop: {
      type: String,
      value: 'default',
      observer: 'propChanged',
    }
  },
  propChanged(prop, old) {
    this.lastProp = old;
  },
  _template: html`
    <style>:host { color: red; }</style>
    <div>legacy-element: [[prop]] (was [[lastProp]])</div>
  `
});
</script>
<script type="sample/js" filename="elements.js">
import './lit-element-ts.js';
import './lit-element-js.js';
import './polymer-element.js';
import './legacy-element.js';
// Change the element properties
setTimeout(() => 
  document.body.querySelectorAll('*').forEach(el => el.prop = 'changed'),
1000);
</script>
<script type="sample/html" filename="index.html">
<script type="module" src="./elements.js">&lt;/script>
<lit-element-ts></lit-element-ts>
<lit-element-js></lit-element-js>
<polymer-element></polymer-element>
<legacy-element></legacy-element>
</script>
</playground-ide>

### Computed value for rendering

<playground-ide>
<script type="sample/ts" filename="lit-element-ts.ts">
import {LitElement, html, css, customElement, property, PropertyValues} from 'https://unpkg.com/lit-element?module';
@customElement('lit-element-ts')
class MyElement extends LitElement {
  static styles = css`:host { color: green; }`;
  @property({type: String})
  first = '';
  @property({type: String})
  last = '';
  render() {
    const fullName = `${this.first} ${this.last}`;
    return html`
      <div>lit-element-ts: ${fullName}</div>
    `;
  }
}
</script>
<script type="sample/js" filename="lit-element-js.js">
import {LitElement, html, css, customElement, property} from 'https://unpkg.com/lit-element?module';
class MyElement extends LitElement {
  static styles = css`:host { color: blue; }`;
  static properties = {
    first: {type: String},
    last: {type: String},
  };
  constructor() {
    super();
    this.first = '';
    this.last = '';
  }
  render() {
    const fullName = `${this.first} ${this.last}`;
    return html`
      <div>lit-element-js: ${fullName}</div>
    `;
  }
}
customElements.define('lit-element-js', MyElement);
</script>
<script type="sample/js" filename="polymer-element.js">
import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer/polymer-element.js?module';
class MyElement extends PolymerElement {
  static get properties() {
    return {
      first: { type: String },
      last: { type: String },
    }
  }
  constructor() {
    super();
    this.first = '';
    this.last = '';
  }
  fullName(first, last) {
    return `${first} ${last}`;
  }
  static get template() {
    return html`
      <style>:host { color: purple; }</style>
      <div>polymer-element: [[fullName(first, last)]]</div>
    `;
  }
}
customElements.define('polymer-element', MyElement);
</script>
<script type="sample/js" filename="legacy-element.js">
import {Polymer, html} from 'https://unpkg.com/@polymer/polymer/polymer-legacy.js?module';
Polymer({
  is: 'legacy-element',
  properties: {
    first: {
      type: String,
      value: '',
    },
    last: {
      type: String,
      value: '',
    },
  },
  fullName(first, last) {
    return `${first} ${last}`;
  },
  _template: html`
    <style>:host { color: red; }</style>
    <div>legacy-element: [[fullName(first, last)]]</div>
  `
});
</script>
<script type="sample/js" filename="elements.js">
import './lit-element-ts.js';
import './lit-element-js.js';
import './polymer-element.js';
import './legacy-element.js';
</script>
<script type="sample/html" filename="index.html">
<script type="module" src="./elements.js">&lt;/script>
<lit-element-ts first="Kevin" last="Schaaf"></lit-element-ts>
<lit-element-js first="Kevin" last="Schaaf"></lit-element-js>
<polymer-element first="Kevin" last="Schaaf"></polymer-element>
<legacy-element first="Kevin" last="Schaaf"></legacy-element>
</script>
</playground-ide>

### Computed property on instance

<playground-ide>
<script type="sample/ts" filename="lit-element-ts.ts">
import {LitElement, html, css, customElement, property, PropertyValues} from 'https://unpkg.com/lit-element?module';
@customElement('lit-element-ts')
class MyElement extends LitElement {
  static styles = css`:host { color: green; }`;
  @property({type: String})
  first = '';
  @property({type: String})
  last = '';
  fullName = undefined;
  render() {
    this.fullName = `${this.first} ${this.last}`;
    return html`
      <div>lit-element-ts: ${this.fullName}</div>
    `;
  }
}
</script>
<script type="sample/js" filename="lit-element-js.js">
import {LitElement, html, css, customElement, property} from 'https://unpkg.com/lit-element?module';
class MyElement extends LitElement {
  static styles = css`:host { color: blue; }`;
  static properties = {
    first: {type: String},
    last: {type: String},
  };
  constructor() {
    super();
    this.first = '';
    this.last = '';
    this.fullName = undefined;
  }
  render() {
    this.fullName = `${this.first} ${this.last}`;
    return html`
      <div>lit-element-js: ${this.fullName}</div>
    `;
  }
}
customElements.define('lit-element-js', MyElement);
</script>
<script type="sample/js" filename="polymer-element.js">
import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer/polymer-element.js?module';
class MyElement extends PolymerElement {
  static get properties() {
    return {
      first: { type: String },
      last: { type: String },
      fullName: { computed: 'computeFullName(first, last)' },
    }
  }
  constructor() {
    super();
    this.first = '';
    this.last = '';
  }
  computeFullName(first, last) {
    return `${first} ${last}`;
  }
  static get template() {
    return html`
      <style>:host { color: purple; }</style>
      <div>polymer-element: [[fullName]]</div>
    `;
  }
}
customElements.define('polymer-element', MyElement);
</script>
<script type="sample/js" filename="legacy-element.js">
import {Polymer, html} from 'https://unpkg.com/@polymer/polymer/polymer-legacy.js?module';
Polymer({
  is: 'legacy-element',
  properties: {
    first: { type: String, value: '' },
    last: { type: String, value: '' },
    fullName: { computed: 'computeFullName(first, last)' }
  },
  computeFullName(first, last) {
    return `${first} ${last}`;
  },
  _template: html`
    <style>:host { color: red; }</style>
    <div>legacy-element: [[fullName]]</div>
  `
});
</script>
<script type="sample/js" filename="elements.js">
import './lit-element-ts.js';
import './lit-element-js.js';
import './polymer-element.js';
import './legacy-element.js';
</script>
<script type="sample/html" filename="index.html">
<script type="module" src="./elements.js">&lt;/script>
<lit-element-ts first="Kevin" last="Schaaf"></lit-element-ts>
<lit-element-js first="Kevin" last="Schaaf"></lit-element-js>
<polymer-element first="Kevin" last="Schaaf"></polymer-element>
<legacy-element first="Kevin" last="Schaaf"></legacy-element>
</script>
</playground-ide>

### Computed property on instance (memoized / reflecting)

<playground-ide>
<script type="sample/ts" filename="lit-element-ts.ts">
import {LitElement, html, css, customElement, property, PropertyValues} from 'https://unpkg.com/lit-element?module';
@customElement('lit-element-ts')
class MyElement extends LitElement {
  static styles = css`
    :host { color: green; }
    :host([full-name]) { text-decoration: underline; }
  `;
  @property({type: String})
  first = '';
  @property({type: String})
  last = '';
  @property({reflect: true, attribute: 'full-name'})
  fullName = undefined;
  update(changedProperties: PropertyValues) {
    if (changedProperties.has('first') || changedProperties.has('last')) {
      this.fullName = `${this.first} ${this.last}`;
    }
    super.update(changedProperties);
  }
  render() {
    return html`
      <div>lit-element-ts: ${this.fullName}</div>
    `;
  }
}
</script>
<script type="sample/js" filename="lit-element-js.js">
import {LitElement, html, css, customElement, property} from 'https://unpkg.com/lit-element?module';
class MyElement extends LitElement {
  static styles = css`
    :host { color: blue; }
    :host([full-name]) { text-decoration: underline; }
  `;
  static properties = {
    first: {type: String},
    last: {type: String},
    fullName: {reflect: true, attribute: 'full-name'},
  };
  constructor() {
    super();
    this.first = '';
    this.last = '';
    this.fullName = undefined;
  }
  update(changedProperties) {
    if (changedProperties.has('first') || changedProperties.has('last')) {
      this.fullName = `${this.first} ${this.last}`;
    }
    super.update(changedProperties);
  }
  render() {
    return html`
      <div>lit-element-js: ${this.fullName}</div>
    `;
  }
}
customElements.define('lit-element-js', MyElement);
</script>
<script type="sample/js" filename="polymer-element.js">
import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer/polymer-element.js?module';
class MyElement extends PolymerElement {
  static get properties() {
    return {
      first: { type: String },
      last: { type: String },
      fullName: { computed: 'computeFullName(first, last)', reflectToAttribute: true },
    }
  }
  constructor() {
    super();
    this.first = '';
    this.last = '';
  }
  computeFullName(first, last) {
    return `${first} ${last}`;
  }
  static get template() {
    return html`
      <style>
        :host { color: purple; }
        :host([full-name]) { text-decoration: underline; }
      </style>
      <div>polymer-element: [[fullName]]</div>
    `;
  }
}
customElements.define('polymer-element', MyElement);
</script>
<script type="sample/js" filename="legacy-element.js">
import {Polymer, html} from 'https://unpkg.com/@polymer/polymer/polymer-legacy.js?module';
Polymer({
  is: 'legacy-element',
  properties: {
    first: { type: String, value: '' },
    last: { type: String, value: '' },
    fullName: { computed: 'computeFullName(first, last)', reflectToAttribute: true }
  },
  computeFullName(first, last) {
    return `${first} ${last}`;
  },
  _template: html`
    <style>
      :host { color: red; }
      :host([full-name]) { text-decoration: underline; }
    </style>
    <div>legacy-element: [[fullName]]</div>
  `
});
</script>
<script type="sample/js" filename="elements.js">
import './lit-element-ts.js';
import './lit-element-js.js';
import './polymer-element.js';
import './legacy-element.js';
</script>
<script type="sample/html" filename="index.html">
<script type="module" src="./elements.js">&lt;/script>
<lit-element-ts first="Kevin" last="Schaaf"></lit-element-ts>
<lit-element-js first="Kevin" last="Schaaf"></lit-element-js>
<polymer-element first="Kevin" last="Schaaf"></polymer-element>
<legacy-element first="Kevin" last="Schaaf"></legacy-element>
</script>
</playground-ide>
