/* globals require global */
const _ = require('lodash');

const {
  FlexLayout,
  QCheckBox,
  QLabel,
  QLineEdit,
  QPlainTextEdit,
  QMainWindow,
  QPushButton,
  QPushButtonEvents,
  QWidget,
} = require('@nodegui/nodegui');

const win = new QMainWindow();
win.resize(400, 200);

// Root view
const rootView = new QWidget();
const rootViewLayout = new FlexLayout();
rootView.setObjectName('rootView');
rootView.setLayout(rootViewLayout);

// Fieldset
const fieldset = new QWidget();
const fieldsetLayout = new FlexLayout();
fieldset.setObjectName('fieldset');
fieldset.setLayout(fieldsetLayout);

// Number characters row
const numCharsRow = new QWidget();
const numCharsRowLayout = new FlexLayout();
numCharsRow.setObjectName('numCharsRow');
numCharsRow.setLayout(numCharsRowLayout);

const numCharsLabel = new QLabel();
numCharsLabel.setText('Number of characters in the password:');
numCharsRowLayout.addWidget(numCharsLabel);

const numCharsInput = new QLineEdit();
numCharsInput.setObjectName('numCharsInput');
numCharsRowLayout.addWidget(numCharsInput);

const checkbox = new QCheckBox();
checkbox.setText('Include special characters in password');

// Generated password output
const passOutput = new QPlainTextEdit();
passOutput.setObjectName('passOutput');
passOutput.setReadOnly(true);

// Button row
const buttonRow = new QWidget();
const buttonRowLayout = new FlexLayout();
buttonRow.setLayout(buttonRowLayout);
buttonRow.setObjectName('buttonRow');

// Buttons
const generateButton = new QPushButton();
generateButton.setText('Generate');
generateButton.setObjectName('generateButton');

const copyButton = new QPushButton();
copyButton.setText('Copy to clipboard');

// Add the widgets to the respective layouts
fieldsetLayout.addWidget(numCharsRow);
fieldsetLayout.addWidget(checkbox);
rootViewLayout.addWidget(fieldset);
rootViewLayout.addWidget(passOutput);
buttonRowLayout.addWidget(generateButton);
buttonRowLayout.addWidget(copyButton);
rootViewLayout.addWidget(buttonRow);

// Event handling
generateButton.addEventListener(QPushButtonEvents.clicked, () => {
  passOutput.setPlainText(
    generatePassword(checkbox.isChecked(), numCharsInput.text())
  );
});

// Logic
function getRamdomCharacter(min, max) {
  return String.fromCharCode(_.random(min, max));
}

function generatePassword(withSpecialCharacters, length) {
  if(isNaN(length)) return;

  if(!withSpecialCharacters) {
    return _.range(length).map(() => {
      const rand = _.random(0, 2);

      if(rand === 0){
        return getRamdomCharacter(48, 57);
      } else if(rand === 1) {
        return getRamdomCharacter(65, 90);
      } else {
        return getRamdomCharacter(97, 122);
      }
    }).join('');
  } else {
    return _.range(length).map(() => getRamdomCharacter(33, 126)).join('');
  }
}

// Styling
const rootStyleSheet = `
  #rootView {
    padding: 5px;
  }
  #fieldset {
    padding: 10px;
    border: 2px ridge #bdbdbd;
    margin-bottom: 4px;
  }
  #numCharsRow, #buttonRow {
    flex-direction: row;
  }
  #numCharsRow {
    margin-bottom: 5px;
  }
  #numCharsInput {
    width: 40px;
    margin-left: 2px;
  }
  #passOutput {
    height: 85px;
    margin-bottom: 4px;
  }
  #buttonRow{
    margin-bottom: 5px;
  }
  #generateButton {
    width: 120px;
    margin-right: 3px;
  }
  #copyButton {
    width: 120px;
  }
`;

rootView.setStyleSheet(rootStyleSheet);

win.setCentralWidget(rootView);
win.show();

global.win = win;
