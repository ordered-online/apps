class AlertElement {
  constructor() {
    this.actions = [];
    this.createElements = this.createElements.bind(this);
    this.present = this.present.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.addAction = this.addAction.bind(this);
    this.onClick = this.onClick.bind(this);
    this.createActions = this.createActions.bind(this);
    this.createElements();
  }

  createElements() {
    this.element = document.createElement('div');
    this.element.className = 'alert';

    this.containerElement = document.createElement('div');
    this.containerElement.className = 'alert-container';
    this.element.appendChild(this.containerElement);

    this.titleElement = document.createElement('div');
    this.titleElement.className = 'alert-title';
    this.containerElement.appendChild(this.titleElement);

    this.messageElement = document.createElement('div');
    this.messageElement.className = 'alert-message';
    this.containerElement.appendChild(this.messageElement);

    this.actionsElement = document.createElement('div');
    this.actionsElement.className = 'alert-actions';
    this.containerElement.appendChild(this.actionsElement);
  }

  present() {
    this.titleElement.innerText = this.titleElement.textContent = this.title;
    this.messageElement.innerHTML = this.messageElement.textContent = this.message;
    if (!this.actions.length) this.actions.push({});
    this.createActions();
    document.body.appendChild(this.element);
  }

  dismiss() {
    document.body.removeChild(this.element);
  }

  setTitle(text) {
    this.title = text || '';
  }

  setMessage(text) {
    this.message = text || '';
  }

  addAction(text, handler) {
    this.actions.push({ text, handler });
  }

  onClick(handler) {
    return function() {
      try {
        if (handler) handler();
        this.element.parentNode.removeChild(this.element);
      } catch (err) {}
    }.bind(this);
  }

  createActions() {
    this.actions.forEach(action => {
      let actionElement = document.createElement('button');
      actionElement.className = 'alert-action-item';
      actionElement.innerText = action.text || 'OK';
      actionElement.addEventListener(
        'click',
        this.onClick(action.handler),
        false
      );
      this.actionsElement.insertBefore(
        actionElement,
        this.actionsElement.firstChild
      );
    });
  }
}

const Alert = {
  alert(title, message = '', callbackOrButtons = [{ text: 'OK' }]) {
    let alert = new AlertElement();
    alert.setTitle(title);
    alert.setMessage(message);
    if (typeof callbackOrButtons === 'function') {
      const callback = callbackOrButtons;
      alert.addAction('OK', callback);
    } else {
      const buttons = callbackOrButtons;
      buttons.forEach(button => {
        alert.addAction(button.text, button.onPress);
      });
    }
    alert.present();
  },
};

export default Alert;
