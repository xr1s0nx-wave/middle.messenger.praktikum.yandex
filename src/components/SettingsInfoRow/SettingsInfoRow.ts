import Block from "@/core/Block.ts";
import template from "./SettingsInfoRow.hbs?raw";
type SettingsInfoRowProps = {
  label: string;
  name: string;
  value?: string;
  error?: string | null;
  onBlur?: (e: Event) => void;
};
const SettingsInfoRow = class extends Block {
  private _blurHandler?: EventListener;
  constructor(props: SettingsInfoRowProps) {
    super("div", {
      ...props,
      error: props.error || null,
      className: `settings__info-row${props.error ? " error" : ""}`,
    });
  }
  _attachBlurHandler() {
    const input = this.getContent().querySelector("input");
    const onBlur = (this._meta.props as any).onBlur;
    if (input) {
      if (this._blurHandler) {
        input.removeEventListener("blur", this._blurHandler);
      }
      if (typeof onBlur === "function") {
        this._blurHandler = onBlur as EventListener;
        input.addEventListener("blur", this._blurHandler);
      } else {
        this._blurHandler = undefined;
      }
    }
  }
  componentDidMount() {
    this._attachBlurHandler();
  }
  componentDidUpdate() {
    this._attachBlurHandler();
    return true;
  }
  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
};
export default SettingsInfoRow;
