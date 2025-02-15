export default class NotificationMessage {
  static lastNotification;
  constructor(message, options) {
    this.message = message;
    this.type = options?.type;
    this.duration = options?.duration;
    this.element = this.createElement(this.createTemplate());
    this.timer = setTimeout(() => this.destroy, options?.duration);
  }
  show(element) {
    if (NotificationMessage.lastNotification) {
      this.destroy();
    }
    NotificationMessage.lastNotification = this;
    this.timerId = setTimeout(() => this.destroy(), this.duration);
    if (element) {
      element.appendChild(this.element);
  }
  else {
      document.body.appendChild(this.element);
  }
  }
  createElement(template) {
    const element = document.createElement("div");
    element.innerHTML = template;
    return element.firstElementChild;
  }
  createTemplate() {
    return `
        <div class="notification ${this.type}" style="--value:${
      this.duration / 1000
    }s">
            <div class="timer"></div>
            <div class="inner-wrapper">
                <div class="notification-header">${this.type}</div>
                <div class="notification-body">
                    ${this.message}
                </div>
            </div>
        </div>
        `;
  }
  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
  }
}
